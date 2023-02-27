"use client"; // this is a client component 👈🏽

import { Contract, providers, utils } from "ethers";
import Head from "next/head";
import React from "react";
import { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import { abi, CONTRACT_ADDRESS } from "./constants";
import { Button, Menu, Typography, useTheme } from "@mui/material";
import styles from "./page.module.scss";
import "@/styles/Component.module.scss";

//import "./component.scss";
import "@/styles/Hoome.module.scss";
import BasicGrid from "./Grid_ly";

// import "./component.scss";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
// import "/src/app/components.scss";

const Card = (props) => {
  const [Candidates, setCandidates] = useState([]);
  const [voteMade, setVoteMade] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const web3ModalRef = useRef();
  const makevote = async (address) => {
    try {
      const signer = await getProviderOrSigner(true);
      const collegeContract = new Contract(CONTRACT_ADDRESS, abi, signer);
      let add = address.toNumber();
      const transaction = await collegeContract.makevote(add);
      setVote(true);
      await transaction.wait();
      window.alert("You successfully voted");
    } catch (err) {
      console.error(err);
    }
  };

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 31337) {
      window.alert("Change the network to hyperspace tesnet");
      throw new Error("Change network to hyperspace testnet");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "Ethereum Mainnet",
        providerOptions: {},
        disableInjectedProvider: false,
      });

      connectWallet();
      getCandidates();
    }
  }, [walletConnected]);

  const getCandidates = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const collegeContract = new Contract(CONTRACT_ADDRESS, abi, signer);
      const candidates = await collegeContract.returnCandidates();
      setCandidates(candidates);
    } catch (error) {
      console.log(error);
    }
  };

  const renderButton = () => {
    if (!voteMade) {
      return (
        <button
          onClick={() => makevote(props.uid)}
          className={styles.buttonwhite}
        >
          VOTE
        </button>
      );
    }
    if (voteMade) {
      return (
        <button disabled className={styles.button}>
          VOTED
        </button>
      );
    }
  };

  return (
    <div>
      <Box
        flexGrow={1}
        style={{
          // border: "2px solid blue",
          padding: "1%",
          margin: "1%",
        }}
      >
        <Grid container columnSpacing={2} rowSpacing={2} className="card-cards">
          <Grid item xs={12} md={4} sm={4}>
            <Box
              style={{
                color: "black",
              }}
              display="flex"
              justifyContent="center"
              alignContent="center"
            >
              <img
                src={props.image}
                alt="mabata"
                style={{
                  backgroundColor: "white",
                  margin: "5%",
                  border: "2px solid #141b2d",
                  width: "11rem",
                  borderRadius: "50% ",
                  padding: "10%",
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6} sm={6}>
            <Box
              style={{
                color: "black",
                // paddingTop: "5%",
              }}
              display="flex"
              justifyContent="start"
            >
              <h1>NAME : {props.title}</h1>
            </Box>

            <Box
              style={{
                color: "black",
                paddingTop: "10px",
              }}
              className="card-text"
            >
              <Box
                style={{
                  paddingLeft: "4px",
                  paddingTop: "15px",
                }}
              >
                <p>
                  {" "}
                  <strong>POSITION</strong> : {props.disc1}
                </p>
              </Box>

              <Box
                style={{
                  paddingLeft: "4px",
                  paddingTop: "15px",
                }}
              >
                <p>
                  <strong>COLLEGE :</strong> {props.college}
                </p>
              </Box>

              <Box
                display="flex"
                justifyContent="spaceBetween"
                paddingTop="20px"
                className={styles.paddingButton}
              >
                <Box>{renderButton()}</Box>

                <Box className={styles.votingDisplay}>
                  <h1>{props.votes.toNumber()}</h1>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Card;
