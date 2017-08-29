'use strict'

const multiaddr = require('multiaddr')

/*
 * Valid combinations
 */
const DNS4 = base('dns4')
const DNS6 = base('dns6')
const _DNS = or(
  base('dns'),
  DNS4,
  DNS6
)

const IP = or(base('ip4'), base('ip6'))

const _UDP = and(IP, base('udp'))
const UDP = or(
  and(_UDP, base('ipfs')),
  _UDP
)

const _UTP = and(UDP, base('utp'))
const UTP = or(
  and(_UTP, base('ipfs')),
  _UTP
)

const _TCP = and(IP, base('tcp'))
const TCP = or(
  and(_TCP, base('ipfs')),
  _TCP
)

const __DNS = or(
  and(_DNS, base('tcp')),
  _DNS
)

const DNS = or(
  and(__DNS, base('ipfs')),
  __DNS
)

const _WebSockets = or(
  and(TCP, base('ws')),
  and(DNS, base('ws'))
)

const WebSockets = or(
  and(_WebSockets, base('ipfs')),
  _WebSockets
)

const _WebSocketsSecure = or(
  and(TCP, base('wss')),
  and(DNS, base('wss'))
)

const WebSocketsSecure = or(
  and(_WebSocketsSecure, base('ipfs')),
  _WebSocketsSecure
)

const HTTP = or(
  and(TCP, base('http')),
  and(DNS),
  and(DNS, base('http'))
)

const WebRTCStar = or(
  and(_WebSockets, base('p2p-webrtc-star'), base('ipfs')),
  and(_WebSocketsSecure, base('p2p-webrtc-star'), base('ipfs'))
)

const WebSocketsStar = or(
  and(WebSockets, base('p2p-websockets-star')),
  and(WebSockets, base('p2p-websockets-star'), base('ipfs')),
  and(WebSocketsSecure, base('p2p-websockets-star'), base('ipfs'))
)

const WebRTCDirect = and(HTTP, base('p2p-webrtc-direct'))

const Reliable = or(
  WebSockets,
  WebSocketsSecure,
  HTTP,
  WebRTCStar,
  WebRTCDirect,
  TCP,
  UTP
)

let _IPFS = or(
  Reliable,
  base('ipfs')
)

const _Circuit = or(
  and(_IPFS, base('p2p-circuit'), _IPFS),
  and(_IPFS, base('p2p-circuit')),
  and(base('p2p-circuit'), _IPFS),
  base('p2p-circuit')
)

const CircuitRecursive = () => or(
  and(_Circuit, CircuitRecursive),
  _Circuit
)

const Circuit = CircuitRecursive()

const IPFS = or(
  and(Circuit, _IPFS, Circuit),
  and(_IPFS, Circuit),
  and(Circuit, _IPFS),
  Circuit,
  _IPFS
)

exports.DNS = DNS
exports.DNS4 = DNS4
exports.DNS6 = DNS6
exports.IP = IP
exports.TCP = TCP
exports.UDP = UDP
exports.UTP = UTP
exports.HTTP = HTTP
exports.WebSockets = WebSockets
exports.WebSocketsSecure = WebSocketsSecure
exports.WebSocketsStar = WebSocketsStar
exports.WebRTCStar = WebRTCStar
exports.WebRTCDirect = WebRTCDirect
exports.Reliable = Reliable
exports.Circuit = Circuit
exports.IPFS = IPFS

/*
 * Validation funcs
 */

function and () {
  const args = Array.from(arguments)

  function matches (a) {
    if (typeof a === 'string') {
      a = multiaddr(a)
    }
    let out = partialMatch(a.protoNames())
    if (out === null) {
      return false
    }
    return out.length === 0
  }

  function partialMatch (a) {
    if (a.length < args.length) {
      return null
    }
    args.some((arg) => {
      a = typeof arg === 'function'
        ? arg().partialMatch(a)
        : arg.partialMatch(a)

      if (a === null) {
        return true
      }
    })

    return a
  }

  return {
    input: args,
    matches: matches,
    partialMatch: partialMatch
  }
}

function or () {
  const args = Array.from(arguments)

  function matches (a) {
    if (typeof a === 'string') {
      a = multiaddr(a)
    }
    const out = partialMatch(a.protoNames())
    if (out === null) {
      return false
    }
    return out.length === 0
  }

  function partialMatch (a) {
    let out = null
    args.some((arg) => {
      const res = typeof arg === 'function'
        ? arg().partialMatch(a)
        : arg.partialMatch(a)
      if (res) {
        out = res
        return true
      }
    })

    return out
  }

  const result = {
    toString: function () { return '{ ' + args.join(' ') + ' }' },
    input: args,
    matches: matches,
    partialMatch: partialMatch
  }

  return result
}

function base (n) {
  const name = n

  function matches (a) {
    if (typeof a === 'string') {
      a = multiaddr(a)
    }

    const pnames = a.protoNames()
    if (pnames.length === 1 && pnames[0] === name) {
      return true
    }
    return false
  }

  function partialMatch (protos) {
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
