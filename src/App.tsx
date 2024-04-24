import React, { useState, } from "react";
import Legacy from "./contracts/legacy";
import FreighterComponent from "./components/ConnectFreighter";
import {
  isConnected,
  getPublicKey,
  signTransaction,
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
  Transaction,
} from "@stellar/stellar-sdk";
import legacy from "./contracts/legacy";

function App() {
  const [value, setValue] = useState(0);
  const adminKey = Keypair.fromSecret(
    "SA5QZIOK2MHIHURJECTWLPTT7IGWXVNA7M56KIBQOU5RO2WSB774FJAR"
  );
  let preparedTransaction;
  let messageHash;
  let signature;
  let publicKeyBuffer ;
  const signAdmin = async ()=>{
    const server = new SorobanRpc.Server(
      "https://soroban-testnet.stellar.org:443",
    );
    const contractAddress =
    "CDD6ODQOX7GEJOYW6DZ7KDSXPELJOPSYLOLMOGH22JPOZ33JOCWWK2EJ";
    const contract = new Contract(contractAddress);
    // Transactions require a valid sequence number (which varies from one
    // account to another). We fetch this sequence number from the RPC server.
      let  publicKey = await getPublicKey();

    const sourceAccount = await server.getAccount(publicKey);
    console.log("Gonna pritn the source Account",sourceAccount)
    // The transaction begins as pretty standard. The source account, minimum
    // fee, and network passphrase are provided.
    let builtTransaction = new TransactionBuilder(sourceAccount, {
      fee: BASE_FEE,
      networkPassphrase: Networks.TESTNET,
    }).addOperation(contract.call("test_admin_sign"))
    .setTimeout(300)
      .build();
  
    console.log(`builtTransaction=${builtTransaction.toXDR()}`);
    preparedTransaction = await server.prepareTransaction(builtTransaction);
    messageHash = preparedTransaction.hash();
    let xdrString = preparedTransaction.toEnvelope().toXDR("base64")
    const transaction = await signTransaction(xdrString,{ networkPassphrase: Networks.TESTNET })
    // const testPublicKey = "GCWOV73MMIZO7JYOYLRZZZ2QLGFYFL2B45RP5PUMR45TBO23URGIXYWS"
    publicKeyBuffer = StrKey.decodeEd25519PublicKey(publicKey)
    const txEnvelope = xdr.TransactionEnvelope.fromXDR(transaction, 'base64');
        signature = txEnvelope.v1().signatures()[0].signature();
  }
  const addAdmin = async () => {
    const adminAddress =new Address("GDZ2WJCDM5I7YZF7KHQ3Z5ZCLNXY5KF7OFDJJVQANT3LRYE6W4KMMN7W");

    const tx = await legacy.addAdmin({admin_adress:adminAddress.toBuffer()});
    // const tx = await Legacy.hello();
    const { result } = await tx.signAndSend({ force: true });
    console.log(result);
  };
  const add_Multiple = async () => {
    let amount1 = new XdrLargeInt("i128", 600000000);
    let amount2 = new XdrLargeInt("i128", 500000000);
    let dat1 = {
      token_address: "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC", // Initialize with appropriate values
      amounts: amount1.toBigInt(),
      benificary: "GCWOV73MMIZO7JYOYLRZZZ2QLGFYFL2B45RP5PUMR45TBO23URGIXYWS", // Initialize with appropriate values
    };
    let dat2 = {
      token_address: "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC",
      amounts: amount2.toBigInt(),
      benificary: "GDZDWPRWGMAVTNWBERD667PQ3BPCGIHEFQET6RRI4MZUS77ASHJMPT7B",
    };
    // const data = [dataa,dataaa]
    let  publicKey = await getPublicKey();

    const tx = await Legacy.addMultipleAsset({
      data: [dat1, dat2],
      from: publicKey,
    });
    const { result } = await tx.signAndSend();
  };
  // const soloVerify = async()=>{
  //   const tx = await helloWorld.verifySignature({message:messageHash,address:publicKeyBuffer,signature:signature})
  //   const { result } = await tx.signAndSend({force:true});
  //   console.log(result)
  // }
  const claim_Asset = async () => {

    let  publicKey = await getPublicKey();
    const tx = await Legacy.claimAsset({
      from: "GAOWQIPEENZNPTVZNWQRBJQ36XQSQQHMJFRGW5DQJJQGTSH5VUR35RI3",
      claimer: publicKey,
      message: messageHash,
      address: publicKeyBuffer,
      signature:signature,
    });
    const { result } = await tx.signAndSend();
    console.log(result);
  };

  return (
    <>
      {/* <div>{greeting}</div> */}
      <h1>{value}</h1>
      <FreighterComponent />
      <div>
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
        <h1>Sing admin first before claim</h1>
        <button onClick={signAdmin}>Sign Admin</button>
      </div>
      <div>
        <h1>Claim assets:test version</h1>
        <button onClick={claim_Asset}>Claim assets benificary</button>
        {/* <button onClick={}>Claim assets benificary 2</button> */}
      </div>

      {/* <div>
        <h1>
          solo verify testne
        </h1>
        <button onClick={soloVerify}>Solo Verify</button>
      </div> */}
    </>
  );
}

export default App;
