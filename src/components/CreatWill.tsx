import {
    Keypair,
    Contract,
    SorobanRpc,
    TransactionBuilder,
    Networks,
    BASE_FEE,
    xdr,
    StrKey,
    Address,
    XdrLargeInt,
    nativeToScVal,
    buildInvocationTree
  } from "@stellar/stellar-sdk";
  import {
    isConnected,
    getPublicKey,
    signAuthEntry,
    signTransaction,
    signBlob,
  } from "@stellar/freighter-api";
  import React, { useState, ChangeEvent } from 'react';
  const xlmSac= new Address("CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC")
  const contractAddress ="CAMLNYYMHXHYCRUU3477WAEMOKTOY7MROUMK7BEKADCPLYXG5T225E3H"
import {useEffect} from "react";

const CreateWill = ()=>{
    let [amount,setAmount] = useState(0);
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
    const add_asset = async()=>{
        const server = new SorobanRpc.Server(
            "https://soroban-testnet.stellar.org:443",
          );
        const sourceAccount = await server.getAccount(publicKey);
        const userAddress = new Address(publicKey)
        const contractsAddress = new Address(contractAddress)
        const contract = new Contract(contractAddress.toString());
        let builtTransaction =  new TransactionBuilder(sourceAccount, {
            fee: BASE_FEE,
            networkPassphrase: Networks.TESTNET,
          }).addOperation(contract.call("approval",nativeToScVal(xlmSac),nativeToScVal(userAddress),nativeToScVal(contractsAddress),nativeToScVal(20,{type:"i128"}))).setTimeout(30).build()
          console.log(`builtTransaction=${builtTransaction.toXDR()}`);
        // const amounts = new XdrLargeInt("i128",40)
        // const tx = await legacy.approval({token_address:xlmSac,from:publicKey,spender:contractAddress,amount:amounts.toBigInt()})
        // const {result} = (await tx.signAndSend());
        // console.log(result
        }
    let onChangeInput = (event:any)=>{
        setAmount(event.target.value)
        console.log(amount)
    }

    return(
        <div>
            <h1>XLM</h1>
            <input type="number" value={amount} onChange={onChangeInput}/>
            <button onClick={add_asset}>Add Asset</button>
        </div>
    )
}
export default CreateWill;