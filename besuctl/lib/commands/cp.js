"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const command_1 = tslib_1.__importDefault(require("@oclif/command"));
const cli_table_1 = tslib_1.__importDefault(require("cli-table"));
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const clipboardy_1 = tslib_1.__importDefault(require("clipboardy"));
const moment_1 = tslib_1.__importDefault(require("moment"));
const inquirer_1 = require("inquirer");
const controllers_1 = tslib_1.__importDefault(require("../api/controllers"));
class Copy extends command_1.default {
    async run() {
        const { args: { alias } } = this.parse(Copy);
        if (alias) {
            const results = controllers_1.default.search(alias);
            if (results.length === 1) {
                const key = controllers_1.default.getKey(results[0].id);
                clipboardy_1.default.writeSync(key);
                this.log(`Copied ${chalk_1.default.green(results[0].alias)}'s key into clipboard!`);
            }
            else if (results.length >= 2) {
                const table = new cli_table_1.default({
                    head: [
                        chalk_1.default.blueBright.bold('#'),
                        chalk_1.default.blueBright.bold('Alias'),
                        chalk_1.default.blueBright.bold('Login'),
                        chalk_1.default.blueBright.bold('Email'),
                        chalk_1.default.blueBright.bold('Created'),
                    ],
                });
                for (let i = 0; i < results.length; i++) {
                    const item = results[i];
                    table.push([i, item.alias, item.login, item.email, moment_1.default(item.created).fromNow()]);
                }
                this.log(table.toString());
                const answers = await inquirer_1.prompt([
                    {
                        name: 'position',
                        type: 'input',
                        message: 'Select item to copy',
                        default: 0,
                    },
                ]);
                if (answers.position !== undefined) {
                    const selected = results[answers.position];
                    const key = controllers_1.default.getKey(selected.id);
                    clipboardy_1.default.writeSync(key);
                    this.log(`Copied ${chalk_1.default.green(selected.alias)}'s key into clipboard!`);
                }
            }
            else {
                this.log(`Can't find key with alias: ${chalk_1.default.green(alias)}`);
            }
        }
    }
}
exports.default = Copy;
Copy.description = 'Copy a record';
Copy.aliases = ['copy'];
Copy.args = [
    {
        name: 'alias',
        required: false,
        description: 'If flags are omitted, first arg will become alias',
        hidden: false,
    },
];
