"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const command_1 = tslib_1.__importDefault(require("@oclif/command"));
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const cli_table_1 = tslib_1.__importDefault(require("cli-table"));
const controllers_1 = tslib_1.__importDefault(require("../api/controllers"));
class Find extends command_1.default {
    async run() {
        const { args: { input } } = this.parse(Find);
        const table = new cli_table_1.default({
            head: [
                chalk_1.default.blueBright.bold('#'),
                chalk_1.default.blueBright.bold('Alias'),
                chalk_1.default.blueBright.bold('Login'),
                chalk_1.default.blueBright.bold('Email'),
                chalk_1.default.blueBright.bold('Key'),
            ],
        });
        // TODO: Make sure flags have affect here
        if (input) {
            const results = controllers_1.default.search(input);
            results.forEach((o, i) => {
                table.push([i, o.alias, o.login, o.email, `**********${o.key.slice(-4)}`]);
            });
            this.log(table.toString());
        }
    }
}
exports.default = Find;
Find.description = 'Get one or more specific keys';
Find.aliases = ['get', 'select'];
Find.args = [
    { name: 'input' },
];
