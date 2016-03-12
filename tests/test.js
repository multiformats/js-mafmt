var test = require('tape')
var mafmt = require('./../src')

test('basic stuff works', function (t) {
  var good_ip = [
    '/ip4/0.0.0.0',
    '/ip6/fc00::'
  ]

  var bad_ip = [
    '/ip4/0.0.0.0/tcp/555',
    '/udp/789/ip6/fc00::'
  ]

  var good_tcp = [
    '/ip4/0.0.7.6/tcp/1234',
    '/ip6/::/tcp/0'
  ]

  var bad_tcp = [
    '/tcp/12345',
    '/ip6/fc00::/udp/5523/tcp/9543'
  ]

  var good_udp = [
    '/ip4/0.0.7.6/udp/1234',
    '/ip6/::/udp/0'
  ]

  var bad_udp = [
    '/udp/12345',
    '/ip6/fc00::/tcp/5523/udp/9543'
  ]

  var good_utp = [
    '/ip4/1.2.3.4/udp/3456/utp',
    '/ip6/::/udp/0/utp'
  ]

  var bad_utp = [
    '/ip4/0.0.0.0/tcp/12345/utp',
    '/ip6/::/ip4/0.0.0.0/udp/1234/utp'
  ]

  var good_websockets = [
    '/ip4/1.2.3.4/tcp/3456/websockets',
    '/ip6/::/tcp/0/websockets'
  ]

  var bad_websockets = [
    '/ip4/0.0.0.0/tcp/12345/udp/2222/websockets',
    '/ip6/::/ip4/0.0.0.0/udp/1234/websockets'
  ]

  function assertMatches (p) {
    var tests = Array.from(arguments).slice(1)
    tests.forEach(function (test) {
      test.forEach(function (testcase) {
        if (!p.matches(testcase)) {
          t.fail('should have matched: ' + testcase + ' ' + p)
        }
      })
    })
  }

  function assertMismatches (p) {
    var tests = Array.from(arguments).slice(1)
    tests.forEach(function (test) {
      test.forEach(function (testcase) {
        t.equal(p.matches(testcase), false, 'should not have matched: ' + testcase + ' ' + test)
      })
    })
  }

  assertMatches(mafmt.IP, good_ip)
  assertMismatches(mafmt.IP, bad_ip, good_tcp)

  assertMatches(mafmt.TCP, good_tcp)
  assertMismatches(mafmt.TCP, bad_tcp, good_ip)

  assertMatches(mafmt.UDP, good_udp)
  assertMismatches(mafmt.UDP, bad_udp, good_ip, good_tcp, good_utp)

  assertMatches(mafmt.UTP, good_utp)
  assertMismatches(mafmt.UTP, bad_utp, good_ip, good_tcp, good_udp)

  assertMatches(mafmt.Reliable, good_utp, good_tcp)
  assertMismatches(mafmt.Reliable, good_ip, good_udp)

  assertMatches(mafmt.WebSockets, good_websockets)
  assertMismatches(mafmt.WebSockets, good_ip, good_udp, bad_websockets)

  t.end()
})
