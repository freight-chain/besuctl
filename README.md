besuctl
=======

Hyperledger Besu Command Line Utility 

[![Version](https://img.shields.io/npm/v/besuctl.svg)](https://npmjs.org/package/besuctl)
[![License](https://img.shields.io/npm/l/besuctl.svg)](https://github.com/freight-trust/besuctl/blob/master/package.json)
[freight-chain](https://github.com/freight-chain)
[freight-trust](https://freighttrust.com)

# Overview

This command line utility is intended to enable users to administer, access, and deploy nodes or sidechains to a hyperledger besu network, while using a centeralized LDAP/OAuth2 provider. This example uses `auth0`, but can be generalized for other 3rd Party Providers. Connecting via `LDAP` is supported, see [roadmap](#roadmap)

- Considerations 
* [Web3 typescript](https://github.com/xf00f/web3x)
* [Roadmap for features](https://documenter.getpostman.com/view/9323065/SztJziuL?version=latest)
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

## besuctl overview
* [`besuctl help [COMMAND]`](#besuctl-help-command)

## besuctl example command
* [`besuctl eth chainid`](#besuctl-eth-chainid)

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


## `besuctl help [COMMAND]`

display help for besuctl

```
USAGE
  $ besuctl help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for
  LIST     list all the available commands
OPTIONS
  --all  see all commands in CLI
```

<!-- commandsstop -->
