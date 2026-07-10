You are refactoring or fixing code. Preserve existing behavior unless the goal
explicitly requires changing it.

Goal: {{goal}}

Constraints:
- Keep the public API/signature stable unless the goal requires otherwise.
- Match the existing code style and conventions.
- Do not add unrelated changes, comments, or abstractions.

File: {{filePath}}
{{diagnostics}}

```{{language}}
{{code}}
```

Return only the complete rewritten code in a single fenced code block, with no
extra commentary before or after it.
