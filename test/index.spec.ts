/* eslint-env mocha */
import { expect } from 'aegir/chai'
import { multiaddr } from '@multiformats/multiaddr'
import { fromString as uint8ArrayFromString } from 'uint8arrays/from-string'
import * as mafmt from '../src/index.js'
import type { Mafmt } from '../src/index.js'

describe('multiaddr validation', function () {
  const goodDNS = [
    '/dns/ipfs.io',
    '/dnsaddr/ipfs.io',
    '/dns4/ipfs.io',
    '/dns4/libp2p.io',
    '/dns6/protocol.ai'
  ]

  const badDNS = [
    '/ip4/127.0.0.1'
  ]

  const goodIP = [
    '/ip4/0.0.0.0',
    '/ip6/fc00::'
  ]

  const badIP = [
    '/ip4/0.0.0.0/tcp/555',
    '/udp/789/ip6/fc00::'
  ]

  const goodTCP = [
    '/ip4/0.0.7.6/tcp/1234',
    '/ip6/::/tcp/0',
    '/dns4/protocol.ai/tcp/80',
    '/dns6/protocol.ai/tcp/80',
    '/dnsaddr/protocol.ai/tcp/80'
  ]

  const badTCP = [
    '/tcp/12345',
    '/ip6/fc00::/udp/5523/tcp/9543',
    '/dns4/protocol.ai'
  ]

  const goodUDP = [
    '/ip4/0.0.7.6/udp/1234',
    '/ip6/::/udp/0'
  ]

  const badUDP = [
    '/udp/12345',
    '/ip6/fc00::/tcp/5523/udp/9543'
  ]

  const goodQUIC = [
    '/ip4/1.2.3.4/udp/1234/quic',
    '/ip6/::/udp/1234/quic'
  ]

  const badQUIC = [
    '/ip4/0.0.0.0/tcp/12345/quic',
    '/ip6/1.2.3.4/ip4/0.0.0.0/udp/1234/quic',
    '/quic'
  ]

  const goodUTP = [
    '/ip4/1.2.3.4/udp/3456/utp',
    '/ip6/::/udp/0/utp'
  ]

  const badUTP = [
    '/ip4/0.0.0.0/tcp/12345/utp',
    '/ip6/::/ip4/0.0.0.0/udp/1234/utp'
  ]

  const goodHTTP = [
    '/dnsaddr/ipfs.io/http',
    '/dnsaddr/ipfs.io/tcp/3456/http',
    '/ip4/0.0.0.0/http',
    '/ip4/0.0.0.0/tcp/12345/http',
    '/ip6/::/http',
    '/ip6/::/tcp/12345/http'
  ]

  const goodHTTPS = [
    '/dnsaddr/ipfs.io/https',
    '/dnsaddr/ipfs.io/tcp/3456/https',
    '/ip4/0.0.0.0/https',
    '/ip4/0.0.0.0/tcp/12345/https',
    '/ip6/::/https',
    '/ip6/::/tcp/12345/https'
  ]

  const goodWS = [
    '/dnsaddr/ipfs.io/ws',
    '/ip4/1.2.3.4/tcp/3456/ws',
    '/ip6/::/tcp/0/ws'
  ]

  const goodWSS = [
    '/dnsaddr/ipfs.io/wss',
    '/ip4/1.2.3.4/tcp/3456/wss',
    '/ip6/::/tcp/0/wss',
    '/dnsaddr/ipfs.io/tls/ws',
    '/ip4/1.2.3.4/tcp/3456/tls/ws',
    '/ip6/::/tcp/0/tls/ws'
  ]

  const goodP2PWebRTCStar = [
    '/ip4/1.2.3.4/tcp/3456/ws/p2p-webrtc-star/ipfs/QmcgpsyWgH8Y8ajJz1Cu72KnS5uo2Aa2LpzU7kinSoooo4',
    '/dnsaddr/ipfs.io/ws/p2p-webrtc-star/ipfs/QmcgpsyWgH8Y8ajJz1Cu72KnS5uo2Aa2LpzU7kinSoooo4',
    '/dnsaddr/ipfs.io/wss/p2p-webrtc-star/ipfs/QmcgpsyWgH8Y8ajJz1Cu72KnS5uo2Aa2LpzU7kinSoooo4',
    '/ip6/::/tcp/0/ws/p2p-webrtc-star/ipfs/QmcgpsyWgH8Y8ajJz1Cu72KnS5uo2Aa2LpzU7kinSoooo5',
    '/ip6/::/tcp/0/ws/p2p-webrtc-star',
    '/dns4/wrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star/ipfs/QmTysQQiTGMdfRsDQp516oZ9bR3FiSCDnicUnqny2q1d79',
    '/dns4/wrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star',
    '/dns/wrtc-star.discovery.libp2p.io/wss/p2p-webrtc-star/ipfs/QmTysQQiTGMdfRsDQp516oZ9bR3FiSCDnicUnqny2q1d79',
    '/dns/wrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star/ipfs/QmTysQQiTGMdfRsDQp516oZ9bR3FiSCDnicUnqny2q1d79'
  ]

  const goodP2PWebRTCDirect = [
    '/ip4/1.2.3.4/tcp/3456/http/p2p-webrtc-direct',
    '/ip6/::/tcp/0/http/p2p-webrtc-direct'
  ]

  const goodWebSocketStar = [
    '/ip4/1.2.3.4/tcp/3456/ws/p2p-websocket-star',
    '/ip6/::/tcp/0/ws/p2p-websocket-star',
    '/dnsaddr/localhost/ws/p2p-websocket-star/ipfs/QmcgpsyWgH8Y8ajJz1Cu72KnS5uo2Aa2LpzU7kinSoooo4',
    '/ip4/1.2.3.4/tcp/3456/ws/p2p-websocket-star/ipfs/QmcgpsyWgH8Y8ajJz1Cu72KnS5uo2Aa2LpzU7kinSoooo4',
    '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star/ipfs/Qma3uqwymdqwXtC4uvmqqwwMhTDHD7xp9FzM75tQB5qRM3'
  ]

  const goodStardust = [
    '/ip4/1.2.3.4/tcp/3456/ws/p2p-stardust',
    '/ip6/::/tcp/0/ws/p2p-stardust',
    '/dnsaddr/localhost/ws/p2p-stardust/ipfs/QmcgpsyWgH8Y8ajJz1Cu72KnS5uo2Aa2LpzU7kinSoooo4',
    '/ip4/1.2.3.4/tcp/3456/ws/p2p-stardust/ipfs/QmcgpsyWgH8Y8ajJz1Cu72KnS5uo2Aa2LpzU7kinSoooo4',
    '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-stardust/ipfs/Qma3uqwymdqwXtC4uvmqqwwMhTDHD7xp9FzM75tQB5qRM3'
  ]

  const badWS = [
    '/ip4/0.0.0.0/tcp/12345/udp/2222/ws',
    '/ip6/::/ip4/0.0.0.0/udp/1234/ws',
    '/ip4/127.0.0.1/tcp/24642/ws/p2p-webrtc-star'
  ]

  const badWSS = [
    '/ip4/0.0.0.0/tcp/12345/udp/2222/wss',
    '/ip6/::/ip4/0.0.0.0/udp/1234/wss'
  ]

  const goodCircuit = [
    '/p2p-circuit',
    '/p2p-circuit/ipfs/QmUjNmr8TgJCn1Ao7DvMy4cjoZU15b9bwSCBLE3vwXiwgj',
    '/p2p-circuit/ip4/127.0.0.1/tcp/20008/ws/ipfs/QmUjNmr8TgJCn1Ao7DvMy4cjoZU15b9bwSCBLE3vwXiwgj',
    '/p2p-circuit/ip4/1.2.3.4/tcp/3456/ws/p2p-webrtc-star/ipfs/QmcgpsyWgH8Y8ajJz1Cu72KnS5uo2Aa2LpzU7kinSoooo4',
    '/p2p-circuit/ip4/1.2.3.4/tcp/3456/ipfs/QmcgpsyWgH8Y8ajJz1Cu72KnS5uo2Aa2LpzU7kinSoooo4',
    '/p2p-circuit/ip4/127.0.0.1/tcp/4002/ipfs/QmddWMcQX6orJGHpETYMyPgXrCXCtYANMFVDCvhKoDwLqA',
    '/p2p-circuit/ipfs/QmddWMcQX6orJGHpETYMyPgXrCXCtYANMFVDCvhKoDwLqA',
    '/p2p-circuit/ip4/127.0.0.1/tcp/20008/ws/ipfs/QmUjNmr8TgJCn1Ao7DvMy4cjoZU15b9bwSCBLE3vwXiwgj/' +
    'p2p-circuit/ipfs/QmUjNmr8TgJCn1Ao7DvMy4cjoZU15b9bwSCBLE3vwXiwgj'
  ]

  const badCircuit = [
    '/ip4/0.0.0.0/tcp/12345/udp/2222/wss',
    '/ip4/0.0.7.6/udp/1234',
    '/ip6/::/udp/0/utp',
    '/dnsaddr/ipfs.io/ws',
    '/ip4/1.2.3.4/tcp/3456/http/p2p-webrtc-star'
  ]

  const goodIPFS = [
    '/ip4/127.0.0.1/tcp/20008/ws/ipfs/QmUjNmr8TgJCn1Ao7DvMy4cjoZU15b9bwSCBLE3vwXiwgj',
    '/ip4/1.2.3.4/tcp/3456/ws/p2p-webrtc-star/ipfs/QmcgpsyWgH8Y8ajJz1Cu72KnS5uo2Aa2LpzU7kinSoooo4',
    '/ip4/127.0.0.1/tcp/9090/http/p2p-webrtc-direct/p2p/QmPj9ZZ6notLfV9khV1FtxH1Goe5sVaUyqgoXrTYQWp382',
    '/ip4/1.2.3.4/tcp/3456/ipfs/QmcgpsyWgH8Y8ajJz1Cu72KnS5uo2Aa2LpzU7kinSoooo4',
    '/ipfs/QmcgpsyWgH8Y8ajJz1Cu72KnS5uo2Aa2LpzU7kinSoooo4/p2p-circuit',
    '/ipfs/QmcgpsyWgH8Y8ajJz1Cu72KnS5uo2Aa2LpzU7kinSoooo4/p2p-circuit/ipfs/QmUjNmr8TgJCn1Ao7DvMy4cjoZU15b9bwSCBLE3vwXiwgj',
    '/ip4/127.0.0.1/tcp/20008/ws/p2p/QmUjNmr8TgJCn1Ao7DvMy4cjoZU15b9bwSCBLE3vwXiwgj',
    '/ip4/1.2.3.4/tcp/3456/ws/p2p-webrtc-star/p2p/QmcgpsyWgH8Y8ajJz1Cu72KnS5uo2Aa2LpzU7kinSoooo4',
    '/ip4/1.2.3.4/tcp/3456/p2p/QmcgpsyWgH8Y8ajJz1Cu72KnS5uo2Aa2LpzU7kinSoooo4',
    '/ip4/1.2.3.4/udp/1234/quic/p2p/QmUjNmr8TgJCn1Ao7DvMy4cjoZU15b9bwSCBLE3vwXiwgj',
    '/ipfs/QmcgpsyWgH8Y8ajJz1Cu72KnS5uo2Aa2LpzU7kinSoooo4',
    '/p2p/QmcgpsyWgH8Y8ajJz1Cu72KnS5uo2Aa2LpzU7kinSoooo4',
    '/p2p/QmcgpsyWgH8Y8ajJz1Cu72KnS5uo2Aa2LpzU7kinSoooo4/p2p-circuit',
    '/p2p/QmcgpsyWgH8Y8ajJz1Cu72KnS5uo2Aa2LpzU7kinSoooo4/p2p-circuit/p2p/QmUjNmr8TgJCn1Ao7DvMy4cjoZU15b9bwSCBLE3vwXiwgj',
    '/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN',
    '/dns4/nyc-2.bootstrap.libp2p.io/tcp/443/wss/p2p/QmSoLV4Bbm51jM9C4gDYZQ9Cy3U6aXMJDAbzgu2fzaDs64',
    '/dns6/nyc-2.bootstrap.libp2p.io/tcp/443/wss/p2p/QmSoLV4Bbm51jM9C4gDYZQ9Cy3U6aXMJDAbzgu2fzaDs64'
  ].concat(goodCircuit)

  const goodWebRTCDirect = [
    '/ip4/0.0.0.0/udp/4004/webrtc-direct/certhash/uEiAeP0OEmBbGVTH5Bhnm3WopwRNSQ0et46xNkn2dIagnGw',
    '/ip4/0.0.0.0/udp/4004/webrtc-direct/certhash/uEiAeP0OEmBbGVTH5Bhnm3WopwRNSQ0et46xNkn2dIagnGw/p2p/QmSoLV4Bbm51jM9C4gDYZQ9Cy3U6aXMJDAbzgu2fzaDs64'
  ]

  const badWebRTCDirect = [
    '/ip4/0.0.0.0/udp/4004/webrtc-direct',
    '/ip4/0.0.0.0/tcp/4004/webrtc-direct',
    '/ip4/0.0.0.0/udp/4004/webrtc-direct/uEiAeP0OEmBbGVTH5Bhnm3WopwRNSQ0et46xNkn2dIagnGw/p2p/QmSoLV4Bbm51jM9C4gDYZQ9Cy3U6aXMJDAbzgu2fzaDs64'
  ]

  const goodWebRTC = [
    '/ip4/127.0.0.1/tcp/59119/ws/p2p/12D3KooWAzabxK2xhwGQuTUYjbcFT9SZcNvPS1cvj7bPMe2Rh9qF/p2p-circuit/webrtc/p2p/12D3KooWA6L4J1yRwqLwdXPZBxz3UL4E8pEE6AEhFkqDH5LTQyfq',
    '/ip4/0.0.0.0/udp/4004/webrtc-direct/certhash/uEiAeP0OEmBbGVTH5Bhnm3WopwRNSQ0et46xNkn2dIagnGw/webrtc',
    '/p2p-circuit/p2p/QmcgpsyWgH8Y8ajJz1Cu72KnS5uo2Aa2LpzU7kinSoooo4/webrtc',
    '/webrtc'
  ]

  const badWebRTC = [
    '/ip4/0.0.0.0/udp/webrtc',
    '/ip4/0.0.0.0/tcp/12345/udp/2222/wss/webrtc'
  ]

  const goodWebTransport = [
    '/ip4/10.5.0.2/udp/4001/quic-v1/webtransport/certhash/uEiDWmsTxXe55Mbwnvd1qrPZAcE5Jtc0tE9WtGXD_NpMERg/certhash/uEiCoik2HBeT5oc9Jib3SQJzNjn9AnznMDpQWcOeKSuEc9A/p2p/12D3KooWQF6Q3i1QkziJQ9mkNNcyFD8GPQz6R6oEvT75wgsVXm4v',
    '/ip4/127.0.0.1/udp/4001/quic-v1/webtransport/certhash/uEiDWmsTxXe55Mbwnvd1qrPZAcE5Jtc0tE9WtGXD_NpMERg/certhash/uEiCoik2HBeT5oc9Jib3SQJzNjn9AnznMDpQWcOeKSuEc9A/p2p/12D3KooWQF6Q3i1QkziJQ9mkNNcyFD8GPQz6R6oEvT75wgsVXm4v',
    '/ip4/97.126.16.119/udp/4001/quic-v1/webtransport/certhash/uEiDWmsTxXe55Mbwnvd1qrPZAcE5Jtc0tE9WtGXD_NpMERg/certhash/uEiCoik2HBeT5oc9Jib3SQJzNjn9AnznMDpQWcOeKSuEc9A/p2p/12D3KooWQF6Q3i1QkziJQ9mkNNcyFD8GPQz6R6oEvT75wgsVXm4v',
    '/ip6/::1/udp/4001/quic-v1/webtransport/certhash/uEiDWmsTxXe55Mbwnvd1qrPZAcE5Jtc0tE9WtGXD_NpMERg/certhash/uEiCoik2HBeT5oc9Jib3SQJzNjn9AnznMDpQWcOeKSuEc9A/p2p/12D3KooWQF6Q3i1QkziJQ9mkNNcyFD8GPQz6R6oEvT75wgsVXm4v'
  ]

  const badWebTransport = [
    // quic instead of quic-v1
    '/ip4/10.5.0.2/udp/4001/quic/webtransport/certhash/uEiDWmsTxXe55Mbwnvd1qrPZAcE5Jtc0tE9WtGXD_NpMERg/certhash/uEiCoik2HBeT5oc9Jib3SQJzNjn9AnznMDpQWcOeKSuEc9A/p2p/12D3KooWQF6Q3i1QkziJQ9mkNNcyFD8GPQz6R6oEvT75wgsVXm4v',
    // missing second certhash value
    '/ip4/10.5.0.2/udp/4001/quic-v1/webtransport/certhash/uEiDWmsTxXe55Mbwnvd1qrPZAcE5Jtc0tE9WtGXD_NpMERg/certhash/p2p/12D3KooWQF6Q3i1QkziJQ9mkNNcyFD8GPQz6R6oEvT75wgsVXm4v',
    // missing webtransport/certhash base
    '/ip4/10.5.0.2/udp/4001/quic-v1/webtransport/p2p/12D3KooWQF6Q3i1QkziJQ9mkNNcyFD8GPQz6R6oEvT75wgsVXm4v',
    // missing value for base 'webtransport/certhash'  `${value}/certhash/${value}`
    '/ip4/10.5.0.2/udp/4001/quic-v1/webtransport/certhash/p2p/12D3KooWQF6Q3i1QkziJQ9mkNNcyFD8GPQz6R6oEvT75wgsVXm4v'
  ]

  function assertMatches (p: Mafmt, ...tests: string[][]): void {
    tests.forEach(function (test) {
      test.forEach(function (testcase) {
        try {
          expect(p.matches(testcase), `assertMatches: ${testcase} (string)`).to.be.eql(true)
          const ma = multiaddr(testcase)
          expect(p.matches(ma), `assertMatches: ${testcase} (multiaddr object)`).to.be.eql(true)
          expect(p.matches(ma.bytes), `assertMatches: ${testcase} (multiaddr.bytes)`).to.be.eql(true)
        } catch (err: any) {
          err.stack = `[testcase=${JSON.stringify(testcase)}, shouldMatch=true] ${err.stack}` // eslint-disable-line @typescript-eslint/restrict-template-expressions
          throw err
        }
      })
    })
  }

  function assertMismatches (p: Mafmt, ...tests: string[][]): void {
    tests.forEach(function (test) {
      test.forEach(function (testcase) {
        try {
          expect(p.matches(testcase), `assertMismatches: ${testcase} (string)`).to.be.eql(false)
          let validMultiaddrObj
          try {
            // if testcase string happens to be a valid multiaddr,
            // we expect 'p' test to also return false for Multiaddr object and Uint8Array versions
            validMultiaddrObj = multiaddr(testcase)
          } catch (e) {
            // Ignoring testcase as the string is not a multiaddr
            // (There is a separate 'Uint8Array is invalid' test later below)
          }
          if (validMultiaddrObj != null) {
            expect(p.matches(validMultiaddrObj), `assertMismatches: ${testcase} (multiaddr object)`).to.be.eql(false)
            expect(p.matches(validMultiaddrObj.bytes), `assertMismatches: ${testcase} (multiaddr.bytes)`).to.be.eql(false)
          }
        } catch (err: any) {
          err.stack = `[testcase=${JSON.stringify(testcase)}, shouldMatch=false] ${err.stack}` // eslint-disable-line @typescript-eslint/restrict-template-expressions
          throw err
        }
      })
    })
  }

  it('do not throw if multiaddr str is invalid', function () {
    expect(mafmt.HTTP.matches('/http-google-com')).to.be.eql(false)
  })

  it('do not throw if multiaddr Uint8Array is invalid', function () {
    expect(mafmt.HTTP.matches(uint8ArrayFromString('no spoon'))).to.be.eql(false)
  })

  it('DNS validation', function () {
    assertMatches(mafmt.DNS, goodDNS)
    assertMismatches(mafmt.DNS, badDNS, badIP)
  })

  it('IP validation', function () {
    assertMatches(mafmt.IP, goodIP)
    assertMismatches(mafmt.IP, badIP, goodTCP)
  })

  it('TCP validation', function () {
    assertMatches(mafmt.TCP, goodTCP)
    assertMismatches(mafmt.TCP, badTCP, goodIP)
  })

  it('UDP validation', function () {
    assertMatches(mafmt.UDP, goodUDP)
    assertMismatches(mafmt.UDP, badUDP, goodIP, goodTCP, goodUTP)
  })

  it('QUIC validation', function () {
    assertMatches(mafmt.QUIC, goodQUIC)
    assertMismatches(mafmt.QUIC, badQUIC)
  })

  it('UTP validation', function () {
    assertMatches(mafmt.UTP, goodUTP)
    assertMismatches(mafmt.UTP, badUTP, goodIP, goodTCP, goodUDP)
  })

  it('HTTP validation', function () {
    assertMatches(mafmt.HTTP, goodHTTP)
    assertMismatches(mafmt.HTTP, goodIP, goodUDP)
  })

  it('HTTPS validation', function () {
    assertMatches(mafmt.HTTPS, goodHTTPS)
    assertMismatches(mafmt.HTTPS, goodHTTP, goodIP, goodTCP, goodUDP)
  })

  it('Reliable validation', function () {
    assertMatches(mafmt.Reliable, goodUTP, goodTCP)
    assertMismatches(mafmt.Reliable, goodIP, goodUDP)
  })

  it('WebSockets validation', function () {
    assertMatches(mafmt.WebSockets, goodWS)
    assertMismatches(mafmt.WebSockets, goodIP, goodUDP, badWS)
  })

  it('WebSocketsSecure validation', function () {
    assertMatches(mafmt.WebSocketsSecure, goodWSS)
    assertMismatches(mafmt.WebSocketsSecure, goodIP, badWSS, goodUDP, badWS)
  })

  it('WebSocketStar validation', function () {
    assertMatches(mafmt.WebSocketStar, goodWebSocketStar)
    assertMismatches(mafmt.WebSocketStar, goodIP, goodUDP, badWS)
  })

  it('Stardust validation', function () {
    assertMatches(mafmt.Stardust, goodStardust)
    assertMismatches(mafmt.Stardust, goodIP, goodUDP, badWS)
  })

  it('P2PWebRTCStar validation', function () {
    assertMatches(mafmt.P2PWebRTCStar, goodP2PWebRTCStar)
    assertMismatches(mafmt.P2PWebRTCStar, goodIP, goodUDP, badWSS)
  })

  it('P2PWebRTCDirect validation', function () {
    assertMatches(mafmt.P2PWebRTCDirect, goodP2PWebRTCDirect)
    assertMismatches(mafmt.P2PWebRTCDirect, goodIP, goodUDP, badWS)
  })

  it('Circuit validation', function () {
    assertMatches(mafmt.Circuit, goodCircuit)
    assertMismatches(mafmt.Circuit, badCircuit)
  })

  it('IPFS validation', function () {
    assertMatches(mafmt.IPFS, goodIPFS)
  })

  it('WebRTCDirect validation', function () {
    assertMatches(mafmt.WebRTCDirect, goodWebRTCDirect)
    assertMismatches(mafmt.WebRTCDirect, badWebRTCDirect)
  })

  it('WebRTC validation', function () {
    assertMatches(mafmt.WebRTC, goodWebRTC)
    assertMismatches(mafmt.WebRTC, badWebRTC)
  })

  it('WebTransport validation', function () {
    assertMatches(mafmt.WebTransport, goodWebTransport)
    assertMismatches(mafmt.WebTransport, badWebTransport)
  })
})
