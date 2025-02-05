import { useState, useEffect } from "react";
import { signMessage } from "../utils/sign";

import Link from "next/link";
import Metamask from "../component/metamask";

const Index = () => {
  const [haveMetamask, sethaveMetamask] = useState(true);

  const [client, setclient] = useState({
    isConnected: false,
  });

  const checkConnection = async () => {
    const { ethereum } = window;
    if (ethereum) {
      sethaveMetamask(true);
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length > 0) {
        setclient({
          isConnected: true,
          address: accounts[0],
        });
      } else {
        setclient({
          isConnected: false,
        });
      }
    } else {
      sethaveMetamask(false);
    }
  };

  const connectWeb3 = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Metamask not detected");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setclient({
        isConnected: true,
        address: accounts[0],
      });
    } catch (error) {
      console.log("Error connecting to metamask", error);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="fren-nav d-flex">
        <div>
          <h3>ABOUT</h3>
        </div>
        <div className="d-flex" style={{ marginLeft: "auto" }}>
          <div>
            <button
  onClick={connectWeb3}
  style={{
    backgroundColor: "white",
    color: "black",
    border: "2px solid black",
    padding: "10px 15px",
    fontSize: "16px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, color 0.3s ease",
    fontWeight: "bold",
  }}
  onMouseOver={(e) => (e.target.style.backgroundColor = "#f0f0f0")}
  onMouseOut={(e) => (e.target.style.backgroundColor = "white")}
>
  {client.isConnected ? (
    <>
      {client.address.slice(0, 4)}...
      {client.address.slice(38, 42)}
    </>
  ) : (
    <>Connect Wallet</>
  )}
</button>

          </div>
          <div>
            <Link href="https://twitter.com/asaolu_elijah">
              <button className="btn tw-btn">TW</button>
            </Link>
          </div>
        </div>
      </nav>
      {/* Navbar end */}

      <section className="container d-flex">
        <main>
          <h1 className="main-title"> Haven </h1>

          <p className="main-desc">
            Stability, Redesigned.
          </p>

          {/* ---- */}
          <p>
            {!haveMetamask ? (
              <Metamask />
            ) : client.isConnected ? (
              <>
                <br />
                <h2>You're connected. </h2>
                <button
                  onClick={signMessage}
                  type="button"
                  className="btn sign-btn"
                >
                  Sign Message
                </button>
              </>
            ) : (
              <>
                <br />
                <button className="btn connect-btn" onClick={connectWeb3}>
                  Connect Wallet
                </button>
                <button
  onClick={connectWeb3}
  style={{
    backgroundColor: "white",
    color: "black",
    border: "2px solid black",
    padding: "10px 15px",
    fontSize: "16px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, color 0.3s ease",
    fontWeight: "bold",
  }}
  onMouseOver={(e) => (e.target.style.backgroundColor = "#f0f0f0")}
  onMouseOut={(e) => (e.target.style.backgroundColor = "white")}
>
  Connect Wallet
</button>
              </>
            )}
          </p>
          {/* ---- */}
        </main>
      </section>
    </>
  );
};

export default Index;
