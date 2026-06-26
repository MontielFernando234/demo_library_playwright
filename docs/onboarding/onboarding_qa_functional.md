# Onboarding - Procesos de QA Funcional (Functional QA)

Esta guía documenta las directrices, herramientas y flujos para realizar tareas de **QA Manual / Funcional** con la ayuda de agentes de IA en este proyecto.

---

## 1. El Rol del Functional QA Agent
El rol funcional se centra en la especificación, diseño y ejecución manual de pruebas:
* **Refinar Requerimientos:** Analizar las Historias de Usuario locales en `/context/user_stories/` para identificar inconsistencias y plantear preguntas aclaratorias.
* **Diseñar Casos de Prueba:** Crear y estructurar la suite de pruebas funcionales en formato CSV bajo la ruta del feature correspondiente.
* **Trazabilidad:** Construir la matriz de trazabilidad para asegurar cobertura al 100% frente a criterios de aceptación.
* **Testing Exploratorio:** Ejecutar pruebas manuales y tours exploratorios usando herramientas de navegación.

---

## 2. Estructura de Casos de Prueba (CSV)
Los casos de prueba deben guardarse en archivos `02_casos_de_prueba.csv` y mantener los siguientes campos obligatorios:
* **ID:** Identificador único (ej. `TC-REG-001`).
* **Nombre:** Título descriptivo y corto.
* **Descripción:** Objetivo del caso de prueba.
* **Precondiciones:** Estado previo requerido.
* **Pasos:** Lista numerada de acciones interactivas.
* **Resultado Esperado:** Salida o reacción esperada de la UI.
* **Prioridad:** Alta / Media / Baja.
* **Tipo:** Positivo / Negativo / Borde.
* **Criterio de Aceptación:** ID del criterio asociado (ej. `AC-01`).
* **Técnica de Diseño:** EP (Partición de Equivalencia) / BVA (Valores Límite) / Tabla de Decisión.
* **Candidato Automatización:** Sí / No.

*Nota:* Las historias y carpetas de contexto en el proyecto se almacenan localmente en `/context/` (las cuales están excluidas en Git para evitar colisiones pero mantienen la estructura de carpetas mediante archivos `.gitkeep`).

---

## 3. Matriz de Trazabilidad
Para garantizar el cumplimiento de los requerimientos, el agente funcional debe mantener la **Matriz de Trazabilidad** (`03_matriz_trazabilidad.md`) correlacionando los criterios de aceptación (`AC`) de la historia de usuario con los IDs de casos de prueba (`TC`):

| Criterio de Aceptación (AC) | Casos de Prueba Relacionados (TC) | Estado | Cobertura |
|-----------------------------|-----------------------------------|--------|-----------|
| AC-01 (Registro Exitoso)    | TC-REG-001, TC-REG-002            | OK     | 100%      |
| AC-02 (Email Duplicado)     | TC-REG-013                        | OK     | 100%      |

---

## 4. Ejecución de Pruebas Manuales
* **Evidencia:** Al ejecutar pruebas funcionales, las capturas de pantalla y videos se almacenan localmente en la carpeta de reportes temporales.
* **Orquestación:** El QA Lead puede solicitar la revisión paritaria de casos de prueba (`/qa-peer-review`) para verificar la gramática Gherkin y la cobertura de los pasos funcionales diseñados.
