/* eslint-env mocha */
'use strict'

var expect = require('chai').expect
var mafmt = require('./../src')

describe('multiaddr validation', function () {
  it('basic stuff works', function () {
    var goodIP = [
      '/ip4/0.0.0.0',
      '/ip6/fc00::'
    ]

    var badIP = [
      '/ip4/0.0.0.0/tcp/555',
      '/udp/789/ip6/fc00::'
    ]

    var goodTCP = [
      '/ip4/0.0.7.6/tcp/1234',
      '/ip6/::/tcp/0'
    ]

    var badTCP = [
      '/tcp/12345',
      '/ip6/fc00::/udp/5523/tcp/9543'
    ]

    var goodUDP = [
      '/ip4/0.0.7.6/udp/1234',
      '/ip6/::/udp/0'
    ]

    var badUDP = [
      '/udp/12345',
      '/ip6/fc00::/tcp/5523/udp/9543'
    ]

    var goodUTP = [
      '/ip4/1.2.3.4/udp/3456/utp',
      '/ip6/::/udp/0/utp'
    ]

    var badUTP = [
      '/ip4/0.0.0.0/tcp/12345/utp',
      '/ip6/::/ip4/0.0.0.0/udp/1234/utp'
    ]

    var goodWS = [
      '/ip4/1.2.3.4/tcp/3456/ws',
      '/ip6/::/tcp/0/ws'
    ]

    var goodWebRTCStar = [
      '/libp2p-webrtc-star/ip4/1.2.3.4/tcp/3456/ws/ipfs/QmcgpsyWgH8Y8ajJz1Cu72KnS5uo2Aa2LpzU7kinSoooo4',
      '/libp2p-webrtc-star/ip6/::/tcp/0/ws/ipfs/QmcgpsyWgH8Y8ajJz1Cu72KnS5uo2Aa2LpzU7kinSoooo5'
    ]

    var badWS = [
      '/ip4/0.0.0.0/tcp/12345/udp/2222/ws',
      '/ip6/::/ip4/0.0.0.0/udp/1234/ws'
    ]

    function assertMatches (p) {
      var tests = Array.from(arguments).slice(1)
      tests.forEach(function (test) {
        test.forEach(function (testcase) {
          expect(p.matches(testcase)).to.be.eql(true)
        })
      })
    }

    function assertMismatches (p) {
      var tests = Array.from(arguments).slice(1)
      tests.forEach(function (test) {
        test.forEach(function (testcase) {
          expect(p.matches(testcase)).to.be.eql(false)
        })
      })
    }

    assertMatches(mafmt.IP, goodIP)
    assertMismatches(mafmt.IP, badIP, goodTCP)

    assertMatches(mafmt.TCP, goodTCP)
    assertMismatches(mafmt.TCP, badTCP, goodIP)

    assertMatches(mafmt.UDP, goodUDP)
    assertMismatches(mafmt.UDP, badUDP, goodIP, goodTCP, goodUTP)

    assertMatches(mafmt.UTP, goodUTP)
    assertMismatches(mafmt.UTP, badUTP, goodIP, goodTCP, goodUDP)

    assertMatches(mafmt.Reliable, goodUTP, goodTCP)
    assertMismatches(mafmt.Reliable, goodIP, goodUDP)

    assertMatches(mafmt.WebSockets, goodWS)
    assertMismatches(mafmt.WebSockets, goodIP, goodUDP, badWS)

    assertMatches(mafmt.WebRTCStar, goodWebRTCStar)
    assertMismatches(mafmt.WebRTCStar, goodIP, goodUDP, badWS)
  })
})
