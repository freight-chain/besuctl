#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const program = new commander_1.Command();
program
    .version('0.1.0')
    .description('freight-cli')
    .command('contracts', 'Contract Registry management', { executableFile: 'ft-contracts' })
    .command('accounts', 'Accounts management', { executableFile: 'ft-accounts' })
    .parse(process.argv);
