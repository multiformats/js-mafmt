import { Multiaddr } from 'multiaddr'

// eslint-disable-next-line etc/prefer-interface
export type MatchesFunction = (a: string | Uint8Array | Multiaddr) => boolean
// eslint-disable-next-line etc/prefer-interface
export type PartialMatchesFunction = (protos: string[]) => boolean | string[] | null

export interface Mafmt {
  toString: () => string
  input?: Array<(Mafmt | (() => Mafmt))>
  matches: MatchesFunction
  partialMatch: PartialMatchesFunction
}
