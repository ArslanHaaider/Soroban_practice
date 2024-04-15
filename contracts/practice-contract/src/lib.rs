#![no_std]
use soroban_sdk::{bytes, contract, contractimpl, log, symbol_short, vec, Bytes, BytesN, Env, Symbol, Vec,Address,token};

#[contract]
pub struct Practice;

const Counter: Symbol = symbol_short!("COUNTER");

#[contractimpl]
impl Practice {
    pub fn hellooo(env: Env, to: Symbol) -> Vec<Symbol> {
        vec![&env, symbol_short!("Hello000"), to]
    }
    pub fn decrement(env:Env) -> u32 {
        let mut count:u32 = env.storage().persistent().get(&Counter).unwrap_or(10);
        count -=1;
        log!(&env," COunt: {}",count);
        env.storage().persistent().set(&Counter,&count);
        env.storage().persistent().extend_ttl(&Counter,100,100);
        count 
    }
    pub fn increment(env:Env) -> u32 {
        let mut count:u32 = env.storage().persistent().get(&Counter).unwrap_or(10);
        count +=1;
        log!(&env," COunt: {}",count);
        env.storage().persistent().set(&Counter,&count);
        env.storage().persistent().extend_ttl(&Counter,100,100);
        count 
    }
    pub fn verify_signature(env:Env,message:Bytes,address:BytesN<32>,signature:BytesN<64>) -> bool{
    //will panic if verification fails
     env.crypto().ed25519_verify(&address,&message,&signature);
    // else it will reuturn true; 
     true
    }
    pub fn approval(env: Env,token_address:Address,from:Address,spender:Address,amount:i128){
        from.require_auth();
        let ledger = env.ledger().sequence();
        let expiration_ledger:u32 = ledger + 1000;
        let client = token::Client::new(&env, &token_address);
        client.approve(&from, &spender, &amount, &expiration_ledger)
    }}

mod test;