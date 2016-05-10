/* eslint-env mocha */
'use strict'

var expect = require('chai').expect
var multiaddr = require('multiaddr')

var mafmt = require('./../src')

describe('multiaddr', function () {
  var goodIp = [
    '/ip4/0.0.0.0',
    '/ip6/fc00::'
  ]

  var badIp = [
    '/ip4/0.0.0.0/tcp/555',
    '/udp/789/ip6/fc00::'
  ]

  var goodTcp = [
    '/ip4/0.0.7.6/tcp/1234',
    '/ip6/::/tcp/0',
    '/ip4/0.0.7.6/tcp/1234/ipfs/QmNP4PCfqmms4thLnxHvqEUnwN8imGTWigru1NVFyjyRdk'
  ]

  var badTcp = [
    '/tcp/12345',
    '/ip6/fc00::/udp/5523/tcp/9543'
  ]

  var goodUdp = [
    '/ip4/0.0.7.6/udp/1234',
    '/ip6/::/udp/0',
    '/ip4/0.0.7.6/udp/1234/ipfs/QmNP4PCfqmms4thLnxHvqEUnwN8imGTWigru1NVFyjyRdk'
  ]

  var badUdp = [
    '/udp/12345',
    '/ip6/fc00::/tcp/5523/udp/9543'
  ]

  var goodUtp = [
    '/ip4/1.2.3.4/udp/3456/utp',
    '/ip6/::/udp/0/utp',
    '/ip4/1.2.3.4/udp/3456/utp/ipfs/QmNP4PCfqmms4thLnxHvqEUnwN8imGTWigru1NVFyjyRdk'
  ]

  var badUtp = [
    '/ip4/0.0.0.0/tcp/12345/utp',
    '/ip6/::/ip4/0.0.0.0/udp/1234/utp'
  ]

  var goodWebsockets = [
    '/ip4/1.2.3.4/tcp/3456/websockets',
    '/ip6/::/tcp/0/websockets',
    '/ip4/1.2.3.4/tcp/3456/websockets/ipfs/QmcUXZgmUeWSX71bdXvAwn7srWhNdar8fUL7LLuak9NfHE',
    '/ip4/127.0.0.1/tcp/10190/websockets/ipfs/QmNP4PCfqmms4thLnxHvqEUnwN8imGTWigru1NVFyjyRdk'
  ]

  var badWebsockets = [
    '/ip4/0.0.0.0/tcp/12345/udp/2222/websockets',
    '/ip6/::/ip4/0.0.0.0/udp/1234/websockets'
  ]

  function assert (name, p, expected) {
    var tests = Array.from(arguments).slice(3)
    it(name, () => {
      tests.forEach(function (test) {
        test.forEach(function (testcase) {
          expect(
            p.matches(testcase)
          ).to.be.eql(
            expected
          )
          expect(
            p.matches(multiaddr(testcase))
          ).to.be.eql(
            expected
          )
        })
      })
    })
  }

  describe('.matches (good)', () => {
    assert('ip', mafmt.IP, true, goodIp)
    assert('tcp', mafmt.TCP, true, goodTcp)
    assert('udp', mafmt.UDP, true, goodUdp)
    assert('utp', mafmt.UTP, true, goodUtp)
    assert('reliable', mafmt.Reliable, true, goodUtp, goodTcp)
    assert('websockets', mafmt.WebSockets, true, goodWebsockets)
  })

  describe('.matches (bad)', () => {
    assert('ip', mafmt.IP, false, badIp, goodTcp)
    assert('tcp', mafmt.TCP, false, badTcp, goodIp)
    assert('udp', mafmt.UDP, false, badUdp, goodIp, goodTcp, goodUtp)
    assert('utp', mafmt.UTP, false, badUtp, goodIp, goodTcp, goodUdp)
    assert('reliable', mafmt.Reliable, false, goodIp, goodUdp)
    assert('websockets', mafmt.WebSockets, false, goodIp, goodUdp, badWebsockets)
  })
})
