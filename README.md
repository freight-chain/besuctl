# besuctl

hyperledger besu node manager

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/besuctl.svg)](https://npmjs.org/package/besuctl)
[![Downloads/week](https://img.shields.io/npm/dw/besuctl.svg)](https://npmjs.org/package/besuctl)
[![License](https://img.shields.io/npm/l/besuctl.svg)](https://github.com/freight-trust/besuctl/blob/master/package.json)

<!-- toc -->

- [Usage](#usage)
- [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g besuctl
$ besuctl COMMAND
running command...
$ besuctl (-v|--version|version)
besuctl/0.0.5 darwin-x64 node-v10.21.0
$ besuctl --help [COMMAND]
USAGE
  $ besuctl COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`besuctl hello [FILE]`](#besuctl-hello-file)
- [`besuctl help [COMMAND]`](#besuctl-help-command)

## `besuctl hello [FILE]`

describe the command here

```
USAGE
  $ besuctl hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ besuctl hello
  hello world from ./src/hello.ts!
```

_See code:
[src/commands/hello.ts](https://github.com/freight-trust/besuctl/blob/v0.0.5/src/commands/hello.ts)_

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

_See code:
[@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.1.0/src/commands/help.ts)_

<!-- commandsstop -->