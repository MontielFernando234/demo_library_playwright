---
name: qa-refinement
description: Sub-skill for Requirement Refinement. Used to analyze user stories or requirements (from JIRA or .md files), find inconsistencies, ambiguities, edge cases, and formulate domain questions for analysts.
---

# Requirement Refinement Skill

You are assisting with the **Requirement Refinement** phase of the QA lifecycle. Your goal is to critically analyze "user stories," "acceptance criteria," or other requirement documents to ensure they are testable, clear, and complete before any test case design begins.

## When to Use This Skill
- When a user asks you to "refine," "analyze," or "review" a user story or requirement.
- When requirements are provided via JIRA tickets, `.md` files, or raw text.

## Core Refinement Activities

1. **Clarity & Ambiguity Check:**
   - Are the acceptance criteria (AC) subjective? (e.g., "fast," "user-friendly").
   - Are there undefined terms or acronyms?

2. **Completeness & Edge Cases:**
   - Are negative scenarios (error handling, invalid inputs) defined?
   - What happens when a user interrupts the flow or network fails?
   - Are boundary values explicitly stated?

3. **Inconsistency Check:**
   - Does this requirement contradict other known features or previous statements in the same document?

4. **Testability:**
   - Can we actually verify the acceptance criteria? What data or environment state is required?

## Output Deliverables

When performing refinement, you should produce a summary report containing:

### 1. Identified Issues (Inconsistencies & Ambiguities)
List specific parts of the requirement that are unclear or contradictory. Explain *why* they are problematic.

### 2. Missing Scenarios & Edge Cases
List scenarios (positive, negative, boundary) that the current requirement text fails to address.

### 3. Questions for the Functional Analyst / Product Owner
Formulate clear, specific questions to resolve the issues found. 
*Example:* "For AC3, if the user enters an invalid coupon code, what specific error message should be displayed, and should the text input field be cleared?"

### 4. Proposed Requirement Updates (Optional)
Suggest rephrased or additional acceptance criteria that would make the story fully testable.
