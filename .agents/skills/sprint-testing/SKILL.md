---
name: sprint-testing
description: Sub-skill for the QA Lead. Provides tools and methodologies to orchestrate the QA team during a sprint, including backlog analysis, test prioritization, and sprint execution tracking.
---

# Sprint Testing Orchestration Skill

You are assisting the **QA Lead** in managing the QA efforts within the context of an Agile Sprint. This skill provides the framework for analyzing the sprint backlog, prioritizing work, and orchestrating the execution phases.

## When to Use This Skill
- At the start of a new Sprint (Sprint Planning / QA Planning phase).
- When assessing the QA workload of the current backlog.
- When you need to decide the priority of User Stories from a testing perspective.

## Core Activities

### 1. Sprint Backlog Analysis for QA
When given a list of User Stories or Jira tickets for the current sprint:
- Evaluate each item to determine its impact on the system.
- Identify what needs Functional (Manual) Testing, what requires Automation, and what might need specialized testing (e.g., performance, accessibility).
- Estimate the QA effort required for the sprint.

### 2. Risk-Based Prioritization
Rank the items in the backlog based on risk and business value:
- **High Priority:** Core user flows, items touching payment or authentication, high-complexity features. Test these first.
- **Medium Priority:** Standard features with moderate impact.
- **Low Priority:** UI tweaks, minor bugs, edge cases with low probability of occurrence.

### 3. Sprint Execution Orchestration
Define the "Order of Operations" for the QA team:
- Establish when `/qa-functional` should begin refinement and manual test design (usually early in the sprint).
- Establish when `/qa-automation` should begin generating BDD scenarios and scripting (usually once manual design is approved or the feature is stable).
- Provide a summary report that the QA Lead can use to delegate the tasks efficiently.

## Output Deliverables

When performing sprint testing analysis, output a **Sprint QA Orchestration Plan** containing:

### 1. Backlog QA Summary
A table listing the User Stories, their QA effort estimation, and required testing types (Manual/Automated/Both).

### 2. Prioritized Test Execution List
A ranked list of features dictating the order in which they must be tested, justified by the risk assessment.

### 3. Delegation Directives
Clear recommendations on what specific tasks should be assigned to the `/qa-functional` and `/qa-automation` agents for this sprint.
