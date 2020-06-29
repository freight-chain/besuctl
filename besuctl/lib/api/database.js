"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.updateItem = exports.addItem = exports.getItems = exports.setPreferences = exports.getPreferences = void 0;
const tslib_1 = require("tslib");
const lowdb_1 = tslib_1.__importDefault(require("lowdb"));
const FileSync_1 = tslib_1.__importDefault(require("lowdb/adapters/FileSync"));
const path_1 = tslib_1.__importDefault(require("../helpers/util/path"));
// const devices = usb.getDeviceList();
// console.log('devices ', devices.length);
const pwFile = path_1.default('db.json');
const adapter = new FileSync_1.default(pwFile, {
// run on write
// serialize: (obj: any) => (obj),
// run on read
// deserialize: (str: string) => (str)
});
const db = lowdb_1.default(adapter);
exports.getPreferences = () => db.get('preferences').value();
exports.setPreferences = (newPrefs) => {
    db.get('preferences')
        // @ts-ignore
        .assign(Object.assign(Object.assign({}, exports.getPreferences()), newPrefs))
        .write();
    return exports.getPreferences();
};
exports.getItems = () => db.get('container').value();
exports.addItem = (p) => {
    db.get('container')
        // @ts-ignore
        .push(p)
        .write();
    return exports.getItems();
};
exports.updateItem = (p) => {
    db.get('container')
        // @ts-ignore
        .find({ id: p.id })
        .assign(Object.assign({}, p))
        .write();
    return exports.getItems();
};
exports.deleteItem = (id) => {
    db.get('posts')
        // @ts-ignore
        .remove({ id })
        .write();
    return exports.getItems();
};
exports.default = db;
