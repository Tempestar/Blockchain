import React, { useState } from "react";
import ReactDOM from "react-dom";
import { ethers } from "ethers";

const ABI = [
  // Copiez le ABI de votre smart contract ici
];

const CONTRACT_ADDRESS = "0x123..."; // Remplacez par l'adresse de votre contrat

function App() {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(0);
  const [badgeId, setBadgeId] = useState(0);

  async function connect() {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const balance = await provider.getBalance(address);
        setAccount(address);
        setBalance(balance.toString());
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("Metamask not found");
    }
  }

  async function buyBadge() {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
        const tx = await contract.buyBadge(badgeId, {
          value: ethers.utils.parseEther("1") // Remplacez 1 par le prix de votre badge en ether
        });
        await tx.wait();
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("Metamask not found");
    }
  }

  return (
    <div>
      <h1>Badge Shop</h1>
      {account ? (
        <p>
          Connected account: {account} - Balance:{" "}
          {ethers.utils.formatEther(balance)} ETH
        </p>
      ) : (
        <button onClick={connect}>Connect to Metamask</button>
      )}
      <input
        type="number"
        placeholder="Badge ID"
        value={badgeId}
        onChange={(event) => setBadgeId(event.target.value)}
      />
      <button onClick={buyBadge}>Buy Badge</button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
