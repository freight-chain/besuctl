#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const helpers_1 = require("./helpers");
const program = new commander_1.Command();
program
    .command('register')
    .description('Registers a new wallet in a staking pool')
    .requiredOption('-n, --name <str>', 'Name of the staking pool')
    .requiredOption('-f, --filepath <filepath>', 'Location of the Staking Pool Artificat')
    .requiredOption('-e, --endpoint <host:port>', 'Auth0 Gateway')
    .option('-t, --tag <str>', 'Tag to be attached to the wallet')
    .action(helpers_1.registerContractHandler);
program
    .command('catalog')
    .description('Returns all the registered pool member names')
    .requiredOption('-e, --endpoint <host:port>', 'Staking Pool Contract Registry endpoint in the form host:port')
    .action(helpers_1.getCatalogHandler);
program
    .command('contract')
    .description('Returns the registered contract by name and tag')
    .requiredOption('-n, --name <str>', 'Name of the Wallet')
    .requiredOption('-e, --endpoint <host:port>', 'Staking Pool Contract Registry endpoint in the form host:port')
    .option('-t, --tag <str>', '(optional) Tag of the wallet')
    .action(helpers_1.getContractHandler);
program
    .command('tags')
    .description('Returns all the registered tags of a given staking pool contract')
    .requiredOption('-n, --name <str>', 'Name of the Staking Pool Operator Contract')
    .requiredOption('-e, --endpoint <host:port>', 'Contract registry endpoint in the form host:port')
    .action(helpers_1.getTagsHandler);
program.parse(process.argv);
