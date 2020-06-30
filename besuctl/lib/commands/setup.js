"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const command_1 = require("@oclif/command");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const clipboardy_1 = tslib_1.__importDefault(require("clipboardy"));
const inquirer_1 = require("inquirer");
const qrcode_1 = tslib_1.__importDefault(require("qrcode"));
const randomatic_1 = tslib_1.__importDefault(require("randomatic"));
const database_1 = require("../api/database");
class Add extends command_1.Command {
    async run() {
        const { salt, secret, name: oldName, login: oldLogin, email: oldEmail, } = database_1.getPreferences();
        const firstBlood = !salt && !secret;
        const { name, email, login, generate } = await inquirer_1.prompt([
            {
                name: 'name',
                type: 'input',
                message: 'What\'s your name?',
                default: oldName || '',
            },
            {
                name: 'login',
                type: 'input',
                message: 'Enter your default login:',
                default: oldLogin || '',
            },
            {
                name: 'email',
                type: 'input',
                message: 'Enter your default email:',
                default: (a) => oldEmail || a.login,
            },
            {
                name: 'generate',
                type: 'confirm',
                message: 'Generate salt and secret? This will wipe out all your current keys!',
                default: firstBlood,
            },
        ]);
        const newPrefs = {
            email,
            login,
            name,
            salt: generate ? randomatic_1.default('aA0', 32) : salt,
            secret: generate ? randomatic_1.default('aA0', 64) : secret,
        };
        database_1.setPreferences(newPrefs);
        if (generate) {
            this.log(`${chalk_1.default.green('Use QR reader to setup salt and secret on your phone:')}`);
            const qrImage = await qrcode_1.default.toString(`${salt}:${secret}`, { type: 'terminal' });
            clipboardy_1.default.writeSync(`${salt}:${secret}`);
            this.log(qrImage);
        }
        this.log(`${chalk_1.default.green('Setup completed!')}`);
    }
}
exports.default = Add;
Add.description = 'Set up besuctl';
Add.aliases = ['init', 'config'];
