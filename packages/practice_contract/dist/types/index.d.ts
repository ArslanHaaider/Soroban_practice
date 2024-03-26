import { ContractSpec } from '@stellar/stellar-sdk';
import { Buffer } from "buffer";
import { AssembledTransaction } from './assembled-tx.js';
import type { ClassOptions } from './method-options.js';
export * from './assembled-tx.js';
export * from './method-options.js';
export declare const networks: {
    readonly testnet: {
        readonly networkPassphrase: "Test SDF Network ; September 2015";
        readonly contractId: "CAU5WBPCOWZO2EMNPRZIVTPX5D6YSGO7I3QTBHFDP2L374OSX6VEK2VO";
    };
};
/**
    
    */
export declare const Errors: {};
export declare class Contract {
    readonly options: ClassOptions;
    spec: ContractSpec;
    constructor(options: ClassOptions);
    private readonly parsers;
    private txFromJSON;
    readonly fromJSON: {
        hellooo: (json: string) => AssembledTransaction<string[]>;
        decrement: (json: string) => AssembledTransaction<number>;
        increment: (json: string) => AssembledTransaction<number>;
        verifySignature: (json: string) => AssembledTransaction<void>;
    };
    /**
* Construct and simulate a hellooo transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    hellooo: ({ to }: {
        to: string;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<string[]>>;
    /**
* Construct and simulate a decrement transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    decrement: (options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<number>>;
    /**
* Construct and simulate a increment transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    increment: (options?: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number;
    }) => Promise<AssembledTransaction<number>>;
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
    }) => Promise<AssembledTransaction<void>>;
}
