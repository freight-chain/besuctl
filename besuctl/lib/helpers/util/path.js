"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs-extra"));
const os = tslib_1.__importStar(require("os"));
const path = tslib_1.__importStar(require("path"));
const randomatic_1 = tslib_1.__importDefault(require("randomatic"));
const template = {
    container: [],
    preferences: {
        salt: randomatic_1.default('aA0', 32),
        secret: randomatic_1.default('aA0', 64),
        email: '',
        login: '',
        name: '',
    },
};
const options = {
    encoding: 'utf-8',
};
exports.default = (file) => {
    const xdgConfigHome = process.env.XDG_CONFIG_HOME;
    let pwDir = '';
    // if user has XDG config foler, use it
    if (xdgConfigHome) {
        pwDir = path.join(xdgConfigHome, 'besuctl-cli');
        // else, use the home directory
    }
    else {
        pwDir = path.join(os.homedir(), '.besuctl-cli');
    }
    const pwFile = path.join(pwDir, file);
    // make sure the folder exist, create it if needed
    if (!fs.pathExistsSync(pwFile)) {
        fs.ensureDirSync(pwDir);
        // create the file, because the it is not exist
        fs.writeFileSync(pwFile, JSON.stringify(template), options);
    }
    return pwFile;
};
