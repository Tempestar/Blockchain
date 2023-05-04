import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { ethers } from "ethers";
import App from index.js;

const store = createStore((state) => state);

window.addEventListener("load", async () => {
  // Demande la connexion à Sepolia
  await window.ethereum.enable();

  // Récupère l'adresse et le solde du compte connecté
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  const balance = await provider.getBalance(address);

  // Rend l'application
  ReactDOM.render(
    <Provider store={store}>
      <App account={address} balance={balance} />
    </Provider>,
    document.getElementById("root")
  );
});
