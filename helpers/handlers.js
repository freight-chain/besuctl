"use strict";
// tslint:disable: no-console
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const grpc_1 = require("../../grpc");
// might have to chagne to different RPC Provider, using @umaprotocol/web3-provider-engine
const web3_provider1 = require("../../web3-provider-engine/subproviders/rpc.js");
function getCatalogHandler(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const registry = new grpc_1.ContractRegistry(options.endpoint);
        try {
            const catalog = yield registry.getCatalog();
            console.log(catalog);
        }
        catch (error) {
            console.log(`Failed to get catalog: ${error}`);
        }
    });
}
exports.getCatalogHandler = getCatalogHandler;
function getContractHandler(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const registry = new grpc_1.ContractRegistry(options.endpoint);
        try {
            const contract = yield registry.get(options.name, options.tag);
            console.log(contract);
        }
        catch (error) {
            console.log(`Failed to get contract: ${error}`);
        }
    });
}
exports.getContractHandler = getContractHandler;
function getTagsHandler(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const registry = new grpc_1.ContractRegistry(options.endpoint);
        try {
            const tags = yield registry.getTags(options.name);
            console.log(tags);
        }
        catch (error) {
            console.log(`Failed to get tags: ${error}`);
        }
    });
}
exports.getTagsHandler = getTagsHandler;
function registerContractHandler(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const registry = new grpc_1.ContractRegistry(options.endpoint);
        let artifact;
        try {
            artifact = JSON.parse(fs_1.readFileSync(options.filepath).toString());
            checkArtifact(artifact);
            yield registry.register({
                name: options.name,
                tag: options.tag,
                abi: artifact.abi,
                bytecode: artifact.bytecode,
                deployedBytecode: artifact.deployedBytecode
            });
            console.log('Contract successfully registered');
        }
        catch (error) {
            console.log(`Failed to register contract: ${error}`);
        }
    });
}
exports.registerContractHandler = registerContractHandler;
const checkArtifact = (artifact) => {
    if (!artifact.abi || typeof artifact.abi !== 'object') {
        throw new Error('No abi in artifact');
    }
    if (!artifact.deployedBytecode || typeof artifact.deployedBytecode !== 'string') {
        throw new Error('No deployedBytecode in artifact');
    }
    if (!artifact.bytecode || typeof artifact.bytecode !== 'string') {
        throw new Error('No bytecode in artifact');
    }
    return true;
};
function generateAccountHandler(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const accountGenerator = new web3_provider1.AccountGenerator([options.endpoint]);
        try {
            yield accountGenerator.connect();
            const address = yield accountGenerator.generateAccount({
                chain: options.chain
            });
            console.log(address);
        }
        catch (error) {
            console.log(`Failed to generate account: ${error}`);
        }
        finally {
            yield accountGenerator.disconnect();
        }
    });
}
exports.generateAccountHandler = generateAccountHandler;
