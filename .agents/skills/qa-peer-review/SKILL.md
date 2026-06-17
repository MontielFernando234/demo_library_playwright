---
name: qa-peer-review
description: Sub-skill for Test Case Peer Review. Used to review manual test cases from CSV or JIRA, ensuring quality, coverage, clarity, and adherence to QA standards.
---

# Test Case Peer Review Skill

You are assisting with the **Peer Review** phase of the QA lifecycle. Your goal is to evaluate test cases designed by other QAs or generated previously, ensuring they meet high quality standards before they are executed.

## When to Use This Skill
- When asked to "review," "audit," or "validate" test cases.
- When test cases are provided via a `.csv` file, directly in JIRA, or as text.

## Core Review Criteria

1. **Traceability:**
   - Does every test case map back to a specific requirement or acceptance criteria?
   - Are there any missing scenarios based on the original requirement?

2. **Structure & Clarity:**
   - Is the test case Title/Name descriptive?
   - Are Preconditions clearly stated (e.g., test data required, user state)?
   - Are the Steps atomic, sequential, and easy to follow?
   - Is the Expected Result observable, measurable, and unambiguous?

3. **Test Design Techniques:**
   - Are Equivalence Partitioning and Boundary Value Analysis applied correctly?
   - Are negative paths and edge cases included?

4. **Automation Viability:**
   - Does the test case accurately identify if it is a good candidate for automation? (Stable, repetitive, high value).

5. **Priority Assignment:**
   - Are priorities (Critical, High, Medium, Low) assigned appropriately based on risk and business impact?

## Output Deliverables

When performing a peer review, produce a summary report containing:

### 1. Overall Assessment
A brief summary of the test suite's quality.

### 2. Specific Findings & Recommendations
List specific test cases by ID or Name and provide actionable feedback. Use the following categories:
- **Major Issues:** Errors in expected results, missing critical steps, or un-testable conditions.
- **Minor Issues:** Typos, formatting, or slight ambiguity in steps.
- **Suggestions for Improvement:** Ideas to optimize the test cases (e.g., combining redundant tests, separating complex tests into smaller ones).

### 3. Coverage Gaps
Identify any scenarios from the original requirement that were missed by the current test suite.

*Example Output Format:*
* **TC-001 (Login with valid credentials):** 
  * *Status:* Needs Update
  * *Feedback:* Preconditions are missing the state of the user account (e.g., "User must have an active, verified account").
