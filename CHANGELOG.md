# Changelog

## [0.1.2] - 2026-11-27

### Fixed
- A side question in a main session running Code Mode (experimental) no longer fails with `This session was started in Code Mode ... can't be resumed`. The side model then reads through REPL scripts, still limited to Read, Grep and Glob.

## [0.1.1] - 2026-11-27

### Fixed
- A side question whose fork fails shows why (e.g. `No conversation found with session ID: ...`) instead of `error_during_execution`.
- Clearer wording before the first fork and after Sync: the header reads `forks main on your next question`.

## [0.1.0] - 2026-11-26

### Added
- `/gozip` toggles a side-chat pane. It runs mid-turn.
- The side model is a fork of the session (`claude -p --resume --fork-session`). Its answer streams in token by token; a question sent meanwhile waits its turn. Fable, Opus, Sonnet or Haiku, picked from a dropdown.
- Each question carries main's progress since the last answer: edits, commands, replies. The side model re-forks when main moved too far, after `/clear` or `/resume`, or on Sync.
- Message types: ask the side model, note to main mid-turn, queue a prompt for main, interrupt main. Prefixes `>>`, `>>>`, `!!` where there is no dropdown.
- Each side reply has → main (a note, or a prompt when main is idle) and → queue (after the current turn), forwarded as data rather than the user's own instruction.
- Progress mirrored to `~/.gozip/progress/<sessionId>.md`, credentials masked by Claude Code's redaction.

### Security
- The side model gets Read, Grep and Glob only, no MCP servers, no hooks and user settings only; the project's deny rules are carried over.
- Windows: claude, node and where are run by absolute path from PATH or System32, never from the project folder.
- Main's progress text is escaped and masked before it reaches the side prompt; control characters are stripped.
