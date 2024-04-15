import { Keypair } from "stellar-sdk";

let admin = Keypair.random();
console.log(admin.secret());
let adminPublic = Keypair.fromSecret(admin);
console.log(adminPublic.publicKey())