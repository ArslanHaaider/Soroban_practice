import { ContractSpec, Address } from '@stellar/stellar-sdk';
import { Buffer } from "buffer";
import { AssembledTransaction } from './assembled-tx.js';
export * from './assembled-tx.js';
export * from './method-options.js';
if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || Buffer;
}
export const networks = {
    testnet: {
        networkPassphrase: "Test SDF Network ; September 2015",
        contractId: "CA6TDUVVHIKYMNIC6ZCX2N264SVWTURGBQE6UYIWY2GNNETA4CFWXBJS",
    }
};
/**
    
    */
export const Errors = {
    1: { message: "" }
};
export class Contract {
    options;
    spec;
    constructor(options) {
        this.options = options;
        this.spec = new ContractSpec([
            "AAAABAAAAAAAAAAAAAAABUVycm9yAAAAAAAAAQAAAAAAAAANTk9fV0lMTF9FWElTVAAAAAAAAAE=",
            "AAAAAQAAAAAAAAAAAAAACmJlbmlmaWNhcnkAAAAAAAMAAAAAAAAAB2Ftb3VudHMAAAAACwAAAAAAAAAKYmVuaWZpY2FyeQAAAAAAEwAAAAAAAAANdG9rZW5fYWRkcmVzcwAAAAAAABM=",
            "AAAAAQAAAAAAAAAAAAAABWFkbWluAAAAAAAAAQAAAAAAAAAGYWRtaW5zAAAAAAPqAAAAEw==",
            "AAAAAAAAAAAAAAAJYWRkX2FkbWluAAAAAAAAAQAAAAAAAAAMYWRtaW5fYWRyZXNzAAAAEwAAAAA=",
            "AAAAAAAAAAAAAAAIaXNfYWRtaW4AAAABAAAAAAAAAAxhZG1pbl9hZHJlc3MAAAATAAAAAQAAAAE=",
            "AAAAAAAAAAAAAAAIYXBwcm92YWwAAAAEAAAAAAAAAA10b2tlbl9hZGRyZXNzAAAAAAAAEwAAAAAAAAAEZnJvbQAAABMAAAAAAAAAB3NwZW5kZXIAAAAAEwAAAAAAAAAGYW1vdW50AAAAAAALAAAAAA==",
            "AAAAAAAAAAAAAAASYWRkX211bHRpcGxlX2Fzc2V0AAAAAAACAAAAAAAAAARkYXRhAAAD6gAAB9AAAAAKYmVuaWZpY2FyeQAAAAAAAAAAAARmcm9tAAAAEwAAAAA=",
            "AAAAAAAAAAAAAAALY2xhaW1fYXNzZXQAAAAABQAAAAAAAAAEZnJvbQAAABMAAAAAAAAAB2NsYWltZXIAAAAAEwAAAAAAAAAHbWVzc2FnZQAAAAAOAAAAAAAAAAdhZGRyZXNzAAAAA+4AAAAgAAAAAAAAAAlzaWduYXR1cmUAAAAAAAPuAAAAQAAAAAA=",
            "AAAAAAAAAAAAAAAFaGVsbG8AAAAAAAAAAAAAAQAAAAE="
        ]);
    }
    parsers = {
        addAdmin: () => { },
        isAdmin: (result) => this.spec.funcResToNative("is_admin", result),
        approval: () => { },
        addMultipleAsset: () => { },
        claimAsset: () => { },
        hello: (result) => this.spec.funcResToNative("hello", result)
    };
    txFromJSON = (json) => {
        const { method, ...tx } = JSON.parse(json);
        return AssembledTransaction.fromJSON({
            ...this.options,
            method,
            parseResultXdr: this.parsers[method],
        }, tx);
    };
    fromJSON = {
        addAdmin: (this.txFromJSON),
        isAdmin: (this.txFromJSON),
        approval: (this.txFromJSON),
        addMultipleAsset: (this.txFromJSON),
        claimAsset: (this.txFromJSON),
        hello: (this.txFromJSON)
    };
    /**
* Construct and simulate a add_admin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    addAdmin = async ({ admin_adress }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'add_admin',
            args: this.spec.funcArgsToScVals("add_admin", { admin_adress: new Address(admin_adress) }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['addAdmin'],
        });
    };
    /**
* Construct and simulate a is_admin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    isAdmin = async ({ admin_adress }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'is_admin',
            args: this.spec.funcArgsToScVals("is_admin", { admin_adress: new Address(admin_adress) }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['isAdmin'],
        });
    };
    /**
* Construct and simulate a approval transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    approval = async ({ token_address, from, spender, amount }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'approval',
            args: this.spec.funcArgsToScVals("approval", { token_address: new Address(token_address), from: new Address(from), spender: new Address(spender), amount }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['approval'],
        });
    };
    /**
* Construct and simulate a add_multiple_asset transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    addMultipleAsset = async ({ data, from }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'add_multiple_asset',
            args: this.spec.funcArgsToScVals("add_multiple_asset", { data, from: new Address(from) }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['addMultipleAsset'],
        });
    };
    /**
* Construct and simulate a claim_asset transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    claimAsset = async ({ from, claimer, message, address, signature }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'claim_asset',
            args: this.spec.funcArgsToScVals("claim_asset", { from: new Address(from), claimer: new Address(claimer), message, address, signature }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['claimAsset'],
        });
    };
    /**
* Construct and simulate a hello transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    hello = async (options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'hello',
            args: this.spec.funcArgsToScVals("hello", {}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['hello'],
        });
    };
}
