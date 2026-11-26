# goZip

![tests](https://img.shields.io/badge/tests-42%20passing-brightgreen) ![version](https://img.shields.io/badge/version-0.1.0-blue)

goZip is a side chat that sits beside your Claude Code session. Ask Fable, Opus, Sonnet or Haiku about the work while Claude keeps going, then send notes, queued prompts or interrupts to the main chat.

It's a mod: a plugin built on Claude Code's function hooks.

```
goZip              Sonnet 5.5 · synced 14:05 · up to date
Stop  Sync  Close
────────────────────────────────────────────────────────
(side) › why did it switch to the retry wrapper?
claude-sonnet-5-5 ›
The upload kept timing out on large files, so main wrapped
put() in withRetry() in src/upload.ts (it read that file at
14:02).
→ main  → queue
(note) › keep the retry count configurable
· sent to main: it reads this at its next step
────────────────────────────────────────────────────────
Type: Ask side    Model: Sonnet 5.5
╭──────────────────────────────────────────────────────╮
│ Ask the side model                              Send │
╰──────────────────────────────────────────────────────╯
```

## How it knows the session

- **Fork.** The first question runs `claude -p --resume <session> --fork-session`. The side model starts with everything main knows. It streams token by token.
- **Live progress.** goZip hooks main's tool calls and turns. Each later question carries what main did since the last answer: files edited, commands run, main's replies.
- **Disk.** The side model has Read, Grep and Glob, and nothing that writes. No MCP servers, no hooks, and user settings only, with the project's deny rules carried over. It's told to read files rather than trust its memory.
- **Sync status.** The header shows when main's steps last reached the side model and how many new ones wait for your next question, e.g. `synced 14:05 · 3 new main steps, sent with your next question`.
- **Sync.** When main has moved too far (over ~4k chars of progress), the next question forks main again. `/clear` and `/resume` reset it too. Sync (`y`) forces it: the side model starts over from main as it is now and forgets the side chat.

The same progress log is mirrored to `~/.gozip/progress/<sessionId>.md` for other sessions or agents to read. It holds the start of each command main ran, file paths and main's replies. Credentials are masked with Claude Code's own redaction before it's written, but that's best effort: treat the folder as sensitive.

**Cost:** the first question of a fork writes the whole conversation to the prompt cache on the side model. On a long session that can be tens of cents. Later questions resume the side session and read that cache.

## Requirements

- Claude Code 2.1.332 or later. Older builds are untested.
- `claude` on your PATH. On Windows: `claude.exe`, or `node.exe` with the npm package.
- Mods turned on. Add this to the `env` block of `~/.claude/settings.json`:

  ```json
  "CLAUDE_CODE_ENABLE_FUNCTION_HOOKS": "1"
  ```

## Install

```
/plugin marketplace add walangstudio/marketplace
/plugin install gozip@walangstudio
```

Working from a checkout: `claude --plugin-dir path/to/gozip`.

## Use

`/gozip` toggles the pane. Type in the box and press Enter; a question sent while an answer streams is asked once it ends. The **Type** dropdown picks what the message does:

| Type | Goes to | How |
| --- | --- | --- |
| Ask side | the side model | Forked session, streamed into the pane |
| Note to main | main, mid-turn | Main reads it at its next step without stopping |
| Queue for main | main, next turn | Runs after the current turn ends |
| Interrupt main | main, now | Stops the running turn and starts on this |

**Model** picks Fable, Opus, Sonnet or Haiku, the same aliases as `/model`; each shows its version once it has answered. Each side answer has **→ main** and **→ queue**. Both forward it to main marked as data, not your own instruction. **→ main** is a note while main works, or a new prompt when main is idle. **→ queue** runs it after main's current turn.

Where the app has no dropdown (VS Code, mobile), prefix the text instead: `>>` note, `>>>` queue, `!!` interrupt.

| Command | Does |
| --- | --- |
| `/gozip` | Open or close the pane |
| `/gozip <text>` | Send text, same prefixes |
| `/gozip sync` | Sync: the next question forks main again |
| `/gozip stop` | Stop the answer in progress |

Keys in the pane: `x` stop, `y` sync, `q` close, `s` send the latest reply to main.

## License

MIT © walangstudio
