import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Card from "./card";
//import "./home.scss";
import "@/styles/Hoome.module.scss";
import { Contract, providers, utils } from "ethers";
import { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import { abi, CONTRACT_ADDRESS } from "./constants";
import { Button, Menu, Typography, useTheme } from "@mui/material";
//import "./component.scss";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function BasicGrid() {
  const [Candidates, setCandidates] = useState([]);
  const [voteMade, setVoteMade] = useState(false);
  const web3ModalRef = useRef();
  const [walletConnected, setWalletConnected] = useState(false);

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
  }, [walletConnected, voteMade]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {Candidates.map((cand) => (
          <Grid item xs={12} md={6}>
            <Card
              image="/IMG-20221014-WA0023.jpg"
              title={cand.firstName}
              disc1={cand.position}
              uid={cand.cand_id}
              votes={cand.votes}
              college={cand.college}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
