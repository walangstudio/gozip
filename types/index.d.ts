export type GzKind = 'ask' | 'note' | 'queue' | 'interrupt'

export type GzModel = 'fable' | 'opus' | 'sonnet' | 'haiku'

export type GzMsg = {
  id: number
  role: 'you' | 'side' | 'sys'
  text: string
  kind?: GzKind
  model?: string
  isLive?: boolean
  isError?: boolean
  meta?: string
}

// The text being typed, `cut` characters of it scrolled off the field's left; `sent` counts Send presses.
export type GzField = { text: string; cut: number; sent?: number }

export type GzStep = { at: number; text: string; logged?: number }

declare module 'claude-code' {
  interface PluginState {
    gozip: {
      msgs: GzMsg[]
      sideId: string | null
      model: GzModel
      seen: Partial<Record<GzModel, string>>
      kind: GzKind
      isBusy: boolean
      progress: GzStep[]
      synced: number
      syncedAt: number | null
      turnId: string | null
      session: string | null
      isDirty: boolean
      field: GzField
      scrollBack: number
    }
  }
}
