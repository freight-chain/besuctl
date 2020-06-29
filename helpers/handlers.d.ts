import { IEndpointOptions, IGenerateAccountsOptions, IGetContractOptions, IGetTagsOptions, IRegisterContractOptions } from './types';
export declare function getCatalogHandler(options: IEndpointOptions): Promise<void>;
export declare function getContractHandler(options: IGetContractOptions): Promise<void>;
export declare function getTagsHandler(options: IGetTagsOptions): Promise<void>;
export declare function registerContractHandler(options: IRegisterContractOptions): Promise<void>;
export declare function generateAccountHandler(options: IGenerateAccountsOptions): Promise<void>;
