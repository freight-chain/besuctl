"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const command_1 = tslib_1.__importDefault(require("@oclif/command"));
// import chalk from 'chalk';
// import { prompt } from 'inquirer';
// import Table from 'cli-table';
const controllers_1 = tslib_1.__importDefault(require("../api/controllers"));
class Remove extends command_1.default {
    async run() {
        const { args } = this.parse(Remove);
        if (Object.keys(args).length) {
            // If user omitted flags, we use args
            const { aliases } = args;
            aliases.split(',').forEach((alias) => controllers_1.default.removeByAlias(alias));
            this.log('Deleted successful!');
        }
    }
}
exports.default = Remove;
Remove.description = 'Remove a record';
Remove.aliases = ['remove', 'delete', 'del'];
Remove.args = [
    {
        name: 'aliases',
        required: false,
        description: 'The alias of key item, you can use comma-separated.',
        hidden: false,
    },
];
