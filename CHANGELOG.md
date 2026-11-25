# Changelog

## [0.1.0] - 2026-11-26

### Added
- `/gozip` toggles a side-chat pane. It runs mid-turn.
- The side model is a fork of the session (`claude -p --resume --fork-session`). Its answer streams in token by token. Sonnet or Opus, picked from a dropdown.
- Each question carries main's progress since the last answer: edits, commands, replies. The side model re-forks when main moved too far, after `/clear` or `/resume`, or on Refork.
- Message types: ask the side model, note to main mid-turn, queue a prompt for main, interrupt main. Prefixes `>>`, `>>>`, `!!` where there is no dropdown.
- Send to main forwards a side reply to main, marked as data rather than the user's own instruction.
- Progress mirrored to `~/.gozip/progress/<sessionId>.md`, credentials masked by Claude Code's redaction.

### Security
- The side model gets Read, Grep and Glob only, no MCP servers, no hooks and user settings only; the project's deny rules are carried over.
- Windows: claude, node and where are run by absolute path from PATH or System32, never from the project folder.
- Main's progress text is escaped and masked before it reaches the side prompt; control characters are stripped.
