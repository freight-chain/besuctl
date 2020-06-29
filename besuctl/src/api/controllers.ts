// import chalk from 'chalk';
import Fuse from 'fuse.js';
import randomize from 'randomatic';
import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  scryptSync,
} from 'crypto';
// import * as inquirer from 'inquirer';
// import chalk from 'chalk';
import {
  addItem,
  deleteItem,
  getItems,
  getPreferences,
} from './database';

const { salt, secret } = getPreferences();

class Controllers {
  private keys: Key[] = [];

  private key = scryptSync(secret, salt, 32);

  private fuse: any; // TODO: make type for this

  private encrypt(textInput: string) {
    const iv = randomBytes(16);
    const cipher = createCipheriv('aes-256-cbc', this.key, iv);
    let encrypted = cipher.update(textInput);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
  }

  private decrypt(encryptedString: string) {
    const textParts = encryptedString.split(':');
    const iv = Buffer.from(textParts[0], 'hex');
    const encrypted = Buffer.from(textParts[1], 'hex');
    const decipher = createDecipheriv('aes-256-cbc', this.key, iv);
    let decrypted = decipher.update(encrypted);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }

  constructor() {
    const results = getItems();
    this.keys = results;
    this.fuse = new Fuse(results, {
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

  add(input: Input) {
    const { alias, login, email, key } = input;
    const found = this.keys.find((o) => o.alias === alias);
    const newKey: Key = {
      id: randomize('aA0', 32),
      email,
      key: this.encrypt(key),
      alias: found ? `${alias}-${randomize('a0', 3)}` : alias,
      login: login || '',
      used: 0,
      created: Date.now(),
      updated: Date.now(),
    };
    addItem(newKey);
  }

  // TODO: authenticate and session
  // authenticate(code: string) {
  // }

  getKey(id: string) {
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

  findByIndex(index: number) {
    return this.keys[index];
  }

  findById(id: string) {
    return this.keys.find((e) => e.id === id);
  }

  findByAlias(alias: string) {
    return this.keys
      .filter((e) => e.alias.toLowerCase().includes(alias.toLowerCase()));
  }

  findByEmail(email: string) {
    return this.keys
      .filter((e) => e.email.toLowerCase().includes(email.toLowerCase()));
  }

  // provide fuzzy search with input
  search(input: string) {
    return this.fuse.search(input);
  }

  // setup(master: string) {}

  removeById(id: string) {
    const found = this.findById(id);
    if (found) {
      this.keys.splice(this.keys.findIndex((e) => e.id === id), 1);
      deleteItem(id);
    }
  }

  removeByAlias(alias: string) {
    const index = this.keys.findIndex((e) => e.alias === alias);
    if (index > -1) {
      const removed = this.keys.splice(index, 1)[0];
      deleteItem(removed.id);
    }
  }
}

export default new Controllers();
