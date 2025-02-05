import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Link from "next/link";

const Index = () => {
  const [haveMetamask, setHaveMetamask] = useState(true);
  const [client, setClient] = useState({
    isConnected: false,
    provider: null,
    signer: null,
    contract: null,
  });

  const contractAddress = "0x18D24Ec211d3Ba17a254D73C376Ed6DE99C7A271";
  const contractABI = require("../utils/ABI.json");

  const checkConnection = async () => {
    const { ethereum } = window;
    if (ethereum) {
      setHaveMetamask(true);
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length > 0) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        setClient({
          isConnected: true,
          address: accounts[0],
          provider,
          signer,
          contract,
        });
      } else {
        setClient({
          isConnected: false,
          provider: null,
          signer: null,
          contract: null,
        });
      }
    } else {
      setHaveMetamask(false);
    }
  };

  const connectWeb3 = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Metamask not detected");
        return;
      }
      await ethereum.request({
        method: "eth_requestAccounts",
      });
      checkConnection();
    } catch (error) {
      console.log("Error connecting to metamask", error);
    }
  };

  const mintTokens = async (amount) => {
    if (client.contract) {
      const amountToMint = ethers.utils.parseUnits(amount.toString(), 18); // Assuming your token has 18 decimals
      try {
        const tx = await client.contract.mint(amountToMint, { value: ethers.utils.parseEther("0.01") }); // The ETH value should be calculated based on the minting cost
        await tx.wait();
        console.log("Minting successful");
      } catch (error) {
        console.error("Error minting tokens:", error);
      }
    } else {
      console.log("Contract not connected");
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  return (
    <>
      <nav className="fren-nav d-flex">
        <div><h3>ABOUT</h3></div>
        <div className="d-flex" style={{ marginLeft: "auto" }}>
          <div>
            <button onClick={connectWeb3} style={{ backgroundColor: "white", color: "black", border: "2px solid black", padding: "10px 15px", fontSize: "16px", borderRadius: "8px", cursor: "pointer", transition: "background-color 0.3s ease, color 0.3s ease", fontWeight: "bold" }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#f0f0f0")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "white")}>
              {client.isConnected ? `${client.address.slice(0, 4)}...${client.address.slice(38, 42)}` : "Connect Wallet"}
            </button>
          </div>
          <div>
            <Link href="https://twitter.com/asaolu_elijah">
              <button className="btn tw-btn">TW</button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="container d-flex">
        <main>
          <h1 className="main-title">Haven</h1>
          <p className="main-desc">Stability, Redesigned.</p>
          <p>
            {!haveMetamask ? "Please install Metamask." : client.isConnected ? "You're connected. Ready to mint?" : "Connect your wallet to get started."}
            {client.isConnected && (
              <button onClick={() => mintTokens(1)} className="btn">Mint Tokens</button>
            )}
          </p>
        </main>
      </section>
    </>
  );
};

export default Index;

