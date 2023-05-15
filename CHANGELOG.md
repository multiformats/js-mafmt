## [12.1.1](https://github.com/multiformats/js-mafmt/compare/v12.1.0...v12.1.1) (2023-05-15)


### Bug Fixes

* match complete webRTC address ([#153](https://github.com/multiformats/js-mafmt/issues/153)) ([9335539](https://github.com/multiformats/js-mafmt/commit/9335539d675f568f3f043b150c07f21b815430c7))

## [12.1.0](https://github.com/multiformats/js-mafmt/compare/v12.0.0...v12.1.0) (2023-04-03)


### Features

* support webtransport multiaddrs ([#148](https://github.com/multiformats/js-mafmt/issues/148)) ([20076b1](https://github.com/multiformats/js-mafmt/commit/20076b1e4e0e81249aaab72d63bbc7422c3a9b9e))

## [12.0.0](https://github.com/multiformats/js-mafmt/compare/v11.1.2...v12.0.0) (2023-03-20)


### ⚠ BREAKING CHANGES

* the existing WebRTCDirect multicodec name has been deprecated and renamed P2PWebRTCDirect. The new WebRTCDirect codec has been added but is not the same, please check your code before upgrading!  Integer codes are unchanged.

### Bug Fixes

* Rename WebRTCDirect to P2PWebRTCDirect and deprecate ([#146](https://github.com/multiformats/js-mafmt/issues/146)) ([92f92d7](https://github.com/multiformats/js-mafmt/commit/92f92d7841c26c149bce2b6b3c0026507fd318ed))

## [11.1.2](https://github.com/multiformats/js-mafmt/compare/v11.1.1...v11.1.2) (2023-03-17)


### Dependencies

* bump @multiformats/multiaddr from 11.6.1 to 12.0.0 ([#145](https://github.com/multiformats/js-mafmt/issues/145)) ([cb5c927](https://github.com/multiformats/js-mafmt/commit/cb5c92712bcd1f75139e68d91286bd4e820e6ec1))
* **dev:** bump uint8arrays from 3.1.1 to 4.0.3 ([#131](https://github.com/multiformats/js-mafmt/issues/131)) ([60146ce](https://github.com/multiformats/js-mafmt/commit/60146ce3af87aaa159a35a1d7632c887e9d982eb))

## [11.1.1](https://github.com/multiformats/js-mafmt/compare/v11.1.0...v11.1.1) (2023-03-17)


### Dependencies

* **dev:** bump aegir from 37.12.1 to 38.1.7 ([#142](https://github.com/multiformats/js-mafmt/issues/142)) ([83f55a9](https://github.com/multiformats/js-mafmt/commit/83f55a9cc15615dc06fc4be754fbcbf6014b8d9e))

## [11.1.0](https://github.com/multiformats/js-mafmt/compare/v11.0.4...v11.1.0) (2023-02-28)


### Features

* add webrtc addresses ([#130](https://github.com/multiformats/js-mafmt/issues/130)) ([d0ce7d7](https://github.com/multiformats/js-mafmt/commit/d0ce7d70283d6deaa074e2623eb751f4b12f15f5))

## [11.0.4](https://github.com/multiformats/js-mafmt/compare/v11.0.3...v11.0.4) (2023-02-27)


### Bug Fixes

* add /tls/ws as alias for /wss ([#141](https://github.com/multiformats/js-mafmt/issues/141)) ([05e0323](https://github.com/multiformats/js-mafmt/commit/05e03230a1518cb791271296160107ea9ba863d5))

## [11.0.3](https://github.com/multiformats/js-mafmt/compare/v11.0.2...v11.0.3) (2022-09-21)


### Trivial Changes

* update project config ([#121](https://github.com/multiformats/js-mafmt/issues/121)) ([ceef343](https://github.com/multiformats/js-mafmt/commit/ceef343568d30080cdedf35edaa6365b1d031cd9))


### Dependencies

* update @multiformats/multiaddr to 11.0.0 ([#123](https://github.com/multiformats/js-mafmt/issues/123)) ([dc5a87f](https://github.com/multiformats/js-mafmt/commit/dc5a87f54c0e2a8e5857f9e0a5715b289cfe45d8))

### [11.0.2](https://github.com/multiformats/js-mafmt/compare/v11.0.1...v11.0.2) (2022-01-08)


### Trivial Changes

* add semantic release config ([#97](https://github.com/multiformats/js-mafmt/issues/97)) ([af1a100](https://github.com/multiformats/js-mafmt/commit/af1a10075462c11004bebd2b133aee4ea96d0ba4))

# [10.0.0](https://github.com/multiformats/js-mafmt/compare/v9.0.0...v10.0.0) (2021-07-07)


### chore

* upgrade multiaddr ([#81](https://github.com/multiformats/js-mafmt/issues/81)) ([2785b23](https://github.com/multiformats/js-mafmt/commit/2785b23d42fee537907ce3811ddce4ae107fc781))


### BREAKING CHANGES

* uses new major of multiaddr module



# [9.0.0](https://github.com/multiformats/js-mafmt/compare/v8.0.4...v9.0.0) (2021-04-11)



## [8.0.4](https://github.com/multiformats/js-mafmt/compare/v8.0.3...v8.0.4) (2021-01-13)


### Features

* add QUIC support ([#70](https://github.com/multiformats/js-mafmt/issues/70)) ([ac7d10c](https://github.com/multiformats/js-mafmt/commit/ac7d10c646f343edd3154bae504bc9a2dcd0d506))



## [8.0.3](https://github.com/multiformats/js-mafmt/compare/v8.0.2...v8.0.3) (2021-01-11)


### Bug Fixes

* add webrtc direct with p2p as valid P2P multiaddr ([#71](https://github.com/multiformats/js-mafmt/issues/71)) ([c8430c1](https://github.com/multiformats/js-mafmt/commit/c8430c1556edf687d22f2c00eb3b6ff96b580aa5))



## [8.0.2](https://github.com/multiformats/js-mafmt/compare/v8.0.1...v8.0.2) (2020-12-28)



<a name="8.0.1"></a>
## [8.0.1](https://github.com/multiformats/js-mafmt/compare/v7.1.0...v8.0.1) (2020-10-27)


### Bug Fixes

* replace node buffers with uint8arrays ([#59](https://github.com/multiformats/js-mafmt/issues/59)) ([022ab87](https://github.com/multiformats/js-mafmt/commit/022ab87))


### Features

* add dnsnaddr p2p ([95d5178](https://github.com/multiformats/js-mafmt/commit/95d5178))


### BREAKING CHANGES

* - Now uses a version of `multiaddr` than has a `.bytes` property instead of `.buffer`



<a name="8.0.0"></a>
# [8.0.0](https://github.com/multiformats/js-mafmt/compare/v7.1.0...v8.0.0) (2020-08-10)


### Bug Fixes

* replace node buffers with uint8arrays ([#59](https://github.com/multiformats/js-mafmt/issues/59)) ([022ab87](https://github.com/multiformats/js-mafmt/commit/022ab87))


### BREAKING CHANGES

* - Now uses a version of `multiaddr` than has a `.bytes` property instead of `.buffer`



<a name="7.1.0"></a>
# [7.1.0](https://github.com/multiformats/js-mafmt/compare/v7.0.1...v7.1.0) (2020-02-06)


### Features

* add typescript types + type tests ([#48](https://github.com/multiformats/js-mafmt/issues/48)) ([74830fa](https://github.com/multiformats/js-mafmt/commit/74830fa))



<a name="7.0.1"></a>
## [7.0.1](https://github.com/multiformats/js-mafmt/compare/v7.0.0...v7.0.1) (2020-01-23)


### Bug Fixes

* webrtc-star should not require the p2p codec ([#47](https://github.com/multiformats/js-mafmt/issues/47)) ([7112ab7](https://github.com/multiformats/js-mafmt/commit/7112ab7))



<a name="7.0.0"></a>
# [7.0.0](https://github.com/multiformats/js-mafmt/compare/v6.0.10...v7.0.0) (2019-09-11)



<a name="6.0.10"></a>
## [6.0.10](https://github.com/multiformats/js-mafmt/compare/v6.0.9...v6.0.10) (2019-09-11)



<a name="6.0.9"></a>
## [6.0.9](https://github.com/multiformats/js-mafmt/compare/v6.0.8...v6.0.9) (2019-09-10)



<a name="6.0.8"></a>
## [6.0.8](https://github.com/multiformats/js-mafmt/compare/v6.0.7...v6.0.8) (2019-08-08)


### Features

* p2p and dns support ([#42](https://github.com/multiformats/js-mafmt/issues/42)) ([09160b5](https://github.com/multiformats/js-mafmt/commit/09160b5))



<a name="6.0.7"></a>
## [6.0.7](https://github.com/multiformats/js-mafmt/compare/v6.0.6...v6.0.7) (2019-02-26)


### Features

* accept Buffer input ([#39](https://github.com/multiformats/js-mafmt/issues/39)) ([c2adc27](https://github.com/multiformats/js-mafmt/commit/c2adc27)), closes [/github.com/multiformats/js-mafmt/blob/v6.0.6/src/index.js#L148](https://github.com//github.com/multiformats/js-mafmt/blob/v6.0.6/src/index.js/issues/L148)



<a name="6.0.6"></a>
## [6.0.6](https://github.com/multiformats/js-mafmt/compare/v6.0.5...v6.0.6) (2019-02-07)


### Features

* add /p2p-stardust ([#35](https://github.com/multiformats/js-mafmt/issues/35)) ([9b0c199](https://github.com/multiformats/js-mafmt/commit/9b0c199)), closes [libp2p/js-libp2p-websocket-star#70](https://github.com/libp2p/js-libp2p-websocket-star/issues/70)



<a name="6.0.5"></a>
## [6.0.5](https://github.com/multiformats/js-mafmt/compare/v6.0.4...v6.0.5) (2019-01-25)


### Bug Fixes

* do not throw if multiaddr str is invalid, fixes [#25](https://github.com/multiformats/js-mafmt/issues/25) ([#36](https://github.com/multiformats/js-mafmt/issues/36)) ([5187d59](https://github.com/multiformats/js-mafmt/commit/5187d59))



<a name="6.0.4"></a>
## [6.0.4](https://github.com/multiformats/js-mafmt/compare/v6.0.3...v6.0.4) (2019-01-08)


### Bug Fixes

* reduce bundle size ([#34](https://github.com/multiformats/js-mafmt/issues/34)) ([8a2eb6b](https://github.com/multiformats/js-mafmt/commit/8a2eb6b))



<a name="6.0.3"></a>
## [6.0.3](https://github.com/multiformats/js-mafmt/compare/v6.0.2...v6.0.3) (2018-12-05)



<a name="6.0.2"></a>
## [6.0.2](https://github.com/whyrusleeping/js-mafmt/compare/v6.0.1...v6.0.2) (2018-09-12)


### Features

* add tcp over dns ([#31](https://github.com/whyrusleeping/js-mafmt/issues/31)) ([acc9295](https://github.com/whyrusleeping/js-mafmt/commit/acc9295))



<a name="6.0.1"></a>
## [6.0.1](https://github.com/whyrusleeping/js-mafmt/compare/v6.0.0...v6.0.1) (2018-08-28)


### Features

* adds HTTPS validation and HTTP(s) tests ([87c4202](https://github.com/whyrusleeping/js-mafmt/commit/87c4202))



<a name="6.0.0"></a>
# [6.0.0](https://github.com/whyrusleeping/js-mafmt/compare/v4.0.0...v6.0.0) (2018-04-05)



<a name="5.0.0"></a>
# [5.0.0](https://github.com/whyrusleeping/js-mafmt/compare/v4.0.0...v5.0.0) (2018-04-05)



<a name="4.0.0"></a>
# [4.0.0](https://github.com/whyrusleeping/js-mafmt/compare/v3.1.0...v4.0.0) (2018-02-12)



<a name="3.1.0"></a>
# [3.1.0](https://github.com/whyrusleeping/js-mafmt/compare/v3.0.2...v3.1.0) (2018-02-12)


### Features

* /dns => /dnsaddr ([#21](https://github.com/whyrusleeping/js-mafmt/issues/21)) ([ecef5f4](https://github.com/whyrusleeping/js-mafmt/commit/ecef5f4))



<a name="3.0.2"></a>
## [3.0.2](https://github.com/whyrusleeping/js-mafmt/compare/v3.0.1...v3.0.2) (2017-10-24)



<a name="3.0.1"></a>
## [3.0.1](https://github.com/whyrusleeping/js-mafmt/compare/v3.0.0...v3.0.1) (2017-09-06)


### Features

* Update to multiaddr v3.0.1 - refactor: websocket{s => }-star ([#19](https://github.com/whyrusleeping/js-mafmt/issues/19)) ([2f336e3](https://github.com/whyrusleeping/js-mafmt/commit/2f336e3))



<a name="3.0.0"></a>
# [3.0.0](https://github.com/whyrusleeping/js-mafmt/compare/v2.1.8...v3.0.0) (2017-09-03)


### Features

* fix p2p addrs situation  ([5fbb424](https://github.com/whyrusleeping/js-mafmt/commit/5fbb424))



<a name="2.1.8"></a>
## [2.1.8](https://github.com/whyrusleeping/js-mafmt/compare/v2.1.7...v2.1.8) (2017-03-27)


### Features

* add support for recursive addresses ([2e28d27](https://github.com/whyrusleeping/js-mafmt/commit/2e28d27))
* adding support for ports in resolvable addresses ([a1f9ccd](https://github.com/whyrusleeping/js-mafmt/commit/a1f9ccd))



<a name="2.1.7"></a>
## [2.1.7](https://github.com/whyrusleeping/js-mafmt/compare/v2.1.6...v2.1.7) (2017-03-22)


### Bug Fixes

* p2p-circuit validation ([14db530](https://github.com/whyrusleeping/js-mafmt/commit/14db530))


### Features

* adding circuit addresses ([c05c1af](https://github.com/whyrusleeping/js-mafmt/commit/c05c1af))
* adding support for ports in resolvable addresses ([8c188dd](https://github.com/whyrusleeping/js-mafmt/commit/8c188dd))
* allow p2p-circuit to come as an additional transport ([2f604c3](https://github.com/whyrusleeping/js-mafmt/commit/2f604c3))



<a name="2.1.6"></a>
## [2.1.6](https://github.com/whyrusleeping/js-mafmt/compare/v2.1.5...v2.1.6) (2017-01-22)


### Features

* add support for dns validation, make IPFS validation much nicer, es6ify ([ade442f](https://github.com/whyrusleeping/js-mafmt/commit/ade442f))
* rules for dns4 and dns6 ([1d4aa10](https://github.com/whyrusleeping/js-mafmt/commit/1d4aa10))
* WebSocketsSecure ([3b99a73](https://github.com/whyrusleeping/js-mafmt/commit/3b99a73))



<a name="2.1.5"></a>
## [2.1.5](https://github.com/whyrusleeping/js-mafmt/compare/v2.1.4...v2.1.5) (2017-01-16)


### Bug Fixes

* point to the right entry point, change due to aegir 9 ([bd81b68](https://github.com/whyrusleeping/js-mafmt/commit/bd81b68))



<a name="2.1.4"></a>
## [2.1.4](https://github.com/whyrusleeping/js-mafmt/compare/v2.1.3...v2.1.4) (2017-01-16)


### Features

* add WebRTC Direct support for filtering ([db00d97](https://github.com/whyrusleeping/js-mafmt/commit/db00d97))



<a name="2.1.3"></a>
## [2.1.3](https://github.com/whyrusleeping/js-mafmt/compare/v2.1.2...v2.1.3) (2017-01-16)



<a name="2.1.2"></a>
## [2.1.2](https://github.com/whyrusleeping/js-mafmt/compare/v2.1.1...v2.1.2) (2016-08-22)


### Features

* **deps:** update aegir ([8fd2972](https://github.com/whyrusleeping/js-mafmt/commit/8fd2972))



<a name="2.1.1"></a>
## [2.1.1](https://github.com/whyrusleeping/js-mafmt/compare/v2.1.0...v2.1.1) (2016-05-28)



<a name="2.1.0"></a>
# [2.1.0](https://github.com/whyrusleeping/js-mafmt/compare/v2.0.2...v2.1.0) (2016-05-22)



<a name="2.0.2"></a>
## [2.0.2](https://github.com/whyrusleeping/js-mafmt/compare/v2.0.1...v2.0.2) (2016-05-21)



<a name="2.0.1"></a>
## [2.0.1](https://github.com/whyrusleeping/js-mafmt/compare/v2.0.0...v2.0.1) (2016-05-21)



<a name="2.0.0"></a>
# 2.0.0 (2016-05-17)
