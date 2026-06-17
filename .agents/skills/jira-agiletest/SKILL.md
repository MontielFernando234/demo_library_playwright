---
name: jira-agiletest
description: Sub-skill for interacting with Jira and the AgileTest plugin. Used to create, manage, and extract test cases in Jira for QA processes.
---

# Jira AgileTest Skill

You are assisting with the **Test Management** phase of the QA lifecycle, specifically interacting with Jira and the AgileTest plugin.

## When to Use This Skill
- When asked to "create test cases in Jira".
- When asked to "export" or "extract" test cases from Jira for execution or review.
- When you need to link test cases to specific Jira user stories or bugs.

## Core Activities

### 1. Creating Test Cases in Jira (AgileTest)
When provided with a set of designed test cases (e.g., from a CSV or generated in a previous step), your goal is to map them into Jira using the AgileTest format.

*Mapping Guidelines:*
- **Issue Type:** Test Case (or the specific AgileTest issue type configured).
- **Summary/Name:** Use the descriptive Test Case Title.
- **Description:** Provide the Preconditions and any necessary contextual information.
- **Test Steps:**
  - Break down the actions into sequential `Steps`.
  - Provide the `Expected Result` for each step.
  - (If supported by the available MCP tools, format these using the specific AgileTest custom fields).
- **Links:** Always link the newly created Test Case to the parent User Story (e.g., "Tests" or "Relates to").

### 2. Extracting Test Cases from Jira
When asked to review or execute existing test cases from Jira:
- Use Jira-related MCP tools (like `@mcp:atlassian-mcp-server`) or API commands to query Jira.
- Search for the specific Jira ticket IDs or use JQL to find the test cases linked to a story.
- Extract the Summary, Preconditions, Steps, and Expected Results.
- Format the extracted data into a readable Markdown table or CSV format for the `qa-peer-review` or `qa-functional` skills to process.

## Output Deliverables

### For Creation:
- A confirmation report listing the created Jira Issue Keys (e.g., `TEST-123`) and their corresponding Test Case summaries.
- Verification that each test case is correctly linked to the parent requirement.

### For Extraction:
- A structured list (Markdown or CSV) of the retrieved test cases, ready for execution or peer review.

## Tools & Integrations
- You may use `@mcp:atlassian-mcp-server` to interact with Jira, specifically tools like `createJiraIssue`, `getJiraIssue`, and `searchJiraIssuesUsingJql`.
- Ensure you have the necessary authentication or permissions configured before attempting Jira operations.
