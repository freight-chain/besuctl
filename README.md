besuctl
=======

Hyperledger Besu Command Line Utility

[![Version](https://img.shields.io/npm/v/besuctl.svg)](https://npmjs.org/package/besuctl)
[![License](https://img.shields.io/npm/l/besuctl.svg)](https://github.com/freight-trust/besuctl/blob/master/package.json)


* [Usage](##usage)
* [Commands](##commands)

## Usage

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

# Commands

* [`besuctl hello [FILE]`](#besuctl-hello-file)
* [`besuctl help [COMMAND]`](#besuctl-help-command)

### `besuctl eth chainid`

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

## `besuctl help [COMMAND]`

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
