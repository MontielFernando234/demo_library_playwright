# [ADR-002]: Convenciones de Nomenclatura y Estándares de Código
**Fecha:** 2026-05-08

**Estado:** Aceptado

## 1. Contexto y Problema
Para asegurar la escalabilidad del framework de automatización y la armonía en el trabajo colaborativo, es imperativo establecer reglas claras de codificación, gestión de versiones y flujo de trabajo en Git. Esto reduce la fricción en las revisiones de código y facilita la integración continua.

## 2. Decisión
### 2.1. Nomenclatura de Archivos y Clases
Se utilizará *PascalCase* para clases y *camelCase* para métodos y variables. Los archivos seguirán el *esquema funcional*:

|Componente      |Sufijo / Convención   | Ejemplo               |
|:---------------|:---------------------|:----------------------|
|Page Objects    |<Nombre>Page.ts       |InventoryPage.ts       |
|Actions         |<Nombre>Actions.ts    |InventoryActions.ts    |
|Questions       |<Tipo>Questions.ts    |InventoryQuestions.ts  |
|Features        |funcionalidad.feature |product_search.feature |
|Step Definitions|funcionalidad.steps.ts|product_search.steps.ts|
|Test Runners    |funcionalidad.spec.ts |product_search.spec.ts |

### 2.2. Estándares de Desarrollo
**Principios:** Aplicación rigurosa de *DRY*, *SOLID* (Responsabilidad Única) y *KISS*.

**Locators:** Uso prioritario de *User-facing locators* (getByRole, getByText). Se prohíbe el uso de *XPath absoluto*.

**Esperas:** Quedan prohibidos los *hardcoded sleeps* (waitForTimeout). Se usarán *Web-First Assertions* y *esperas dinámicas* de Playwright.

**Atomicidad:** Cada escenario debe ser independiente. No se permite la dependencia de estado entre tests.

### 2.3. Calidad de Código y Commits
**Linter/Formatter:** Uso obligatorio de *ESLint* y *Prettier*. El código que no cumpla los estándares no podrá ser mergeado.

**Commits Semánticos:** Se seguirá la convención de Conventional Commits:

- *feat:* (nueva funcionalidad de prueba)
- *fix:* (corrección de un bug en el framework o test)
- *docs:*
- *style:*
- *refactor:*
- *test:*
- *chore:*

### 2.4. Gestión de Versiones y Git (Branching)
**Versionado Semántico (SemVer):** El proyecto seguirá el formato *MAJOR.MINOR.PATCH.* Esta versión debe ser consistente en *package.json*, *README.md* y *reportes de Allure*.

#### Estrategia de Ramas:

- **main:** Código productivo y estable.

- **develop:** Rama de integración para desarrollo.

- __feature/*__ __/__ __fix/*:__ Ramas temporales para tareas específicas.

- **release/*:** Preparación para despliegues de versión.

La política de **integración continua** (workflows de GitHub Actions, disparadores por rama y ejecución acotada en `feature/*`) se documenta en **[ADR-004](ADR004_estrategia_ci_cd_github_actions.md)**.

``` mermaid
gitGraph
    commit id: "v1.0.0"
    branch develop
    checkout develop
    commit id: "setup"
    branch feature/login
    checkout feature/login
    commit id: "feat: add login actions"
    commit id: "feat: add login steps"
    checkout develop
    merge feature/login
    branch release/v1.1.0
    checkout release/v1.1.0
    commit id: "chore: update version to 1.1.0"
    checkout main
    merge release/v1.1.0 tag: "v1.1.0"
    checkout develop
    merge release/v1.1.0
```

### 2.5. Estrategia de Tagging
**Ejecución:** @smoke, @regression, @US-[ID], @E-[ID].

**Documentación Allure:** @TC-[ID] (Test Case), @TS-[ID] (Test Scenario).

## 3. Consecuencias
### Positivas:

- Código uniforme y profesional.

- Trazabilidad total desde el requerimiento (US) hasta el reporte (Allure).

- Historial de Git limpio y generable automáticamente como Changelog.

### Negativas:

- Requiere disciplina estricta del equipo.

- Configuración inicial de herramientas de soporte (Husky, commitlint, etc.).