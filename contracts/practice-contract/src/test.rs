#![cfg(test)]

use super::*;
use soroban_sdk::{symbol_short, vec, Env};

#[test]
fn test() {
    let env = Env::default();
    let contract_id = env.register_contract(None, Practice);
    let client = PracticeClient::new(&env, &contract_id);

    let words = client.hello(&symbol_short!("Sev"));
    assert_eq!(
        words,
        vec![&env, symbol_short!("Hello"), symbol_short!("Sev"),]
    );
    // log!("Doing test for increment Function");
    assert_eq!(client.increment(), 1);
    assert_eq!(client.increment(), 2);
    assert_eq!(client.increment(), 3);
}