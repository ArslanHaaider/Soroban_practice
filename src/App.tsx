import React, { useState, useEffect } from 'react';
import helloWorld from "./contracts/practice_contract";

function App() {
  const [greeting, setGreeting] = useState("");
  const [value,setValue] = useState(0);
  useEffect(() => {
    async function fetchData() {
        const { result } = await helloWorld.hellooo({ to: "Angel" });
        const greetings = result.join(" ");
        setGreeting(greetings);
        console.log(greeting)
    }

    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once after the initial render
  const Decrement = async()=>{
    const tx = await helloWorld.decrement();
    const {result} = await tx.signAndSend();
    setValue(result);
  }
  const Increment = async()=>{
    const tx = await helloWorld.increment();
    const {result} = await tx.signAndSend();
    setValue(result);
  }
  return (
    <>
      <div>{greeting}</div>
      <h1>{value}</h1>
      <div>
      <button onClick={Decrement}>Decrement</button>
      <button onClick={Increment}>Increment</button>
      </div>
    </>
  );
}

export default App;
