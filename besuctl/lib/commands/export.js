"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const command_1 = tslib_1.__importStar(require("@oclif/command"));
const usb_1 = tslib_1.__importDefault(require("usb"));
const inquirer_1 = require("inquirer");
// import * as os from 'os';
// import moment from 'moment';
// import randomize from 'randomatic'
// import cli from 'cli-ux'
// import chalk from 'chalk';
// import { prompt } from 'inquirer';
// import Table from 'cli-table';
// import keyAPI from '../api/controllers';
class Export extends command_1.default {
    async run() {
        const devices = usb_1.default.getDeviceList();
        const choices = devices.map((o) => {
            const { deviceDescriptor: { idVendor, idProduct } } = o;
            return `${idVendor}:${idProduct}`;
        });
        const answer = await inquirer_1.prompt([
            {
                name: 'deviceIds',
                type: 'list',
                message: 'Select USB:',
                default: '',
                choices,
            },
        ]);
        const ids = answer.deviceIds.split(':');
        const selected = usb_1.default.findByIds(ids[0], ids[1]);
        selected.open();
        this.log('Done.');
    }
}
exports.default = Export;
Export.description = 'Print out all keys';
Export.aliases = ['backup'];
Export.flags = {
    show: command_1.flags.boolean({ char: 's' }),
};
