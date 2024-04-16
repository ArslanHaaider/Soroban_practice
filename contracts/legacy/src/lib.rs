#![no_std]

use soroban_sdk::{
 contract, contractimpl, contracttype,contracterror, log, symbol_short, token, vec, Address, Bytes, BytesN, Env, FromVal, Map, String, Symbol, Val, Vec
};
#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum Error {
    NO_WILL_EXIST = 1,
}
const ADMIN: Symbol = symbol_short!("ADMIN");
#[contract]
pub struct Legacy;

#[contracttype]
pub struct benificary {
    pub token_address: Address,
    pub amounts: i128,
    pub benificary: Address,
}
#[contracttype]
pub struct admin {
    admins: Vec<Address>,
}

pub fn add_asset(
    env: Env,
    token_address: Address,
    from: Address,
    benificary: Address,
    amount: i128,
) {
    let client = token::Client::new(&env, &token_address);
    let balance = client.balance(&from);
    if balance > amount {
        let event = env.events();
        let topic = ("transfer",&from,&env.current_contract_address());
        client.transfer(&from, &env.current_contract_address(), &amount);
        event.publish(topic, amount);

    } else {
        panic!("no enough amount present")
    }
    //creating default map in case not a new benificiary where key is benificary address
    let default_map: Map<Address, Vec<(Address, i128)>> = Map::new(&env);
    //fetching the will map which has all the information regard to benificiary
    let mut will_map: Map<Address, Vec<(Address, i128)>> =
        env.storage().persistent().get(&from).unwrap_or(default_map);
    //getting curruent information about the benificiary and allowed assets
    let mut benificary_assets = will_map.get(benificary.clone()).unwrap_or(vec![&env]);
    //specifying the amount for that token for curruent benificary
    benificary_assets.append(&vec![&env, (token_address, amount)]);
    //adding the information to will map
    will_map.set(benificary, benificary_assets);
    //adding the new benificary and its asset to contract storage
    env.storage().persistent().set(&from, &will_map);
}
pub fn transfer(env: Env, token_address: Address, from: Address, spender: Address, amount: i128) {
    from.require_auth();
    let client = token::Client::new(&env, &token_address);
    let balance = client.balance(&from);
    if balance > amount {
        client.transfer(&from, &spender, &amount);
    } else {
        panic!("no enough amount present")
    }
}
#[contractimpl]
impl Legacy {
    pub fn add_admin(env: Env, admin_adress: Address) {
        let copy_admin: Address = admin_adress.clone();
        let mut admin_list: admin = env.storage().persistent().get(&ADMIN).unwrap_or({
            admin {
                admins: vec![&env, admin_adress],
            }
        });
        let new_admin: Vec<Address> = vec![&env, copy_admin];
        admin_list.admins.append(&new_admin);
        env.storage().persistent().set(&ADMIN, &admin_list);
    }
    pub fn is_admin(env: Env, admin_adress: Address) -> bool {
        let mut admin_list: admin = env.storage().persistent().get(&ADMIN).unwrap();
        admin_list.admins.contains(&admin_adress)
    }
    pub fn approval(
        env: Env,
        token_address: Address,
        from: Address,
        spender: Address,
        amount: i128,
    ) {
        from.require_auth();
        let ledger = env.ledger().sequence();
        let expiration_ledger: u32 = ledger + 1000;
        let client = token::Client::new(&env, &token_address);
        let balance = client.balance(&from);
        if balance > amount {
            client.approve(&from, &spender, &amount, &expiration_ledger);
        } else {
            panic!("no enough amount present")
        }
    }

    pub fn add_multiple_asset(env: Env, data: Vec<benificary>, from: Address) {
        from.require_auth();
        for benificary in data {
            let token_address = benificary.token_address;
            let amount = benificary.amounts;
            let benificary_address = benificary.benificary;
            add_asset(
                env.clone(),
                token_address,
                from.clone(),
                benificary_address,
                amount,
            );
        }
    }
    pub fn claim_asset(
        env: Env,
        from: Address,
        claimer: Address,
        message: Bytes,
        address: BytesN<32>,
        signature: BytesN<64>,
    ){
        claimer.require_auth();
        env.crypto().ed25519_verify(&address,&message,&signature);
        if env.storage().persistent().has(&from) {
            let default_map: Map<Address, Vec<(Address, i128)>> = Map::new(&env);
            //fetching the will map which has all the information regard to benificiary
            let mut will_map: Map<Address, Vec<(Address, i128)>> =
                env.storage().persistent().get(&from).unwrap_or(default_map);
            // //find out if claimer is the benificary or not
            assert_eq!(will_map.contains_key(claimer.clone()), true);
            // //getting curruent information about the benificiary and allowed assets
            let mut benificary_assets: Vec<(Address, i128)> = will_map.get(claimer.clone()).unwrap_or(vec![&env]);
            //will run a loop over all assets assingeed to the
            for assets in benificary_assets {
                let (token_Addresss, amount) = assets;
                let event = env.events();
                let topic = ("transfer",&env.current_contract_address(),&claimer);
                let client = token::Client::new(&env, &token_Addresss);
                client.transfer(&env.current_contract_address(), &claimer, &amount);
                event.publish(topic,amount);
            }
            will_map.remove(claimer);
            env.storage().persistent().set(&from, &will_map);
        } else {
            // Err(Error::NO_WILL_EXIST)
        }
    }
    pub fn verify_signature(env:Env,message:Bytes,address:BytesN<32>,signature:BytesN<64>) -> bool{
        //will panic if verification fails
         env.crypto().ed25519_verify(&address,&message,&signature);
        // else it will reuturn true;
         true
        }
    //to mimic the signiing of the signature
    pub fn test_admin_sign(env: Env) -> bool {
        true
    }
}
mod test;
