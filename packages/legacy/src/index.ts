import { ContractSpec, Address } from '@stellar/stellar-sdk';
import { Buffer } from "buffer";
import { AssembledTransaction, Ok, Err } from './assembled-tx.js';
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Typepoint,
  Duration,
  Error_,
  Result,
} from './assembled-tx.js';
import type { ClassOptions, XDR_BASE64 } from './method-options.js';

export * from './assembled-tx.js';
export * from './method-options.js';

if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || Buffer;
}


export const networks = {
    testnet: {
        networkPassphrase: "Test SDF Network ; September 2015",
        contractId: "CBEEEEL3UCQ32U3PGDXCE4TZLU2NOXGAOGVOOCBT6CQE3QNOC3GVCNZ4",
    }
} as const

/**
    
    */
export const Errors = {
1: {message:""}
}
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


export class Contract {
    spec: ContractSpec;
    constructor(public readonly options: ClassOptions) {
        this.spec = new ContractSpec([
            "AAAABAAAAAAAAAAAAAAABUVycm9yAAAAAAAAAQAAAAAAAAANTk9fV0lMTF9FWElTVAAAAAAAAAE=",
        "AAAAAQAAAAAAAAAAAAAACmJlbmlmaWNhcnkAAAAAAAMAAAAAAAAAB2Ftb3VudHMAAAAACwAAAAAAAAAKYmVuaWZpY2FyeQAAAAAAEwAAAAAAAAANdG9rZW5fYWRkcmVzcwAAAAAAABM=",
        "AAAAAQAAAAAAAAAAAAAABWFkbWluAAAAAAAAAQAAAAAAAAAGYWRtaW5zAAAAAAPqAAAAEw==",
        "AAAAAAAAAAAAAAAJYWRkX2FkbWluAAAAAAAAAQAAAAAAAAAMYWRtaW5fYWRyZXNzAAAAEwAAAAA=",
        "AAAAAAAAAAAAAAAIaXNfYWRtaW4AAAABAAAAAAAAAAxhZG1pbl9hZHJlc3MAAAATAAAAAQAAAAE=",
        "AAAAAAAAAAAAAAAIYXBwcm92YWwAAAAEAAAAAAAAAA10b2tlbl9hZGRyZXNzAAAAAAAAEwAAAAAAAAAEZnJvbQAAABMAAAAAAAAAB3NwZW5kZXIAAAAAEwAAAAAAAAAGYW1vdW50AAAAAAALAAAAAA==",
        "AAAAAAAAAAAAAAASYWRkX211bHRpcGxlX2Fzc2V0AAAAAAACAAAAAAAAAARkYXRhAAAD6gAAB9AAAAAKYmVuaWZpY2FyeQAAAAAAAAAAAARmcm9tAAAAEwAAAAA=",
        "AAAAAAAAAAAAAAALY2xhaW1fYXNzZXQAAAAABQAAAAAAAAAEZnJvbQAAABMAAAAAAAAAB2NsYWltZXIAAAAAEwAAAAAAAAAHbWVzc2FnZQAAAAAOAAAAAAAAAAdhZGRyZXNzAAAAA+4AAAAgAAAAAAAAAAlzaWduYXR1cmUAAAAAAAPuAAAAQAAAAAA=",
        "AAAAAAAAAAAAAAAQdmVyaWZ5X3NpZ25hdHVyZQAAAAMAAAAAAAAAB21lc3NhZ2UAAAAADgAAAAAAAAAHYWRkcmVzcwAAAAPuAAAAIAAAAAAAAAAJc2lnbmF0dXJlAAAAAAAD7gAAAEAAAAABAAAAAQ==",
        "AAAAAAAAAAAAAAAFaGVsbG8AAAAAAAAAAAAAAQAAAAE="
        ]);
    }
    private readonly parsers = {
        addAdmin: () => {},
        isAdmin: (result: XDR_BASE64): boolean => this.spec.funcResToNative("is_admin", result),
        approval: () => {},
        addMultipleAsset: () => {},
        claimAsset: () => {},
        verifySignature: (result: XDR_BASE64): boolean => this.spec.funcResToNative("verify_signature", result),
        hello: (result: XDR_BASE64): boolean => this.spec.funcResToNative("hello", result)
    };
    private txFromJSON = <T>(json: string): AssembledTransaction<T> => {
        const { method, ...tx } = JSON.parse(json)
        return AssembledTransaction.fromJSON(
            {
                ...this.options,
                method,
                parseResultXdr: this.parsers[method],
            },
            tx,
        );
    }
    public readonly fromJSON = {
        addAdmin: this.txFromJSON<ReturnType<typeof this.parsers['addAdmin']>>,
        isAdmin: this.txFromJSON<ReturnType<typeof this.parsers['isAdmin']>>,
        approval: this.txFromJSON<ReturnType<typeof this.parsers['approval']>>,
        addMultipleAsset: this.txFromJSON<ReturnType<typeof this.parsers['addMultipleAsset']>>,
        claimAsset: this.txFromJSON<ReturnType<typeof this.parsers['claimAsset']>>,
        verifySignature: this.txFromJSON<ReturnType<typeof this.parsers['verifySignature']>>,
        hello: this.txFromJSON<ReturnType<typeof this.parsers['hello']>>
    }
        /**
    * Construct and simulate a add_admin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
    */
    addAdmin = async ({admin_adress}: {admin_adress: string}, options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number,
    } = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'add_admin',
            args: this.spec.funcArgsToScVals("add_admin", {admin_adress: new Address(admin_adress)}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['addAdmin'],
        });
    }


        /**
    * Construct and simulate a is_admin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
    */
    isAdmin = async ({admin_adress}: {admin_adress: string}, options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number,
    } = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'is_admin',
            args: this.spec.funcArgsToScVals("is_admin", {admin_adress: new Address(admin_adress)}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['isAdmin'],
        });
    }


        /**
    * Construct and simulate a approval transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
    */
    approval = async ({token_address, from, spender, amount}: {token_address: string, from: string, spender: string, amount: i128}, options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number,
    } = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'approval',
            args: this.spec.funcArgsToScVals("approval", {token_address: new Address(token_address), from: new Address(from), spender: new Address(spender), amount}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['approval'],
        });
    }


        /**
    * Construct and simulate a add_multiple_asset transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
    */
    addMultipleAsset = async ({data, from}: {data: Array<benificary>, from: string}, options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number,
    } = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'add_multiple_asset',
            args: this.spec.funcArgsToScVals("add_multiple_asset", {data, from: new Address(from)}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['addMultipleAsset'],
        });
    }


        /**
    * Construct and simulate a claim_asset transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
    */
    claimAsset = async ({from, claimer, message, address, signature}: {from: string, claimer: string, message: Buffer, address: Buffer, signature: Buffer}, options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number,
    } = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'claim_asset',
            args: this.spec.funcArgsToScVals("claim_asset", {from: new Address(from), claimer: new Address(claimer), message, address, signature}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['claimAsset'],
        });
    }


        /**
    * Construct and simulate a verify_signature transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
    */
    verifySignature = async ({message, address, signature}: {message: Buffer, address: Buffer, signature: Buffer}, options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number,
    } = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'verify_signature',
            args: this.spec.funcArgsToScVals("verify_signature", {message, address, signature}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['verifySignature'],
        });
    }


        /**
    * Construct and simulate a hello transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
    */
    hello = async (options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number,
    } = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'hello',
            args: this.spec.funcArgsToScVals("hello", {}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['hello'],
        });
    }

}