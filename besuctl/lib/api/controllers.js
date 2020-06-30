"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// import chalk from 'chalk';
const fuse_js_1 = tslib_1.__importDefault(require("fuse.js"));
const randomatic_1 = tslib_1.__importDefault(require("randomatic"));
const crypto_1 = require("crypto");
// import * as inquirer from 'inquirer';
// import chalk from 'chalk';
const database_1 = require("./database");
const { salt, secret } = database_1.getPreferences();
class Controllers {
    constructor() {
        this.keys = [];
        this.key = crypto_1.scryptSync(secret, salt, 32);
        const results = database_1.getItems();
        this.keys = results;
        this.fuse = new fuse_js_1.default(results, {
            shouldSort: true,
            threshold: 0.6,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 2,
            keys: [
                'alias',
                'email',
                'login',
            ],
        });
    }
    encrypt(textInput) {
        const iv = crypto_1.randomBytes(16);
        const cipher = crypto_1.createCipheriv('aes-256-cbc', this.key, iv);
        let encrypted = cipher.update(textInput);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
    }
    decrypt(encryptedString) {
        const textParts = encryptedString.split(':');
        const iv = Buffer.from(textParts[0], 'hex');
        const encrypted = Buffer.from(textParts[1], 'hex');
        const decipher = crypto_1.createDecipheriv('aes-256-cbc', this.key, iv);
        let decrypted = decipher.update(encrypted);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }
    add(input) {
        const { alias, login, email, key } = input;
        const found = this.keys.find((o) => o.alias === alias);
        const newKey = {
            id: randomatic_1.default('aA0', 32),
            email,
            key: this.encrypt(key),
            alias: found ? `${alias}-${randomatic_1.default('a0', 3)}` : alias,
            login: login || '',
            used: 0,
            created: Date.now(),
            updated: Date.now(),
        };
        database_1.addItem(newKey);
    }
    // TODO: authenticate and session
    // authenticate(code: string) {
    // }
    getKey(id) {
        const found = this.keys.find((e) => e.id === id);
        if (found) {
            return this.decrypt(found.key);
        }
        // console.warn(`${chalk.green('Item not found.')}`);
        return '';
    }
    list() {
        return this.keys;
    }
    findByIndex(index) {
        return this.keys[index];
    }
    findById(id) {
        return this.keys.find((e) => e.id === id);
    }
    findByAlias(alias) {
        return this.keys
            .filter((e) => e.alias.toLowerCase().includes(alias.toLowerCase()));
    }
    findByEmail(email) {
        return this.keys
            .filter((e) => e.email.toLowerCase().includes(email.toLowerCase()));
    }
    // provide fuzzy search with input
    search(input) {
        return this.fuse.search(input);
    }
    // setup(master: string) {}
    removeById(id) {
        const found = this.findById(id);
        if (found) {
            this.keys.splice(this.keys.findIndex((e) => e.id === id), 1);
            database_1.deleteItem(id);
        }
    }
    removeByAlias(alias) {
        const index = this.keys.findIndex((e) => e.alias === alias);
        if (index > -1) {
            const removed = this.keys.splice(index, 1)[0];
            database_1.deleteItem(removed.id);
        }
    }
}
exports.default = new Controllers();
