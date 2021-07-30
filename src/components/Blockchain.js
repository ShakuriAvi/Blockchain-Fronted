import { BounceLoader, BarLoader, BeatLoader } from "react-spinners";
import style from "../style/Block.Module.css";
import React, { useEffect, useState } from "react";
import Block from "./Block";
import { css } from "@emotion/react";
import axios from "axios";

const uri = "http://localhost:3001";

const Blockchain = ({ type }) => {
  var send;
  if (type == null) {
    send = "BlockChain";
  } else {
    send = type;
  }
  const loaderCSS = css`
    margin-top: 25px;
    margin-bottom: 25px;
  `;
  const [loading, setLoading] = useState(true);
  const [changeBlock, setChangeBlock] = useState(true);
  const [counter, setCounter] = useState(1);
  const [chain, setChain] = useState("");
  useEffect(() => {
    if (send === "BlockChain") {
      axios.get(uri + "/getblockchain").then((res) => {
        setLoading(false);
        setChain(res.data.chain);
      });
    } else if (send === "TX") {
      axios.get(uri + "/gettokenblockchain").then((res) => {
        setLoading(false);
        setChain(res.data.chain);
      });
    } else if (send === "TX,CoinBase") {
      axios.get(uri + "/getcoinbaseblockchain").then((res) => {
        setLoading(false);
        setChain(res.data.chain);
      });
    } else {
      axios.get(uri + "/getensignedblockchain").then((res) => {
        setLoading(false);
        setChain(res.data.chain);
      });
    }
  }, []);

  const changePrev = (e) => {
    // if (e[0] < chain.length-1) {
    //   chain[e[0]].previousHash = e[1];
    //   setChain(chain)
    //  // console.log("chain" + JSON.stringify(chain));
    // }
  };
  useEffect(() => {
    console.log("chain" + JSON.stringify(chain));
  }, [chain]);
  return (
    <>
      {" "}
      {loading === false && chain !== "" && send === "BlockChain" ? (
        <div id="root" className={style.Row}>
          {" "}
          {Object.values(chain).map((item, i) => (
            <Block
              key={i}
              type={send}
              bNumber={item.index}
              initNonce={item.nonce}
              initPrevHash={item.previousHash}
              initHash={item.hash}
              prop={changePrev}
            />
          ))}{" "}
        </div>
      ) : loading === false &&
        chain !== "" &&
        (send === "TX" || send === "TX,CoinBase") ? (
        <div id="root" className={style.Row}>
          {" "}
          {Object.values(chain).map((item, i) => (
            <Block
              key={i}
              type={send}
              bNumber={item.index}
              initNonce={item.nonce}
              initPrevHash={item.previousHash}
              initHash={item.hash}
              stringData={item.stringData}
              initTx={item.data}
              initCoin={item.coinbase}
            />
          ))}{" "}
        </div>
      ) : loading === false && chain !== "" && send === "TXKeys,CoinBase" ? (
        <div id="root" className={style.Row}>
          {" "}
          {Object.values(chain).map((item, i) => (
            <Block
              key={i}
              type={send}
              bNumber={item.index}
              initNonce={item.nonce}
              initPrevHash={item.previousHash}
              initHash={item.hash}
              stringData={item.stringData}
              initTx={item.data}
              initCoin={item.coinbase}
              // propTxKeys={changePrev}
            />
          ))}{" "}
        </div>
      ) : (
        <div className={style.spinner}>
          <BeatLoader css={loaderCSS} size={72} color="green" loading />
        </div>
      )}{" "}
    </>
  );
};

export default Blockchain;
