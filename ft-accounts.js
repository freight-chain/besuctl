#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const helpers_1 = require("./helpers");
const program = new commander_1.Command();
program
    .command('generate')
    .description('Generate a new Besu account that can be linked for native asset, or for running a node')
    .requiredOption('-e, --endpoint <host:port>', 'JSON RPC host:port')
    .option('-c, --chain <str>', 'Defaults to Freight Trust, you can also specificy "1" for ethereum mainnet')
    .action(helpers_1.generateAccountHandler);
program.parse(process.argv);
