import React from "react";

const Metamask = () => {
  return (
    <div
      style={{
        backgroundColor: "white",
        color: "black",
        border: "0.5px solid #ccc",
        display: "inline-block",
        textAlign: "center",
        margin: "10px",
        padding: "20px",
        fontSize: "20px",
      }}
    >
      <p>
        It appears that Metamask is not installed, <br />
        Download{" "}
        <a
          href="https://metamask.io/"
          style={{ color: "black", textDecoration: "none", fontWeight: "bold" }}
        >
          Metamask
        </a>{" "}
        to continue.
      </p>
    </div>
  );
};

export default Metamask;
