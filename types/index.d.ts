export type GzKind = 'ask' | 'note' | 'queue' | 'interrupt'

export type GzModel = 'sonnet' | 'opus'

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

export type GzStep = { at: number; text: string; logged?: number }

declare module 'claude-code' {
  interface PluginState {
    gozip: {
      msgs: GzMsg[]
      sideId: string | null
      model: GzModel
      kind: GzKind
      isBusy: boolean
      progress: GzStep[]
      synced: number
      turnId: string | null
      session: string | null
      isDirty: boolean
      sent: number
    }
  }
}
