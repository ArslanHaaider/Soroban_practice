import React, { useState, useEffect } from 'react';
import helloWorld from "./contracts/legacy";
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
  StrKey,
  XdrLargeInt,
  nativeToScVal,
  Address,
  Memo, 
  Transaction,
  ScInt,
  sign
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
  const contractAddress = "CBPUXMRKUQP2D5OUBWBSI7KP7UY2JLPXE4F5QISCZZL3ZALGF3PYQLNX"
    const adminKey = Keypair.fromSecret("SA5QZIOK2MHIHURJECTWLPTT7IGWXVNA7M56KIBQOU5RO2WSB774FJAR");
    const adminPublicKey = new Address(adminKey.publicKey())
  const signs = adminKey.signDecorated(adminKey.publicKey());
  const message = new Address(adminKey.publicKey());
  const approval = async()=>{
    const server = new SorobanRpc.Server(
      "https://soroban-testnet.stellar.org:443",
    );
  const sourceAccount = await server.getAccount(publicKey);
  const xlmSac= new Address("CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC")
  const Account2 = new Address("GDZDWPRWGMAVTNWBERD667PQ3BPCGIHEFQET6RRI4MZUS77ASHJMPT7B")
  const userAddress = new Address(publicKey);
  const owner = new Address("GCWOV73MMIZO7JYOYLRZZZ2QLGFYFL2B45RP5PUMR45TBO23URGIXYWS")
  let amount = new XdrLargeInt('i128',200000000);
  let amountScVal = amount.toI128()
  console.log(publicKey);
  const contractsAddress = new Address(contractAddress)
  const contract = new Contract(contractAddress.toString());

    let builtTransaction =  new TransactionBuilder(sourceAccount, {
      fee: BASE_FEE,
      networkPassphrase: Networks.TESTNET,
    }).addOperation(contract.call("claim_asset",nativeToScVal(owner),nativeToScVal(userAddress))).setTimeout(30).build()
    console.log(`builtTransaction=${builtTransaction.toXDR()}`);

  let preparedTransaction = await server.prepareTransaction(builtTransaction);
  // let messageHash = preparedTransaction.hash();
  let xdrString = preparedTransaction.toEnvelope().toXDR("base64")
  const transaction = await signTransaction(xdrString,{ networkPassphrase: Networks.TESTNET })
  console.log("Signed transaction Xdr",transaction)
  const txEnvelope = xdr.TransactionEnvelope.fromXDR(transaction,'base64')
  const tx =new Transaction(txEnvelope,Networks.TESTNET)
  console.log("txXdr",tx.toEnvelope().toXDR("base64"));
  try {
    let sendResponse = await server.sendTransaction(tx);
    console.log(`Sent transaction: ${JSON.stringify(sendResponse)}`);

    if (sendResponse.status === "PENDING") {
      let getResponse = await server.getTransaction(sendResponse.hash);
      // Poll `getTransaction` until the status is not "NOT_FOUND"
      while (getResponse.status === "NOT_FOUND") {
        console.log("Waiting for transaction confirmation...");
        // See if the transaction is complete
        getResponse = await server.getTransaction(sendResponse.hash);
        // Wait one second
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      console.log(`getTransaction response: ${JSON.stringify(getResponse)}`);

      if (getResponse.status === "SUCCESS") {
        // Make sure the transaction's resultMetaXDR is not empty
        if (!getResponse.resultMetaXdr) {
          throw "Empty resultMetaXDR in getTransaction response";
        }
        // Find the return value from the contract and return it
        let transactionMeta = getResponse.resultMetaXdr;
        let returnValue =  transactionMeta.v3().sorobanMeta()?.returnValue();
        console.log(`Transaction result: ${returnValue?.value()}`);
      } else {
        throw `Transaction failed: ${getResponse.resultXdr}`;
      }
    } else {
      throw sendResponse.errorResult;
    }
  } catch (err) {
    // Catch and report any errors we've thrown
    console.log("Sending transaction failed");
    console.log(JSON.stringify(err));
  }
  }

  const Increment = async()=>{
  let amounts = new XdrLargeInt('i128',20);
    //second way to call contract just using the client we imported
    const tx = await helloWorld.approval({token_address:"CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC",from:publicKey,spender:"GDZDWPRWGMAVTNWBERD667PQ3BPCGIHEFQET6RRI4MZUS77ASHJMPT7B",amount:amounts.toBigInt()});
    // const tx = await helloWorld.increment();
    const {getTransactionResponseAll} = await tx.signAndSend();
    console.log(getTransactionResponseAll)
  }
  const addAdmin = async()=>{
    const adminAddress = "GCBG5RYG4CLLK675OPO4MUENCBCQIIDYY7WVB5J5D5IIWWTNKIRWEOEZ"
    // const tx = await helloWorld.addAdmin({admin_adress:adminAddress});
    const tx = await helloWorld.hello();
    const {result} = await tx.signAndSend({force:true});
    console.log(result)
  }
  const add_Multiple= async() =>{
  let amount1 = new XdrLargeInt("i128",600000000);
  let amount2 = new XdrLargeInt("i128",500000000);
  let dat1 =   {
      token_address:"CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC", // Initialize with appropriate values
      amounts: amount1.toBigInt(),
      benificary:"GCWOV73MMIZO7JYOYLRZZZ2QLGFYFL2B45RP5PUMR45TBO23URGIXYWS", // Initialize with appropriate values
  }
  let dat2 =   {
    token_address:"CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC",
    amounts:amount2.toBigInt(),
    benificary:"GDZDWPRWGMAVTNWBERD667PQ3BPCGIHEFQET6RRI4MZUS77ASHJMPT7B", 
}
    // const data = [dataa,dataaa]
    const tx = await helloWorld.addMultipleAsset({data:[dat1,dat2],from:publicKey})
    const {result} = await tx.signAndSend();
  }
  const claim_Asset = async ()=>{
    const tx = await helloWorld.claimAsset({from:"GAOWQIPEENZNPTVZNWQRBJQ36XQSQQHMJFRGW5DQJJQGTSH5VUR35RI3",claimer:publicKey,message:message.toBuffer(),address:adminPublicKey.toBuffer(),signature:signs.signature()})
    const {result} = await tx.signAndSend();
    console.log(result)
  }
  return (
    <>

      {/* <div>{greeting}</div> */}
      <h1>{value}</h1>
      <FreighterComponent/>
      <div>
      <button onClick={approval}>claim</button>
      <button onClick={Increment}>Increment</button>

      </div>
      <div>
      <h1>Admi purpose:Add address</h1>
        <button onClick={addAdmin}>Add admin</button>
      </div>
      <div>
        <h1>Add asset:test version</h1>
        <button onClick={add_Multiple}>Add Multiple</button>
      </div>
      <div>
        <h1>Claim assets:test version</h1>
        <button onClick={claim_Asset}>Claim assets benificary</button> 
        {/* <button onClick={}>Claim assets benificary 2</button> */}
      </div> 
    </>
  );
}

export default App;
