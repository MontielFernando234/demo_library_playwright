# E2E Testing Framework - Playwright BDD Template

Este repositorio contiene una plantilla de pruebas de automatización End-to-End (E2E) diseñada para probar flujos de usuario complejos y comportamientos de frontend de forma robusta, escalable y determinista.

---

## 1. Stack Tecnológico
* **Core:** [Playwright Test](https://playwright.dev/) + [TypeScript](https://www.typescriptlang.org/)
* **BDD:** [playwright-bdd](https://github.com/vitalets/playwright-bdd) (permite integrar sintaxis Gherkin de Cucumber con fixtures nativos de Playwright)
* **Datos de Prueba:** [@faker-js/faker](https://fakerjs.dev/) para generación de datos pseudoaleatorios válidos.

---

## 2. Arquitectura del Proyecto (Screenplay / POM Mejorado)
El framework separa estrictamente las responsabilidades para mantener archivos pequeños y evitar Page Objects monolíticos:

* `/features/`: Archivos Gherkin `.feature` redactados en español que describen los comportamientos y flujos lógicos del negocio.
* `/src/pages/`: Clases Page conteniendo únicamente **selectores de UI** y constantes.
* `/src/actions/`: Clases conteniendo la **lógica de interacción** (completar formularios, clics, navegación).
* `/src/questions/`: Clases responsables de las **aserciones** y validación de estados de la pantalla.
* `/src/fixtures/`: Fixtures de Playwright (como `scenarioContext` y mapeos de POM) inyectados automáticamente en los pasos Cucumber.
* `/support/`: Capa técnica que contiene utilidades transversales y el generador de datos dinámicos (`DataGenerator.ts`).

---

## 3. Guías de Onboarding para Agentes de IA
Si eres un agente de IA que acaba de incorporarse a este repositorio, te recomendamos leer las siguientes guías específicas de inducción:

1. 📂 **[Orquestación y QA Lead](file:///c:/Users/FernandoMontiel/Documents/Fer/demos/Demo_ProcesoQA_IA/demo_library_playwright/docs/onboarding/onboarding_agent_orchestrator.md)**: Flujos conceptuales, ciclo de vida del sprint y configuración en CI/CD.
2. 📝 **[Proceso de QA Funcional / Manual](file:///c:/Users/FernandoMontiel/Documents/Fer/demos/Demo_ProcesoQA_IA/demo_library_playwright/docs/onboarding/onboarding_qa_functional.md)**: Diseño de casos en CSV, matriz de trazabilidad y requerimientos locales.
3. ⚙️ **[Proceso de QA Automatizado](file:///c:/Users/FernandoMontiel/Documents/Fer/demos/Demo_ProcesoQA_IA/demo_library_playwright/docs/onboarding/onboarding_qa_automation.md)**: Estructura técnica de Playwright, `scenarioContext`, Faker y POM.

---

## 4. Integración en CI/CD (GitHub Actions)
El repositorio incluye un workflow automatizado en GitHub Actions que se dispara en cada Push o Pull Request:
* **Linting:** Verifica que se cumplan las convenciones de código y sintaxis TypeScript (`npm run lint`).
* **Test Gate:** Genera los archivos BDD y ejecuta las pruebas de Playwright de forma headless en Chromium (`npm run test`).
* **Control de Rate-Limit:** En caso de fallas por límites de peticiones del backend (por ejemplo en Supabase Auth), el pipeline las registra directamente en los logs de la ejecución para su correspondiente análisis.

---

## 5. Instrucciones de Ejecución Local

### Instalación de dependencias:
```bash
npm install
```

### Compilar BDD y ejecutar pruebas en Chromium:
```bash
npm run test
```

### Ejecutar pruebas con interfaz visual de Playwright:
```bash
npm run test:ui
```

### Ejecutar en modo de depuración paso a paso:
```bash
npm run test:debug
```