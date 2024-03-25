#![no_std]
use soroban_sdk::{contract, contractimpl, log, symbol_short, Env, Symbol,Vec,vec};

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
}

mod test;