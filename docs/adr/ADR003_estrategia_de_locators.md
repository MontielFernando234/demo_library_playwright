# [ADR-003]: Estrategia de Selección de Locators y Resiliencia de Tests
**Fecha:** 2026-05-11

**Estado:** Propuesto

## 1. Contexto y Problema
Uno de los mayores costos en la automatización E2E es el mantenimiento de tests debido a selectores frágiles que se rompen con cambios visuales menores. Para aprovechar las capacidades de auto-waiting y resiliencia de Playwright, necesitamos una jerarquía clara de selección de elementos que priorice la accesibilidad y el contrato de pruebas sobre la estructura del DOM.

## 2. Decisión
Adoptaremos una Pirámide de Prioridad de Locators. El agente debe intentar localizar un elemento usando el nivel más alto posible antes de bajar al siguiente.

### 2.1. Nivel 1: Locators Orientados al Usuario (Prioridad Máxima)
Se basan en cómo el usuario percibe la página. Si estos cambian, es probable que la experiencia del usuario también haya cambiado.

**page.getByRole():** Prioridad absoluta. Valida la semántica (button, heading, checkbox) y el nombre accesible.

**page.getByLabel():** Para campos de formulario vinculados a etiquetas <label>.

**page.getByText():** Para elementos de contenido estático o mensajes de confirmación.

### 2.2. Nivel 2: Atributos de Test (Contrato QA-Dev)
Cuando el Nivel 1 no es único o el texto es altamente dinámico (i18n).

**page.getByTestId():** Se usará el atributo data-testid. Si no existe, el agente tiene la responsabilidad de solicitarlo o agregarlo al código fuente.

### 2.3. Nivel 3: Selectores de Atributos CSS (Último Recurso)
Solo si los niveles anteriores son técnicamente imposibles.

**Atributos funcionales:** [name="email"], [type="submit"].

**CSS estable:** Evitar clases de estilo (ej. Tailwind) y priorizar clases de estado o identidad.

### 2.4. Prácticas Prohibidas
**XPaths Absolutos:** Totalmente prohibidos por su extrema fragilidad.

**Selectores por Jerarquía Estructural:** (ej: div > div > span).

**IDs Autogenerados:** (ej: id="j_id_23").

## 3. Jerarquía Visual de Selección

``` mermaid
graph TD
    A[Inicio: Localizar Elemento] --> B{¿Tiene un Rol Accesible?}
    B -- Sí --> C[Usar getByRole]
    B -- No --> D{¿Tiene Label o Texto único?}
    D -- Sí --> E[Usar getByLabel / getByText]
    D -- No --> F{¿Tiene data-testid?}
    F -- Sí --> G[Usar getByTestId]
    F -- No --> H[Usar Atributo CSS Estable / Solicitar data-testid]
    
    style C fill:#d4edda,stroke:#28a745
    style E fill:#d4edda,stroke:#28a745
    style G fill:#fff3e0,stroke:#ff9800
    style H fill:#f8d7da,stroke:#dc3545

```