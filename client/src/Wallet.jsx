import server from "./server";
import { ethers } from "ethers";

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivatekey }) {

  // Corrected: Define the onChange function as async inside the component
  const onChange = async (evt) => {
    const inputPrivateKey = evt.target.value;
    setPrivatekey(inputPrivateKey); // Update the private key state

    try {
      const wallet = new ethers.Wallet(inputPrivateKey);
      console.log("Derived Address:", wallet.address); // Log the derived address
      setAddress(wallet.address); // Update the address state

      const response = await server.get(`balance/${wallet.address}`);
      console.log("Balance Response:", response.data.balance); // Log the balance response
      setBalance(response.data.balance); // Update the balance state
    } catch (error) {
      console.error("Error:", error);
      setBalance(-1); // Set balance to -1 in case of an error
    }
  };

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>
      <label>
        Private Key
        <input placeholder="Type a private key, for example: 0x1" value={privateKey} onChange={onChange}></input>
      </label>
      <div>
        Address: {address ? address.slice(0,10) + "..." : "N/A"}
      </div>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
