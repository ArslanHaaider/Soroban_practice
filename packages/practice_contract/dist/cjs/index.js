"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contract = exports.Errors = exports.networks = void 0;
const stellar_sdk_1 = require("@stellar/stellar-sdk");
const buffer_1 = require("buffer");
const assembled_tx_js_1 = require("./assembled-tx.js");
__exportStar(require("./assembled-tx.js"), exports);
__exportStar(require("./method-options.js"), exports);
if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || buffer_1.Buffer;
}
exports.networks = {
    testnet: {
        networkPassphrase: "Test SDF Network ; September 2015",
        contractId: "CDBFYKS2YCJSRHBP65LTTKSRFY5SOXTWQAVZSW6VO36U5ZZESTB5ULLN",
    }
};
/**
    
    */
exports.Errors = {};
class Contract {
    options;
    spec;
    constructor(options) {
        this.options = options;
        this.spec = new stellar_sdk_1.ContractSpec([
            "AAAAAAAAAAAAAAAHaGVsbG9vbwAAAAABAAAAAAAAAAJ0bwAAAAAAEQAAAAEAAAPqAAAAEQ==",
            "AAAAAAAAAAAAAAAJZGVjcmVtZW50AAAAAAAAAAAAAAEAAAAE",
            "AAAAAAAAAAAAAAAJaW5jcmVtZW50AAAAAAAAAAAAAAEAAAAE",
            "AAAAAAAAAAAAAAAQdmVyaWZ5X3NpZ25hdHVyZQAAAAMAAAAAAAAAB21lc3NhZ2UAAAAADgAAAAAAAAAHYWRkcmVzcwAAAAPuAAAAIAAAAAAAAAAJc2lnbmF0dXJlAAAAAAAD7gAAAEAAAAABAAAAAQ==",
            "AAAAAAAAAAAAAAAIYXBwcm92YWwAAAAEAAAAAAAAAA10b2tlbl9hZGRyZXNzAAAAAAAAEwAAAAAAAAAEZnJvbQAAABMAAAAAAAAAB3NwZW5kZXIAAAAAEwAAAAAAAAAGYW1vdW50AAAAAAALAAAAAA=="
        ]);
    }
    parsers = {
        hellooo: (result) => this.spec.funcResToNative("hellooo", result),
        decrement: (result) => this.spec.funcResToNative("decrement", result),
        increment: (result) => this.spec.funcResToNative("increment", result),
        verifySignature: (result) => this.spec.funcResToNative("verify_signature", result),
        approval: () => { }
    };
    txFromJSON = (json) => {
        const { method, ...tx } = JSON.parse(json);
        return assembled_tx_js_1.AssembledTransaction.fromJSON({
            ...this.options,
            method,
            parseResultXdr: this.parsers[method],
        }, tx);
    };
    fromJSON = {
        hellooo: (this.txFromJSON),
        decrement: (this.txFromJSON),
        increment: (this.txFromJSON),
        verifySignature: (this.txFromJSON),
        approval: (this.txFromJSON)
    };
    /**
* Construct and simulate a hellooo transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    hellooo = async ({ to }, options = {}) => {
        return await assembled_tx_js_1.AssembledTransaction.fromSimulation({
            method: 'hellooo',
            args: this.spec.funcArgsToScVals("hellooo", { to }),
            ...options,
            ...this.options,
            errorTypes: exports.Errors,
            parseResultXdr: this.parsers['hellooo'],
        });
    };
    /**
* Construct and simulate a decrement transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    decrement = async (options = {}) => {
        return await assembled_tx_js_1.AssembledTransaction.fromSimulation({
            method: 'decrement',
            args: this.spec.funcArgsToScVals("decrement", {}),
            ...options,
            ...this.options,
            errorTypes: exports.Errors,
            parseResultXdr: this.parsers['decrement'],
        });
    };
    /**
* Construct and simulate a increment transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    increment = async (options = {}) => {
        return await assembled_tx_js_1.AssembledTransaction.fromSimulation({
            method: 'increment',
            args: this.spec.funcArgsToScVals("increment", {}),
            ...options,
            ...this.options,
            errorTypes: exports.Errors,
            parseResultXdr: this.parsers['increment'],
        });
    };
    /**
* Construct and simulate a verify_signature transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    verifySignature = async ({ message, address, signature }, options = {}) => {
        return await assembled_tx_js_1.AssembledTransaction.fromSimulation({
            method: 'verify_signature',
            args: this.spec.funcArgsToScVals("verify_signature", { message, address, signature }),
            ...options,
            ...this.options,
            errorTypes: exports.Errors,
            parseResultXdr: this.parsers['verifySignature'],
        });
    };
    /**
* Construct and simulate a approval transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    approval = async ({ token_address, from, spender, amount }, options = {}) => {
        return await assembled_tx_js_1.AssembledTransaction.fromSimulation({
            method: 'approval',
            args: this.spec.funcArgsToScVals("approval", { token_address: new stellar_sdk_1.Address(token_address), from: new stellar_sdk_1.Address(from), spender: new stellar_sdk_1.Address(spender), amount }),
            ...options,
            ...this.options,
            errorTypes: exports.Errors,
            parseResultXdr: this.parsers['approval'],
        });
    };
}
exports.Contract = Contract;
