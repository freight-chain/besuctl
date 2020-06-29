"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const command_1 = tslib_1.__importStar(require("@oclif/command"));
const moment_1 = tslib_1.__importDefault(require("moment"));
// import randomize from 'randomatic'
// import cli from 'cli-ux'
const chalk_1 = tslib_1.__importDefault(require("chalk"));
// import { prompt } from 'inquirer';
const cli_table_1 = tslib_1.__importDefault(require("cli-table"));
const controllers_1 = tslib_1.__importDefault(require("../api/controllers"));
class List extends command_1.default {
    async run() {
        // cli.action.start('starting a process')
        // const { flags } = this.parse(List);
        // const { show } = flags;
        // TODO: Make the row with key older than 6 months red
        const table = new cli_table_1.default({
            head: [
                chalk_1.default.blueBright.bold('#'),
                chalk_1.default.blueBright.bold('Alias'),
                chalk_1.default.blueBright.bold('Login'),
                chalk_1.default.blueBright.bold('Email'),
                chalk_1.default.blueBright.bold('Created'),
            ],
        });
        const results = controllers_1.default.list();
        for (let i = 0; i < results.length; i += 1) {
            const item = results[i];
            table.push([i, item.alias, item.login, item.email, moment_1.default(item.created).fromNow()]);
        }
        // TODO: Make pagination or load more feature, with limit rows
        this.log(table.toString());
    }
}
exports.default = List;
List.description = 'Print out all keys';
List.aliases = ['list', 'la'];
List.flags = {
    show: command_1.flags.boolean({ char: 's' }),
};
