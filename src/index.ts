import { multiaddr } from '@multiformats/multiaddr'
import type { Multiaddr } from '@multiformats/multiaddr'

export interface MatchesFunction { (a: string | Uint8Array | Multiaddr): boolean }
export interface PartialMatchesFunction { (protos: string[]): boolean | string[] | null }

export interface Mafmt {
  toString: () => string
  input?: Array<(Mafmt | (() => Mafmt))>
  matches: MatchesFunction
  partialMatch: PartialMatchesFunction
}

/*
 * Valid combinations
 */
export const DNS4 = base('dns4')
export const DNS6 = base('dns6')
export const DNSADDR = base('dnsaddr')
export const DNS = or(
  base('dns'),
  DNSADDR,
  DNS4,
  DNS6
)

export const IP = or(base('ip4'), base('ip6'))
export const TCP = or(
  and(IP, base('tcp')),
  and(DNS, base('tcp'))
)
export const UDP = and(IP, base('udp'))
export const UTP = and(UDP, base('utp'))

export const QUIC = and(UDP, base('quic'))

export const WebSockets = or(
  and(TCP, base('ws')),
  and(DNS, base('ws'))
)

export const WebSocketsSecure = or(
  and(TCP, base('wss')),
  and(DNS, base('wss'))
)

export const HTTP = or(
  and(TCP, base('http')),
  and(IP, base('http')),
  and(DNS, base('http'))
)

export const HTTPS = or(
  and(TCP, base('https')),
  and(IP, base('https')),
  and(DNS, base('https'))
)

export const WebRTCStar = or(
  and(WebSockets, base('p2p-webrtc-star'), base('p2p')),
  and(WebSocketsSecure, base('p2p-webrtc-star'), base('p2p')),
  and(WebSockets, base('p2p-webrtc-star')),
  and(WebSocketsSecure, base('p2p-webrtc-star'))
)

export const WebSocketStar = or(
  and(WebSockets, base('p2p-websocket-star'), base('p2p')),
  and(WebSocketsSecure, base('p2p-websocket-star'), base('p2p')),
  and(WebSockets, base('p2p-websocket-star')),
  and(WebSocketsSecure, base('p2p-websocket-star'))
)

export const WebRTCDirect = or(
  and(HTTP, base('p2p-webrtc-direct'), base('p2p')),
  and(HTTPS, base('p2p-webrtc-direct'), base('p2p')),
  and(HTTP, base('p2p-webrtc-direct')),
  and(HTTPS, base('p2p-webrtc-direct'))
)

export const Reliable = or(
  WebSockets,
  WebSocketsSecure,
  HTTP,
  HTTPS,
  WebRTCStar,
  WebRTCDirect,
  TCP,
  UTP,
  QUIC,
  DNS
)

// Unlike ws-star, stardust can run over any transport thus removing the requirement for websockets (but don't even think about running a stardust server over webrtc-star ;) )
export const Stardust = or(
  and(Reliable, base('p2p-stardust'), base('p2p')),
  and(Reliable, base('p2p-stardust'))
)

const _P2P = or(
  and(Reliable, base('p2p')),
  WebRTCStar,
  WebRTCDirect,
  base('p2p')
)

const _Circuit = or(
  and(_P2P, base('p2p-circuit'), _P2P),
  and(_P2P, base('p2p-circuit')),
  and(base('p2p-circuit'), _P2P),
  and(Reliable, base('p2p-circuit')),
  and(base('p2p-circuit'), Reliable),
  base('p2p-circuit')
)

const CircuitRecursive = () => or(
  and(_Circuit, CircuitRecursive),
  _Circuit
)

export const Circuit = CircuitRecursive()

export const P2P = or(
  and(Circuit, _P2P, Circuit),
  and(_P2P, Circuit),
  and(Circuit, _P2P),
  Circuit,
  _P2P
)

export const IPFS = P2P

/*
 * Validation funcs
 */

function makeMatchesFunction (partialMatch: PartialMatchesFunction) {
  function matches (a: string | Uint8Array | Multiaddr): boolean {
    let ma

    try {
      ma = multiaddr(a)
    } catch (err: any) { // catch error
      return false // also if it's invalid it's probably not matching as well so return false
    }

    const out = partialMatch(ma.protoNames())
    if (out === null) {
      return false
    }

    if (out === true || out === false) {
      return out
    }

    return out.length === 0
  }

  return matches
}

function and (...args: Array<Mafmt | (() => Mafmt)>): Mafmt {
  function partialMatch (a: string[]): boolean | string[] | null {
    if (a.length < args.length) {
      return null
    }

    let out: boolean | string[] | null = a

    args.some((arg) => {
      out = typeof arg === 'function'
        ? arg().partialMatch(a)
        : arg.partialMatch(a)

      if (Array.isArray(out)) {
        a = out
      }

      if (out === null) {
        return true
      }

      return false
    })

    return out
  }

  return {
    toString: function () { return '{ ' + args.join(' ') + ' }' },
    input: args,
    matches: makeMatchesFunction(partialMatch),
    partialMatch: partialMatch
  }
}

function or (...args: Array<Mafmt | (() => Mafmt)>): Mafmt {
  function partialMatch (a: string[]): boolean | string[] | null {
    let out = null
    args.some((arg) => {
      const res = typeof arg === 'function'
        ? arg().partialMatch(a)
        : arg.partialMatch(a)
      if (res != null) {
        out = res
        return true
      }
      return false
    })

    return out
  }

  const result = {
    toString: function () { return '{ ' + args.join(' ') + ' }' },
    input: args,
    matches: makeMatchesFunction(partialMatch),
    partialMatch: partialMatch
  }

  return result
}

function base (n: string): Mafmt {
  const name = n

  function matches (a: string | Uint8Array | Multiaddr) {
    let ma: Multiaddr

    try {
      ma = multiaddr(a)
    } catch (err: any) { // catch error
      return false // also if it's invalid it's probably not matching as well so return false
    }

    const pnames = ma.protoNames()
    if (pnames.length === 1 && pnames[0] === name) {
      return true
    }
    return false
  }

  function partialMatch (protos: string[]): boolean | string[] | null {
    if (protos.length === 0) {
      return null
    }

    if (protos[0] === name) {
      return protos.slice(1)
    }
    return null
  }

  return {
    toString: function () { return name },
    matches: matches,
    partialMatch: partialMatch
  }
}
