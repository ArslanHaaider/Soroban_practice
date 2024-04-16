import { ContractSpec } from '@stellar/stellar-sdk';
import { Buffer } from "buffer";
import { AssembledTransaction } from './assembled-tx.js';
import type { i128 } from './assembled-tx.js';
import type { ClassOptions } from './method-options.js';
export * from './assembled-tx.js';
export * from './method-options.js';
export declare const networks: {
    readonly testnet: {
        readonly networkPassphrase: "Test SDF Network ; September 2015";
        readonly contractId: "CBEEEEL3UCQ32U3PGDXCE4TZLU2NOXGAOGVOOCBT6CQE3QNOC3GVCNZ4";
    };
};
/**
    
    */
export declare const Errors: {
    1: {
        message: string;
    };
};
/**
    
    */
export interface benificary {
    /**
      
      */
    amounts: i128;
    /**
      
      */
    benificary: string;
    /**
      
      */
    token_address: string;
}
/**
    
    */
export interface admin {
    /**
      
      */
    admins: Array<string>;
}
export declare class Contract {
    readonly options: ClassOptions;
    spec: ContractSpec;
    constructor(options: ClassOptions);
    private readonly parsers;
    private txFromJSON;
    readonly fromJSON: {
        addAdmin: (json: string) => AssembledTransaction<void>;
        isAdmin: (json: string) => AssembledTransaction<boolean>;
        approval: (json: string) => AssembledTransaction<void>;
        addMultipleAsset: (json: string) => AssembledTransaction<void>;
        claimAsset: (json: string) => AssembledTransaction<void>;
        verifySignature: (json: string) => AssembledTransaction<boolean>;
        hello: (json: string) => AssembledTransaction<boolean>;
    };
    /**
* Construct and simulate a add_admin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    addAdmin: ({ admin_adress }: {
        admin_adress: string;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<void>>;
    /**
* Construct and simulate a is_admin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    isAdmin: ({ admin_adress }: {
        admin_adress: string;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<boolean>>;
    /**
* Construct and simulate a approval transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    approval: ({ token_address, from, spender, amount }: {
        token_address: string;
        from: string;
        spender: string;
        amount: i128;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<void>>;
    /**
* Construct and simulate a add_multiple_asset transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    addMultipleAsset: ({ data, from }: {
        data: Array<benificary>;
        from: string;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<void>>;
    /**
* Construct and simulate a claim_asset transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    claimAsset: ({ from, claimer, message, address, signature }: {
        from: string;
        claimer: string;
        message: Buffer;
        address: Buffer;
        signature: Buffer;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<void>>;
    /**
* Construct and simulate a verify_signature transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    verifySignature: ({ message, address, signature }: {
        message: Buffer;
        address: Buffer;
        signature: Buffer;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<boolean>>;
    /**
* Construct and simulate a hello transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    hello: (options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<boolean>>;
}
