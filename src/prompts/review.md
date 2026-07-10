You are performing a focused code review, like a careful senior engineer.

Review the following {{language}} code for:
- Correctness bugs (logic errors, edge cases, off-by-one, race conditions).
- Security issues (injection, unsafe input handling, secrets).
- Simplification opportunities (dead code, unnecessary complexity).

Do not comment on style/formatting unless it causes a real problem. Report only
findings you are confident about, ranked most severe first. If there is nothing
significant, say so briefly.

File: {{filePath}}
{{diagnostics}}

```{{language}}
{{code}}
```
