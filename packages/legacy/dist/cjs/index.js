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
        contractId: "CBEEEEL3UCQ32U3PGDXCE4TZLU2NOXGAOGVOOCBT6CQE3QNOC3GVCNZ4",
    }
};
/**
    
    */
exports.Errors = {
    1: { message: "" }
};
class Contract {
    options;
    spec;
    constructor(options) {
        this.options = options;
        this.spec = new stellar_sdk_1.ContractSpec([
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
    parsers = {
        addAdmin: () => { },
        isAdmin: (result) => this.spec.funcResToNative("is_admin", result),
        approval: () => { },
        addMultipleAsset: () => { },
        claimAsset: () => { },
        verifySignature: (result) => this.spec.funcResToNative("verify_signature", result),
        hello: (result) => this.spec.funcResToNative("hello", result)
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
        addAdmin: (this.txFromJSON),
        isAdmin: (this.txFromJSON),
        approval: (this.txFromJSON),
        addMultipleAsset: (this.txFromJSON),
        claimAsset: (this.txFromJSON),
        verifySignature: (this.txFromJSON),
        hello: (this.txFromJSON)
    };
    /**
* Construct and simulate a add_admin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    addAdmin = async ({ admin_adress }, options = {}) => {
        return await assembled_tx_js_1.AssembledTransaction.fromSimulation({
            method: 'add_admin',
            args: this.spec.funcArgsToScVals("add_admin", { admin_adress: new stellar_sdk_1.Address(admin_adress) }),
            ...options,
            ...this.options,
            errorTypes: exports.Errors,
            parseResultXdr: this.parsers['addAdmin'],
        });
    };
    /**
* Construct and simulate a is_admin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    isAdmin = async ({ admin_adress }, options = {}) => {
        return await assembled_tx_js_1.AssembledTransaction.fromSimulation({
            method: 'is_admin',
            args: this.spec.funcArgsToScVals("is_admin", { admin_adress: new stellar_sdk_1.Address(admin_adress) }),
            ...options,
            ...this.options,
            errorTypes: exports.Errors,
            parseResultXdr: this.parsers['isAdmin'],
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
    /**
* Construct and simulate a add_multiple_asset transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    addMultipleAsset = async ({ data, from }, options = {}) => {
        return await assembled_tx_js_1.AssembledTransaction.fromSimulation({
            method: 'add_multiple_asset',
            args: this.spec.funcArgsToScVals("add_multiple_asset", { data, from: new stellar_sdk_1.Address(from) }),
            ...options,
            ...this.options,
            errorTypes: exports.Errors,
            parseResultXdr: this.parsers['addMultipleAsset'],
        });
    };
    /**
* Construct and simulate a claim_asset transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    claimAsset = async ({ from, claimer, message, address, signature }, options = {}) => {
        return await assembled_tx_js_1.AssembledTransaction.fromSimulation({
            method: 'claim_asset',
            args: this.spec.funcArgsToScVals("claim_asset", { from: new stellar_sdk_1.Address(from), claimer: new stellar_sdk_1.Address(claimer), message, address, signature }),
            ...options,
            ...this.options,
            errorTypes: exports.Errors,
            parseResultXdr: this.parsers['claimAsset'],
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
* Construct and simulate a hello transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
*/
    hello = async (options = {}) => {
        return await assembled_tx_js_1.AssembledTransaction.fromSimulation({
            method: 'hello',
            args: this.spec.funcArgsToScVals("hello", {}),
            ...options,
            ...this.options,
            errorTypes: exports.Errors,
            parseResultXdr: this.parsers['hello'],
        });
    };
}
exports.Contract = Contract;
