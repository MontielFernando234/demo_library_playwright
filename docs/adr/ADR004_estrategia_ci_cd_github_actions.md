# [ADR-004]: Estrategia de CI/CD con GitHub Actions

**Fecha:** 2026-05-13

**Estado:** Aceptado

## 1. Contexto y Problema

El repositorio adopta el flujo de ramas descrito en [ADR-002](ADR002_convenciones_nomenclatura_estandares_de_codigo.md) (`main`, `develop`, `feature/*`, `fix/*`). Hace falta alinear la integración continua con ese flujo: validar los pull requests hacia `develop` con la misma rigurosidad que el código que llega a `main`, y en ramas `feature/*` evitar ejecutar navegadores y suites E2E cuando el push no toca automatización ni dependencias, reduciendo tiempo y carga sobre el demo público.

## 2. Decisión

### 2.1. Workflows y disparadores

| Workflow | Archivo | Disparador | Comportamiento |
|----------|---------|------------|----------------|
| Main / master | [`.github/workflows/playwright.yml`](../../.github/workflows/playwright.yml) | `push` y `pull_request` a `main` o `master` | Instalación completa, lint y suite E2E (Chromium). |
| PR hacia `develop` | [`.github/workflows/ci-pr-develop.yml`](../../.github/workflows/ci-pr-develop.yml) | `pull_request` con base `develop` | Mismo pipeline de calidad que en `main` (instalación, lint, E2E). |
| Push en `feature/*` | [`.github/workflows/ci-feature-push.yml`](../../.github/workflows/ci-feature-push.yml) | `push` en ramas que coinciden con `feature/**` | Pipeline **acotado** según rutas cambiadas (ver 2.2). |

Los workflows comparten comandos npm encapsulados en scripts `ci:*` (ver [package.json](../../package.json)) para mantener una única fuente de verdad entre local y CI.

### 2.2. Reglas del workflow en `feature/*`

Se utiliza [dorny/paths-filter](https://github.com/dorny/paths-filter) sobre el conjunto de commits del push.

- **`deps`:** `package.json`, `package-lock.json` → implica `npm ci`, lint, instalación de navegadores Playwright y ejecución de tests E2E (cambio de versiones o scripts puede romper la suite).
- **`automation`:** `features/**`, `src/**`, `playwright.config.ts` → `npm ci`, lint, navegadores y E2E.
- **`tooling`:** `eslint.config.mjs`, `tsconfig.json`, `.prettierignore` → `npm ci` y **solo lint** (no se instalan navegadores ni se corre Playwright).
- **`workflows`:** `.github/workflows/**` → `npm ci` y **solo lint** (valida que el proyecto siga compilando/lint sin coste de E2E en cada edición de YAML).

Si ninguno de los anteriores aplica (por ejemplo solo cambios bajo `docs/` o archivos no listados), el job `skip` finaliza con éxito indicando que no hubo trabajo de Node/Playwright. Esto evita fallos artificiales y documenta la decisión en logs.

### 2.3. Scripts `ci:*`

Los scripts `ci:install`, `ci:lint`, `ci:playwright-install` y `ci:test` existen para que los workflows invoquen los mismos pasos que se pueden reproducir en local (`npm run ci:install && npm run ci:lint`, etc.).

## 3. Consecuencias

### Positivas

- Coherencia entre ADR de ramas y pipelines de GitHub.
- Menor uso de minutos de Actions y menos fricción en iteraciones de documentación o solo ESLint.
- Documentación explícita para nuevos colaboradores.

### Negativas / Riesgos

- Los filtros por ruta deben actualizarse si se mueve el código de automatización fuera de `features/` o `src/`.
- Un cambio solo en `docs/` no ejecuta tests; sigue siendo responsabilidad del PR hacia `develop` o `main` ejecutar la suite completa antes del merge.

## 4. Relación con otros ADR

- [ADR-002](ADR002_convenciones_nomenclatura_estandares_de_codigo.md): ramas y convención de commits; la política de workflows se complementa con el presente ADR.
- [ADR-001](ADR001_arquitectura_base_stack_tecnologico.md): stack Playwright + BDD; el job de tests invoca `bddgen` vía `npm run test` / `ci:test`.
