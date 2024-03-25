import { ContractSpec } from '@stellar/stellar-sdk';
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
        contractId: "CCAITQR53DTFJT3B3CTS3A7YPK5Z2YUFW2RMZCNODGMWCEMUASKIQL7P",
    }
};
/**
    
    */
export const Errors = {};
export class Contract {
    options;
    spec;
    constructor(options) {
        this.options = options;
        this.spec = new ContractSpec([
            "AAAAAAAAAAAAAAAHaGVsbG9vbwAAAAABAAAAAAAAAAJ0bwAAAAAAEQAAAAEAAAPqAAAAEQ==",
            "AAAAAAAAAAAAAAAJZGVjcmVtZW50AAAAAAAAAAAAAAEAAAAE",
            "AAAAAAAAAAAAAAAJaW5jcmVtZW50AAAAAAAAAAAAAAEAAAAE"
        ]);
    }
    parsers = {
        hellooo: (result) => this.spec.funcResToNative("hellooo", result),
        decrement: (result) => this.spec.funcResToNative("decrement", result),
        increment: (result) => this.spec.funcResToNative("increment", result)
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
        hellooo: (this.txFromJSON),
        decrement: (this.txFromJSON),
        increment: (this.txFromJSON)
    };
    /**
* Construct and simulate a hellooo transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    hellooo = async ({ to }, options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'hellooo',
            args: this.spec.funcArgsToScVals("hellooo", { to }),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['hellooo'],
        });
    };
    /**
* Construct and simulate a decrement transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    decrement = async (options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'decrement',
            args: this.spec.funcArgsToScVals("decrement", {}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['decrement'],
        });
    };
    /**
* Construct and simulate a increment transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    increment = async (options = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'increment',
            args: this.spec.funcArgsToScVals("increment", {}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['increment'],
        });
    };
}
