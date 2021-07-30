import React from "react";
import style from "../style/App.css";
import { Link } from "react-router-dom";
import BlockchainImage from "../blockchain.png";
import { useState } from "react";
function Nav() {
  const [active, setActive] = useState("hash");

  const handleActive = (name) => {
    setActive(name);
  };
  return (
    <>
      <nav>
        <div>
          <img className="image" src={BlockchainImage} alt="" />
        </div>
        <ul className="nav-links">
          <Link
            className={active === "hash" ? "nav-link active" : "nav-link"}
            to="/"
            onClick={() => handleActive("hash")}
          >
            <li>
              <a>Hash</a>
            </li>
          </Link>
          <Link
            className={active === "block" ? "nav-link active" : "nav-link"}
            to="/Block"
            onClick={() => handleActive("block")}
          >
            <li>
              <a>Block</a>
            </li>
          </Link>
          <Link className={"nav-link"} to="/Blockchain">
            <li>
              {" "}
              <a> Blockchain</a>
            </li>
          </Link>
          <Link className={"nav-link"} to="/Distributed">
            <li>
              <a> Distributed</a>
            </li>
          </Link>
          <Link className={"nav-link"} to="/Tokens">
            <li>
              <a>Tokens</a>
            </li>
          </Link>
          <Link className={"nav-link"} to="/CoinBase">
            <li>
              <a>CoinBase</a>
            </li>
          </Link>
          <Link className={"nav-link"} to="/Keys">
            <li>
              <a>Keys</a>
            </li>
          </Link>
          <Link className={"nav-link"} to="/Signatures">
            <li>
              <a>Signatures</a>
            </li>
          </Link>

          <Link className={"nav-link"} to="/Transaction">
            <li>
              <a>Transaction</a>
            </li>
          </Link>
          <Link className={"nav-link"} to="/BlockchainSigned">
            <li>
              <a>BlockchainSigned</a>
            </li>
          </Link>
        </ul>
      </nav>
    </>
  );
}

export default Nav;
