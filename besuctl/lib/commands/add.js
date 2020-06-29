"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const clipboardy_1 = tslib_1.__importDefault(require("clipboardy"));
const randomatic_1 = tslib_1.__importDefault(require("randomatic"));
const command_1 = require("@oclif/command");
const inquirer_1 = require("inquirer");
const controllers_1 = tslib_1.__importDefault(require("../api/controllers"));
const database_1 = require("../api/database");
class Add extends command_1.Command {
    async run() {
        const { args: { alias }, flags: { auto }, } = this.parse(Add);
        const { login, email } = database_1.getPreferences();
        const input = {
            alias,
            login,
            email,
            key: randomatic_1.default('aA0!', 16),
        };
        // if user does not enter any arg
        if (auto) {
            clipboardy_1.default.writeSync(input.key);
            controllers_1.default.add(Object.assign({}, input));
        }
        else {
            const answers = await inquirer_1.prompt([
                {
                    name: 'alias',
                    type: 'input',
                    message: 'Enter alias',
                    default: alias,
                },
                {
                    name: 'email',
                    type: 'input',
                    message: 'Enter email',
                    default: email,
                },
                {
                    name: 'login',
                    type: 'input',
                    message: 'Enter login',
                    default: (a) => login || a.email.split('@')[0],
                },
                {
                    name: 'auto',
                    type: 'confirm',
                    message: 'Auto generate key?',
                    default: true,
                },
                {
                    name: 'key',
                    type: 'key',
                    mask: '*',
                    message: 'Enter key',
                    when: (current) => {
                        if (current.auto) {
                            return false;
                        }
                        return true;
                    },
                },
            ]);
            const key = answers.auto ? input.key : answers.key;
            clipboardy_1.default.writeSync(key);
            controllers_1.default.add(Object.assign(Object.assign({}, answers), { key }));
        }
        this.log(`${chalk_1.default.green('Created new item!')}`);
    }
}
exports.default = Add;
Add.description = 'Add new record';
Add.aliases = ['create', 'new', 'generate'];
Add.args = [
    {
        name: 'alias',
        required: true,
        description: 'The alias (name) for key.',
        hidden: false,
    },
];
Add.flags = {
    auto: command_1.flags.boolean({ char: 'a' }),
};
