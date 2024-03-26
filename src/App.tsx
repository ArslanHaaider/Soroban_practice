import React, { useState, useEffect } from 'react';
import helloWorld from "./contracts/practice_contract";
import FreighterComponent from './components/ConnectFreighter'
import {
  isConnected,
  getPublicKey,
  signAuthEntry,
  signTransaction,
  signBlob,
} from "@stellar/freighter-api";

import {
  Keypair,
  Contract,
  SorobanRpc,
  TransactionBuilder,
  Networks,
  BASE_FEE,
  xdr,
  StrKey
} from "@stellar/stellar-sdk";

function App() {
  const [value,setValue] = useState(0);
  let publicKey:string = ""
  useEffect(()=>{
     //Retreive public key
  const retrievePublicKey = async ()=> {
    let error = "";
  
    try {
      publicKey = await getPublicKey();
    } catch (error) {
      return error;
    }
  
    if (error) {
      return error;
    }
  
    return publicKey;
  };
  retrievePublicKey();
  },[])


  const Decrement = async()=>{
    // const tx = await helloWorld.decrement();
    // const {result} = await tx.signAndSend();
    // setValue(result);
    // Configure SorobanClient to use the `soroban-rpc` instance of your
  // choosing.


  //first implementation  to call the contract in this example I just have implemented sended signature verifciation logic to send the transaction through hasn't been added
  const server = new SorobanRpc.Server(
    "https://soroban-testnet.stellar.org:443",
  );

  // Here we will use a deployed instance of the `increment` example contract.
  const contractAddress =
  "CBRSICTR36JXDYHAOQS3WFCNOUYKKPRGQFLRJDSJS56MYC5AFUUT5SSS";
  const contract = new Contract(contractAddress);

  // Transactions require a valid sequence number (which varies from one
  // account to another). We fetch this sequence number from the RPC server.
  const sourceAccount = await server.getAccount(publicKey);
  console.log("Gonna pritn the source Account",sourceAccount)
  // The transaction begins as pretty standard. The source account, minimum
  // fee, and network passphrase are provided.
  let builtTransaction = new TransactionBuilder(sourceAccount, {
    fee: BASE_FEE,
    networkPassphrase: Networks.TESTNET,
  })
    // The invocation of the `increment` function of our contract is added
    // to the transaction. Note: `increment` doesn't require any parameters,
    // but many contract functions do. You would need to provide those here.
    .addOperation(contract.call("decrement"))
    // This transaction will be valid for the next 30 seconds
    .setTimeout(30)
    .build();

  console.log(`builtTransaction=${builtTransaction.toXDR()}`);

  // We use the RPC server to "prepare" the transaction. This simulating the
  // transaction, discovering the storage footprint, and updating the
  // transaction to include that footprint. If you know the footprint ahead of
  // time, you could manually use `addFootprint` and skip this step.
  let preparedTransaction = await server.prepareTransaction(builtTransaction);
  let messageHash = preparedTransaction.hash();
  let xdrString = preparedTransaction.toEnvelope().toXDR("base64")
  const transaction = await signTransaction(xdrString,{ networkPassphrase: Networks.TESTNET })

  // const testPublicKey = "GCWOV73MMIZO7JYOYLRZZZ2QLGFYFL2B45RP5PUMR45TBO23URGIXYWS"
  const publicKeyBuffer = StrKey.decodeEd25519PublicKey(publicKey)
  const txEnvelope = xdr.TransactionEnvelope.fromXDR(transaction, 'base64');
      const signature = txEnvelope.v1().signatures()[0].signature();
      const message = await txEnvelope.v1().tx().toXDR();
      // console.log('signature: ', signatures[0].signature());
      console.log('message: ', message);
      //can add try catch block to catch the error if verifcation fails else will Submit the transaction to the Soroban-RPC server
      const result = await helloWorld.verifySignature({message:messageHash,address:publicKeyBuffer,signature:signature});
  }
  const Increment = async()=>{
    //second way to call contract just using the client we imported
    const tx = await helloWorld.increment();
    const {result} = (await tx.signAndSend());
    setValue(result);
  }
  return (
    <>
{/* 
      <div>{greeting}</div> */}
      <h1>{value}</h1>
      <FreighterComponent/>
      <div>
      <button onClick={Decrement}>Decrement</button>
      <button onClick={Increment}>Increment</button>
      </div>
    </>
  );
}

export default App;
