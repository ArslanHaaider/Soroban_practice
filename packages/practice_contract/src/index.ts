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
        contractId: "CAPHZWKTGQEYWWXDWGC7XH6YP6X36LJLSGRX6JNZV37JG2GITP634EPA",
    }
} as const

/**
    
    */
export const Errors = {

}

export class Contract {
    spec: ContractSpec;
    constructor(public readonly options: ClassOptions) {
        this.spec = new ContractSpec([
            "AAAAAAAAAAAAAAAHaGVsbG9vbwAAAAABAAAAAAAAAAJ0bwAAAAAAEQAAAAEAAAPqAAAAEQ==",
        "AAAAAAAAAAAAAAAJZGVjcmVtZW50AAAAAAAAAAAAAAEAAAAE",
        "AAAAAAAAAAAAAAAJaW5jcmVtZW50AAAAAAAAAAAAAAEAAAAE",
        "AAAAAAAAAAAAAAAQdmVyaWZ5X3NpZ25hdHVyZQAAAAMAAAAAAAAAB21lc3NhZ2UAAAAADgAAAAAAAAAHYWRkcmVzcwAAAAPuAAAAIAAAAAAAAAAJc2lnbmF0dXJlAAAAAAAD7gAAAEAAAAABAAAAAQ==",
        "AAAAAAAAAAAAAAAIYXBwcm92YWwAAAAEAAAAAAAAAA10b2tlbl9hZGRyZXNzAAAAAAAAEwAAAAAAAAAEZnJvbQAAABMAAAAAAAAAB3NwZW5kZXIAAAAAEwAAAAAAAAAGYW1vdW50AAAAAAALAAAAAA=="
        ]);
    }
    private readonly parsers = {
        hellooo: (result: XDR_BASE64): Array<string> => this.spec.funcResToNative("hellooo", result),
        decrement: (result: XDR_BASE64): u32 => this.spec.funcResToNative("decrement", result),
        increment: (result: XDR_BASE64): u32 => this.spec.funcResToNative("increment", result),
        verifySignature: (result: XDR_BASE64): boolean => this.spec.funcResToNative("verify_signature", result),
        approval: () => {}
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
        hellooo: this.txFromJSON<ReturnType<typeof this.parsers['hellooo']>>,
        decrement: this.txFromJSON<ReturnType<typeof this.parsers['decrement']>>,
        increment: this.txFromJSON<ReturnType<typeof this.parsers['increment']>>,
        verifySignature: this.txFromJSON<ReturnType<typeof this.parsers['verifySignature']>>,
        approval: this.txFromJSON<ReturnType<typeof this.parsers['approval']>>
    }
        /**
    * Construct and simulate a hellooo transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
    */
    hellooo = async ({to}: {to: string}, options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number,
    } = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'hellooo',
            args: this.spec.funcArgsToScVals("hellooo", {to}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['hellooo'],
        });
    }


        /**
    * Construct and simulate a decrement transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
    */
    decrement = async (options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number,
    } = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'decrement',
            args: this.spec.funcArgsToScVals("decrement", {}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['decrement'],
        });
    }


        /**
    * Construct and simulate a increment transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
    */
    increment = async (options: {
        /**
         * The fee to pay for the transaction. Default: 100.
         */
        fee?: number,
    } = {}) => {
        return await AssembledTransaction.fromSimulation({
            method: 'increment',
            args: this.spec.funcArgsToScVals("increment", {}),
            ...options,
            ...this.options,
            errorTypes: Errors,
            parseResultXdr: this.parsers['increment'],
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

}