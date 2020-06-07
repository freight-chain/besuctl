besuctl
=======

Hyperledger Besu Command Line Utility

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/besuctl.svg)](https://npmjs.org/package/besuctl)
[![CircleCI](https://circleci.com/gh/freight-trust/besuctl/tree/master.svg?style=shield)](https://circleci.com/gh/freight-trust/besuctl/tree/master)
[![License](https://img.shields.io/npm/l/besuctl.svg)](https://github.com/freight-trust/besuctl/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
== Usage
<!-- usage -->
```sh-session
$ npm install -g besuctl
$ besuctl COMMAND
running command...
$ besuctl (-v|--version|version)
besuctl/0.0.2 darwin-x64 node-v12.18.0
$ besuctl --help [COMMAND]
USAGE
  $ besuctl COMMAND
...
```
<!-- usagestop -->
== Commands
<!-- commands -->
* [`besuctl hello [FILE]`](#besuctl-hello-file)
* [`besuctl help [COMMAND]`](#besuctl-help-command)

=== `besuctl eth chainid`

This returns the `chainid` from the RPC endpoint you are connected to or localhost, as defined in the `.env` file

```
USAGE
  $ besuctl eth chainid

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ besuctl eth chainid
  
  chainid: 211, 0xd3
```


```json
{
    "jsonrpc": "2.0",
    "method": "eth_chainId",
    "params": [],
    "id": 211
}

```
_See code: [src/commands/hello.ts](https://github.com/freight-trust/besuctl/blob/v0.0.2/src/commands/hello.ts)_

=== `besuctl help [COMMAND]`

display help for besuctl

```
USAGE
  $ besuctl help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

<!-- commandsstop -->
