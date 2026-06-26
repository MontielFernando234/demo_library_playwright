---
name: jira-agiletest
description: >
  Sub-skill for interacting with Jira and the AgileTest plugin via the @mcp:agiletest MCP server.
  Used to create and manage preconditions, test cases, test plans, test executions, bugs, and to
  execute and synchronize test results with evidence in AgileTest for QA processes.
---

# Jira AgileTest Skill

Eres el agente responsable de gestionar el ciclo de vida completo del testing en **AgileTest** (plugin de Jira), utilizando exclusivamente el MCP `@mcp:agiletest`.

---

## Autenticación (Paso Obligatorio)

**Antes de cualquier operación**, verifica la conectividad con:

```
agiletest_authenticate → Sin parámetros requeridos
```

Si falla la autenticación, detente e informa al usuario. No continúes con ninguna otra operación.

---

## Cuándo usar este Skill

- Cuando se solicite "crear precondiciones en AgileTest".
- Cuando se solicite "crear test cases en Jira/AgileTest".
- Cuando se solicite "crear test execution" o "ejecutar test cases".
- Cuando se solicite "crear test plan" o "crear test suite".
- Cuando se solicite "registrar bug" o "vincular bug a un test case".
- Cuando se solicite "adjuntar evidencias" de ejecución.
- Cuando se solicite "importar resultados" desde JUnit, Cucumber, TestNG, NUnit o Robot.
- Cuando se solicite "cambiar estado" de un test case en ejecución (PASS / FAIL / BLOCKED).

---

## Orden Estándar del Flujo de Trabajo

```
1. Autenticar (agiletest_authenticate)
2. Crear / reusar Precondiciones
3. Crear Test Cases (vinculados a las precondiciones)
4. Crear Test Plan (opcional, agrupa ejecuciones)
5. Crear Test Execution
6. Agregar Test Cases a la Test Execution
7. Ejecutar Test Cases (registrar resultado, adjuntar evidencias, crear/vincular bugs)
8. (Opcional) Importar resultados automáticos desde XML
```

---

## FASE 1 — Precondiciones

### Estándar de Importación CSV (plantilla AgileTest)

```
Name,Details,Test Type Name
```

| Campo           | Descripción                              |
|----------------|------------------------------------------|
| `Name`          | Título/resumen de la precondición         |
| `Details`       | Descripción detallada (pasos de setup)    |
| `Test Type Name`| Tipo: `Manual`, `Automated`, etc.         |

> ⚠️ **Las precondiciones deben generarse ANTES que los test cases.** Son el estándar de AgileTest y se reusan en múltiples test cases.

### Buscar precondiciones existentes

```
agiletest_search_preconditions
  projectKey: "CLAVE_PROYECTO"   (opcional, usa default del env)
  keyword:    "texto a buscar"   (opcional)
  folderId:   "id_carpeta"       (opcional)
  page:        0
  size:        20
```

### Crear una nueva precondición

```
agiletest_create_precondition
  summary:     "Nombre/título de la precondición"   ← REQUERIDO
  projectKey:  "CLAVE_PROYECTO"
  description: "Detalle / pasos de setup"
  status:      "Active"
  folderId:    "id_carpeta"                         (opcional)
  customFields: {}                                   (opcional)
```

**Retorna:** `issueId` y `issueKey` de la precondición creada. **Guardar para vincular a test cases.**

### Ver test cases vinculados a una precondición

```
agiletest_get_precondition_test_cases
  issueId: "ID_de_la_precondición"
```

---

## FASE 2 — Test Cases

### Estándar de Importación CSV (plantilla AgileTest)

```
No,Summary,Assignee,Priority,Reporter,Precondition Keys,Data,Action,Expected result,CTF_Start At
```

| Campo              | Descripción                                              |
|-------------------|----------------------------------------------------------|
| `No`               | Número secuencial                                         |
| `Summary`          | Título del test case                                      |
| `Assignee`         | Usuario asignado                                          |
| `Priority`         | `Highest`, `High`, `Medium`, `Low`, `Lowest`             |
| `Reporter`         | Usuario que reporta                                       |
| `Precondition Keys`| Keys de precondiciones (ej: `QA-10,QA-11`)               |
| `Data`             | Datos de prueba (Test Data)                              |
| `Action`           | Acción del paso (Step action)                            |
| `Expected result`  | Resultado esperado del paso                              |
| `CTF_Start At`     | Campo personalizado de fecha de inicio                   |

> ℹ️ Cada fila del CSV representa **un paso** del test case. Filas con el mismo `Summary` se agrupan como pasos del mismo test case.

### Crear test cases (unitario o masivo)

```
agiletest_create_test_cases
  projectKey: "CLAVE_PROYECTO"
  testCases: [
    {
      summary:      "Título del Test Case"   ← REQUERIDO
      description:  "Descripción/contexto"
      priority:     "High"
      status:       "Draft" | "Ready" | "Deprecated"
      type:         "Manual" | "Automated"
      folderId:     "id_carpeta"             (opcional)
      preconditions: ["issueId_precond_1", "issueId_precond_2"]
      steps: [
        {
          action:         "Paso 1: Acción a realizar"
          expectedResult: "Resultado esperado del paso 1"
          testData:       "Dato de prueba del paso 1"   (opcional)
        },
        {
          action:         "Paso 2: Acción a realizar"
          expectedResult: "Resultado esperado del paso 2"
        }
      ]
      customFields: {}
    }
  ]
```

**Retorna:** Array de `issueId` e `issueKey` de los test cases creados. **Guardar para vincular a ejecuciones.**

### Agregar pasos individuales a un test case existente

```
agiletest_create_test_step
  issueId:        "ID_del_test_case"   ← REQUERIDO
  action:         "Acción del paso"    ← REQUERIDO
  expectedResult: "Resultado esperado"
  testData:       "Datos de prueba"    (opcional)
  index:           0                   (posición 0-based, opcional)
```

### Vincular precondiciones a un test case existente

```
agiletest_link_preconditions_to_test_case
  issueId:         "ID_del_test_case"             ← REQUERIDO
  preconditionIds: ["ID_precond_1", "ID_precond_2"] ← REQUERIDO
```

### Buscar test cases

```
agiletest_search_test_cases
  projectKey: "CLAVE_PROYECTO"
  keyword:    "texto a buscar"
  folderId:   "id_carpeta"
  status:     "Draft" | "Ready"
  type:       "Manual" | "Automated"
  page:        0
  size:        20
```

### Obtener pasos de un test case

```
agiletest_get_test_case_steps
  issueId: "ID_del_test_case"
```

---

## FASE 3 — Test Plans (Suites)

> Un **Test Plan** agrupa Test Executions relacionadas. Es el equivalente a una "Test Suite".

### Crear test plan

```
agiletest_create_test_plans
  projectKey: "CLAVE_PROYECTO"
  testPlans: [
    {
      summary:     "Nombre del Test Plan / Suite"   ← REQUERIDO
      description: "Descripción del plan"
      status:      "Draft" | "Active"
      milestoneId: "id_milestone"                   (opcional)
      folderId:    "id_carpeta"                     (opcional)
      customFields: {}
    }
  ]
```

### Vincular test executions a un test plan

```
agiletest_link_executions_to_plan
  issueId:       "ID_del_test_plan"
  executionIds:  ["ID_execution_1", "ID_execution_2"]
```

### Ver test cases de un test plan

```
agiletest_get_test_plan_test_cases
  issueId: "ID_del_test_plan"
  page:     0
  size:     20
```

---

## FASE 4 — Test Executions

### Crear test execution

```
agiletest_create_test_executions
  projectKey: "CLAVE_PROYECTO"
  testExecutions: [
    {
      summary:        "Nombre de la Test Execution"   ← REQUERIDO
      description:    "Descripción de la ejecución"
      status:         "Draft" | "In Progress"
      milestoneId:    "id_milestone"                  (opcional)
      environmentIds: ["id_env_1"]                    (opcional)
      customFields:   {}
    }
  ]
```

**Retorna:** `issueId` e `issueKey` de la ejecución creada.

### Agregar test cases a una test execution

```
agiletest_link_test_cases_to_execution
  issueId:     "ID_de_la_test_execution"         ← REQUERIDO
  testCaseIds: ["ID_tc_1", "ID_tc_2", "ID_tc_3"] ← REQUERIDO
```

### Ver test cases de una test execution

```
agiletest_get_execution_test_cases
  issueId: "ID_de_la_test_execution"
  page:     0
  size:     20
```

### Actualizar test execution (estado, ambiente, milestone)

```
agiletest_update_test_execution
  issueId:        "ID_de_la_test_execution"   ← REQUERIDO
  summary:        "Nuevo título"              (opcional)
  status:         "In Progress" | "Done"      (opcional)
  milestoneId:    "id_milestone"              (opcional)
  environmentIds: ["id_env_1"]                (opcional)
  description:    "Nueva descripción"         (opcional)
```

---

## FASE 5 — Ejecución de Test Cases (Registrar Resultados)

> Esta fase sincroniza el resultado real de cada test case dentro de una ejecución, adjunta evidencias y registra el resultado por paso.

### Actualizar resultado de un test case en una ejecución

```
agiletest_update_test_case_result
  executionId: "ID_de_la_test_execution"   ← REQUERIDO
  testCaseId:  "ID_del_test_case"          ← REQUERIDO
  status:      "PASS" | "FAIL" | "BLOCKED" | "TODO" | "SKIPPED" | "IN_PROGRESS"   ← REQUERIDO
  comment:     "Observaciones de la ejecución"
  evidenceUrls: [
    "https://storage.ejemplo.com/evidencia-screenshot.png",
    "https://storage.ejemplo.com/reporte-ejecucion.html"
  ]
  stepResults: [
    {
      stepId:       "ID_del_paso"
      status:       "PASS" | "FAIL" | "BLOCKED" | "TODO" | "SKIPPED"
      actualResult: "Resultado real observado"
      comment:      "Comentario del paso"
    }
  ]
```

> ℹ️ Las **evidencias** se adjuntan como URLs. Deben estar disponibles públicamente o en un storage accesible (ej: Azure Blob, S3, SharePoint). Adjuntar screenshots, logs, reportes HTML de Playwright, videos, etc.

### Ejecución ad-hoc (sin test execution formal)

```
agiletest_create_adhoc_execution
  issueId:       "ID_del_test_case"   ← REQUERIDO
  projectKey:    "CLAVE_PROYECTO"
  status:        "PASS" | "FAIL" | "BLOCKED" | "TODO"
  comment:       "Resultado rápido de la ejecución"
  milestoneId:   "id_milestone"       (opcional)
  environmentId: "id_env"             (opcional)
```

---

## FASE 6 — Bugs (Defectos)

### Flujo de bugs

```
┌──────────────────────────────────────────────────────────────────┐
│  1. Buscar bugs similares con agiletest_search_bugs              │
│                                                                  │
│  2. ¿Existe alguno y su estado NO es "Done" ni "Aprobado"?      │
│                                                                  │
│     SÍ (estado abierto/activo) → vincular bug existente         │
│     NO (no existe, o todos están en estado final) → crear nuevo  │
└──────────────────────────────────────────────────────────────────┘
```

> ⚠️ **Regla de estados finales:** Los bugs en estado **`Done`** o **`Aprobado`** representan defectos ya cerrados/resueltos en el proyecto Demo. **No deben vincularse** a nuevas ejecuciones fallidas, ya que son estados finales del flujo. Si todos los bugs encontrados están en alguno de estos estados, se debe **crear un bug nuevo**.

### Buscar bugs existentes antes de crear uno nuevo

```
agiletest_search_bugs
  jql: "project = QA AND issuetype = Bug AND summary ~ \"texto del error\" AND status NOT IN (\"Done\", \"Aprobado\")"   ← REQUERIDO
  maxResults:  10
  fields:     ["key", "summary", "status", "priority"]
```

> ℹ️ La cláusula `status NOT IN ("Done", "Aprobado")` excluye automáticamente los bugs en estados finales. Si la búsqueda retorna resultados vacíos, proceder directamente a crear un bug nuevo.

### Crear un nuevo bug

```
agiletest_create_bug
  projectKey:  "CLAVE_PROYECTO"   ← REQUERIDO
  summary:     "Título del bug"   ← REQUERIDO
  description: |
    **Pasos para reproducir:**
    1. Paso 1
    2. Paso 2

    **Resultado esperado:** ...
    **Resultado actual:** ...
    **Entorno:** Staging / Producción
  priority:            "Highest" | "High" | "Medium" | "Low" | "Lowest"
  environment:         "Staging"
  labels:              ["regression", "login"]
  components:          ["Frontend", "Auth"]
  assigneeAccountId:   "account-id-del-asignado"   (opcional)
```

**Retorna:** `issueKey` del bug (ej: `QA-42`). **Guardar para vincularlo.**

### Vincular un bug a un test case o test execution

```
agiletest_link_bug_to_issue
  inwardIssueKey:  "QA-10"        ← Test case o test execution   ← REQUERIDO
  outwardIssueKey: "QA-42"        ← Key del bug                  ← REQUERIDO
  linkType:        "is defect in" ← Ver tipos con agiletest_get_jira_link_types
  comment:         "Bug detectado durante ejecución manual del sprint 3"
```

### Obtener tipos de vínculos disponibles

```
agiletest_get_jira_link_types → Sin parámetros
```

---

## FASE 7 — Importación de Resultados Automatizados

### Desde Playwright / JUnit XML

```
agiletest_import_junit
  executionId:     "ID_o_Key_de_la_test_execution"   ← REQUERIDO
  xmlContent:      "<contenido del XML JUnit>"        ← REQUERIDO
  projectKey:      "CLAVE_PROYECTO"
  testEnvironment: "Staging"
```

### Desde Cucumber JSON

```
agiletest_import_cucumber
  executionId:  "ID_o_Key_de_la_test_execution"
  jsonContent:  "<contenido del JSON Cucumber>"
  projectKey:   "CLAVE_PROYECTO"
```

### Desde TestNG / NUnit / Robot Framework

```
agiletest_import_testng  → testExecutionId + xmlContent
agiletest_import_nunit   → executionId + xmlContent
agiletest_import_robot   → executionId + xmlContent
```

---

## Consultas y Utilidades

### Obtener información de un issue de Jira

```
agiletest_get_jira_issue
  issueKey: "QA-42"   ← REQUERIDO
  fields:   ["summary", "status", "assignee", "priority"]   (opcional)
```

### Obtener estados disponibles del proyecto

```
agiletest_get_test_statuses
  projectKey: "CLAVE_PROYECTO"   (opcional)
```

### Obtener tipos de test disponibles

```
agiletest_get_test_types
  projectKey: "CLAVE_PROYECTO"   (opcional)
```

### Gestionar ambientes de prueba

```
# Listar ambientes:
agiletest_get_test_environments → projectKey (opcional)

# Crear ambiente:
agiletest_create_test_environment
  name:        "Staging"         ← REQUERIDO
  projectKey:  "CLAVE_PROYECTO"
  description: "Ambiente de staging"
```

### Gestionar milestones

```
# Listar milestones:
agiletest_get_milestones → projectKey (opcional)

# Crear milestone:
agiletest_create_milestone
  name:        "Sprint 15"       ← REQUERIDO
  projectKey:  "CLAVE_PROYECTO"
  startDate:   "2026-07-01"
  endDate:     "2026-07-14"
```

### Organización en carpetas

```
# Mover test cases a carpeta:
agiletest_move_test_cases
  testCaseIds: ["ID_tc_1", "ID_tc_2"]
  folderId:    "id_carpeta_destino"

# Mover precondiciones a carpeta:
agiletest_move_preconditions
  preconditionIds: ["ID_prec_1"]
  folderId:        "id_carpeta_destino"
```

---

## Reglas y Restricciones

1. **SIEMPRE autenticar primero** con `agiletest_authenticate` antes de cualquier operación.
2. **Las precondiciones se crean ANTES que los test cases.** Guardar sus `issueId` para vincularlas.
3. **Buscar bugs existentes** antes de crear uno nuevo para evitar duplicados. **Solo vincular bugs activos:** los que están en estado `Done` o `Aprobado` son estados finales del flujo del proyecto Demo y **no deben vincularse**; si todos los resultados están en esos estados, crear un bug nuevo.
4. **Las evidencias son URLs** (no archivos locales). Deben estar en un storage accesible.
5. **Los test cases deben vincularse explícitamente** a la test execution usando `agiletest_link_test_cases_to_execution`.
6. **El resultado de cada test case** se registra con `agiletest_update_test_case_result` incluyendo el resultado por paso (`stepResults`) cuando sea posible.
7. **Guardar siempre los `issueId` e `issueKey`** retornados por cada operación de creación para usarlos en pasos posteriores.
8. **No usar** `@mcp:atlassian-mcp-server` para operaciones de AgileTest. Usar exclusivamente `@mcp:agiletest`.
9. **Los gherkins/features** siguen las reglas del proyecto: en Español, con tags `@smoke`, `@regression`, `@USXX`, `@nombreFuncionalidad`.
10. **La documentación** generada se guarda en `/docs` (o la subcarpeta correspondiente).

---

## Mapeo CSV → MCP: Precondiciones

| Campo CSV       | Parámetro MCP              |
|----------------|----------------------------|
| `Name`          | `summary`                  |
| `Details`       | `description`              |
| `Test Type Name`| `customFields.testType` o `type` al vincular |

---

## Mapeo CSV → MCP: Test Cases

| Campo CSV          | Parámetro MCP                          |
|-------------------|----------------------------------------|
| `Summary`          | `testCases[].summary`                  |
| `Priority`         | `testCases[].priority`                 |
| `Precondition Keys`| `testCases[].preconditions[]` (IDs)    |
| `Data`             | `steps[].testData`                     |
| `Action`           | `steps[].action`                       |
| `Expected result`  | `steps[].expectedResult`               |
| `Assignee`         | `customFields.assignee`                |
| `Reporter`         | `customFields.reporter`                |
| `CTF_Start At`     | `customFields.startAt`                 |

---

## Entregables por Fase

| Fase                    | Entregable                                                         |
|------------------------|--------------------------------------------------------------------|
| Precondiciones         | Lista de `issueKey` (ej: `QA-5, QA-6`)                            |
| Test Cases             | Lista de `issueKey` con sus pasos y precondiciones vinculadas       |
| Test Plan              | `issueKey` del plan + executions vinculadas                        |
| Test Execution         | `issueKey` de la ejecución + test cases vinculados                 |
| Ejecución              | Estado por test case, evidencias adjuntas, bugs vinculados         |
| Bugs                   | `issueKey` del bug + link al test case/execution afectado          |
| Importación automática | Confirmación de resultados importados en la test execution         |
