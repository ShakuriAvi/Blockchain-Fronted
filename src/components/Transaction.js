import React, { useState, useEffect } from "react";
import style from "../style/Keys.Module.css";
import CoinTransaction from "./CoinTransaction";
import * as secp from "noble-secp256k1";
import SHA256 from "crypto-js/sha256";

function getRandomString(length) {
  var randomChars =
    "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e";
  console.log(randomChars.length);
  var result = "";
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }
  console.log("result : " + result);
  return result;
}

function Transaction() {
  const [flagChangeField, setFlagChangeField] = useState(false);
  const [compute, setCompute] = useState();
  const [privKey, setPrivKey] = useState(
    localStorage.getItem("privKey") ||
      "9947223435618113894447185862823559075621607340267964844941537471"
  );
  const [dollar, setDollar] = useState(
    localStorage.getItem("dollar") || "25.00"
  );
  const [destination, setDestination] = useState(
    localStorage.getItem("destination") ||
      "04cc955bf8e359cc7ebbb66f4c2dc616a93e8ba08e93d27996e20299ba92cba9cbd73c2ff46ed27a3727ba09486ba32b5ac35dd20c0adec020536996ca4d9f3d74"
  );

  const [isSigned, setSigned] = useState(true);

  const [pubKey, setPublicKey] = useState(() => {
    return secp.getPublicKey(privKey);
  });
  const [signatureVerify, setSignatureVerify] = useState("");
  const [signature, setSignature] = useState("");


  const handleChange = (e) => {
    console.log(e.target.id);
    if (e.target.id === "from") {
      setPublicKey(e.target.value);
    } else if (e.target.id === "dollar") {
      setDollar(e.target.value);
    } else if (e.target.id === "to") {
      setDestination(e.target.value);
    }else{
      setSignatureVerify(e.target.value);
    }
  };

  const randomClick = (e) => {
    setPrivKey(getRandomString(64));
  };
  const clickOnSign = () => {
    let tempMessage = SHA256(dollar + pubKey + destination).toString();
    console.log(
      " dollar : " +
        dollar +
        " pubKey: " +
        pubKey +
        " destination : " +
        destination
    );
    //console.log(secp.sign(tempMessage, privKey));
    console.log("sign : " + pubKey);
    secp.sign(tempMessage, privKey).then((result) =>
      setCompute({
        result,
      })
    );
  };
  const clickOnVerify = (e) => {
    if (
      pubKey !== secp.getPublicKey(privKey) ||
      signatureVerify !== signature ||
      signatureVerify === ""
    ) {
      console.log(signatureVerify.length);
      console.log(pubKey.length);
      setSigned(false);
    } else {
      let tempMessage = SHA256(dollar + pubKey + destination).toString();
          console.log(
            " dollar : " +
              dollar +
              " pubKey: " +
              pubKey +
              " destination : " +
              destination
          );
      setSigned(secp.verify(signatureVerify, tempMessage, pubKey));
    }
  };

  useEffect(() => {
      setPublicKey(secp.getPublicKey(privKey));
      localStorage.setItem("privKey", privKey);
    }, [privKey]);

      useEffect(() => {
        localStorage.setItem("pubKey", pubKey);
      }, [pubKey]);

 useEffect(() => {
   localStorage.setItem("dollar", dollar);
 }, [dollar]);

  useEffect(() => {
    localStorage.setItem("destination", destination);
  }, [destination]);

   useEffect(()=>{
      console.log("signature");
      setSignatureVerify(signature)
    },[signature])


useEffect(() => {
 console.log("isSigned: " + isSigned);
}, [isSigned]);


  useEffect(() => {
    const arr = [];
    console.log(compute);
    if (compute !== undefined) {
      console.log(compute.result.toString());
      let temp = JSON.stringify(compute.result.toString());
      console.log(temp);
      temp = temp.split('"').join("");
      console.log(temp);
      setSignature(temp);
      // special case when signatureVerify change and signature not
      if (signatureVerify !== signature) {
        setSignatureVerify(signature);
      }
      setPublicKey(secp.getPublicKey(privKey));
      setSigned(true);
    } else {
      setSignature("");
    }
  }, [compute]);

  return (
    <div>
      <h1>Transaction</h1>
      <div className={style.pageContainer}>
        <div className={style.border}>
          <h2 className={style.labelData}>Sign</h2>

          <div>
            {/* <label className={style.labelData}>Message</label> */}
            <CoinTransaction
              dollar={dollar}
              from={pubKey}
              to={destination}
              prop={handleChange}
            />
          </div>
          <br />
          <div>
            <label className={style.labelData}>Private Key</label>
            <input
              id="privKey"
              className={style.textareaMedium}
              value={privKey}
              disabled
            ></input>
            <button className={style.button} onClick={randomClick}>
              Random
            </button>
          </div>
          <br />
          <button className={style.signButton} onClick={clickOnSign}>
            Sign
          </button>

          <div>
            <label className={style.labelData}>
              Signature
              <input
                className={style.textareaMedium}
                disabled={true}
                value={signature}
              ></input>
            </label>
          </div>
          <br />
        </div>
        <div className={isSigned ? style.border : style.redborder}>
          <h2 className={style.labelData}>Verify</h2>

          <div>
            <CoinTransaction
              dollar={dollar}
              from={pubKey}
              to={destination}
              prop={handleChange}
            />
          </div>
          <br />
          <label className={style.labelData}>Signature</label>
          <input
            className={style.textareaMedium}
            value={signatureVerify}
            onChange={handleChange}
          ></input>
          <br />
          <button className={style.signButton} onClick={clickOnVerify}>
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}
export default Transaction;
