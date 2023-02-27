"use client"; // this is a client component 👈🏽
import { Contract, providers, utils } from "ethers";
import Head from "next/head";
import React from "react";
import { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import { abi, CONTRACT_ADDRESS } from "./constants";
import { Box, Button, Menu, Typography, useTheme } from "@mui/material";
import styles from "src/app/page.module.scss";
import BasicGrid from "./Grid_ly";
import Link from "next/link";

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const web3ModalRef = useRef();

  const makevote = async (address) => {
    try {
      const signer = await getProviderOrSigner(true);
      const collegeContract = new Contract(CONTRACT_ADDRESS, abi, signer);
      const transaction = await collegeContract.makevote(address);

      setLoading(true);
      await transaction.wait();
      setLoading(false);
      window.alert("You successfully voted");
    } catch (err) {
      console.error(err);
    }
  };

  /*
      connectWallet: Connects the MetaMask wallet
    */
  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * getOwner: calls the contract to retrieve the owner
   */
  const getOwner = async () => {
    try {
      const provider = await getProviderOrSigner();

      const nftContract = new Contract(CONTRACT_ADDRESS, abi, provider);

      const _owner = await nftContract.i_owner();

      const signer = await getProviderOrSigner(true);

      const address = await signer.getAddress();
      if (address.toLowerCase() === _owner.toLowerCase()) {
        setIsOwner(true);
      }
    } catch (err) {
      console.error(err.message);
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

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "Ethereum Mainnet",
        providerOptions: {},
        disableInjectedProvider: false,
      });

      connectWallet();
    }
  }, [walletConnected, loading]);

  const renderButton = () => {
    if (!walletConnected) {
      return (
        <button onClick={connectWallet} className={styles.button}>
          Connect your wallet
        </button>
      );
    }

    if (loading) {
      return <button className={styles.button}>Loading...</button>;
    }

    if (walletConnected) {
      return (
        <div>
          <div className={styles.connected}>Connected!</div>
        </div>
      );
    }
  };

  return (
    <div>
      <Head>
        <title>PUBLIC VOTING</title>
        <meta name="description" content="Whitelist-Dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        display="flex"
        justifyContent="space-between"
        className={styles.navbox}
      >
        <Box className={styles.univesal}>
          <h1>
            <span>UNI</span>-<span>VERSAL</span>
          </h1>
        </Box>
      </Box>
      <div className={styles.main}>
        <div>
          <h1 className={styles.title}>Welcome to UNIVERSAL</h1>
          <div className={styles.description}>
            Its platform where people make choices via votes
          </div>

          <div className={styles.description}>0 have been voted</div>
          {renderButton()}
        </div>
        <div>
          <img className={styles.image} src="/images.jpeg" />
        </div>
      </div>

      <section className="team-section shadow-lg p-5">
        <Box display="flex" justifyContent="start" className="pt-5 ps-5">
          <Typography color="black" variant="h1">
            {/* What is vote_universal */}
          </Typography>
        </Box>
        <div className="team-row">
          <BasicGrid />
        </div>
      </section>

      <footer className={styles.footer}>
        Made with &#10084; by marengaJulius
      </footer>
    </div>
  );
}
