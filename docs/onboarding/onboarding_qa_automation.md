# Onboarding - Procesos de QA Automatizado (Automation QA)

Esta guía documenta la arquitectura técnica, herramientas y buenas prácticas de codificación del framework de automatización de pruebas E2E en este proyecto.

---

## 1. El Rol del Automation QA Agent
El rol de automatización se enfoca en traducir las especificaciones de negocio a código ejecutable robusto:
* **Especificar en Gherkin (BDD):** Escribir archivos de características `.feature` en español, describiendo de forma abstracta e independiente de datos fijos.
* **Implementar Steps Definitions:** Desarrollar los mappings en TypeScript utilizando `playwright-bdd`.
* **Page Object Model (POM):** Implementar y mantener clases `Page`, `Actions` y `Questions` bajo el patrón de Screenplay/POM mejorado.
* **Mantenimiento Técnico:** Configurar y actualizar locators y aserciones robustas para evitar pruebas frágiles ("flaky").

---

## 2. Arquitectura de Automatización
El framework se basa en **Playwright + playwright-bdd**:

* **Carpeta `features/`:** Contiene los archivos `.feature` de Cucumber redactados en español.
* **Carpeta `src/pages/`:** Contiene los locators orientados a la experiencia del usuario (según [ADR-003](file:///c:/Users/FernandoMontiel/Documents/Fer/demos/Demo_ProcesoQA_IA/demo_library_playwright/docs/adr/ADR003_estrategia_de_locators.md)).
* **Carpeta `src/actions/`:** Contiene las clases de interacción (acciones del usuario como completar formularios, clics, etc.).
* **Carpeta `src/questions/`:** Contiene las aserciones lógicas que validan estados visibles y resultados esperados.
* **Carpeta `src/runner/` [GENERADA/IGNORADA]:** Contiene las especificaciones TypeScript autogeneradas por la herramienta `bddgen` a partir de los archivos `.feature`. **No se debe modificar esta carpeta directamente.**

---

## 3. Estrategia de Datos Dinámicos con Faker
Para evitar colisiones de datos y rate-limiting en base de datos reales (como Supabase Auth), las pruebas de éxito y duplicidad utilizan datos aleatorios únicos generados al vuelo:
* **`support/DataGenerator.ts`:** Utiliza la librería `@faker-js/faker` para fabricar perfiles de usuario completos y correos electrónicos con formato único (`nombre.apellido.numero@yopmail.com`).
* **Uso en Steps:**
  ```typescript
  When('completo el formulario de registro con datos obligatorios válidos dinámicos', async ({ registroActions, scenarioContext }) => {
    const user = DataGenerator.generateRandomUser();
    // Guardamos en el contexto para reusar en aserciones o precondiciones de duplicados
    scenarioContext.user = user;
    await registroActions.completarFormulario(user);
  });
  ```

---

## 4. Contexto Compartido (`scenarioContext`)
Playwright aísla los tests pero no comparte estado entre pasos Cucumber por defecto. Para resolver esto:
* Extendemos el tipo de fixture de Playwright en [bddFixtures.ts](file:///c:/Users/FernandoMontiel/Documents/Fer/demos/Demo_ProcesoQA_IA/demo_library_playwright/src/fixtures/bddFixtures.ts) para inyectar `scenarioContext`:
  ```typescript
  scenarioContext: { email?: string; [key: string]: any }
  ```
* Esto permite transferir valores dinámicos del paso "Dado" al paso "Cuando/Entonces" sin usar variables globales que romperían la ejecución paralela.
