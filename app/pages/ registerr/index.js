"use client"; // this is a client component 👈🏽
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Web3Modal from "web3modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import styles from "../page.module.scss";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { abi, CONTRACT_ADDRESS } from "../constants";
import { useEffect, useRef, useState } from "react";
import { Contract, providers, utils } from "ethers";

const theme = createTheme();

export default function Registration() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const web3ModalRef = useRef();

  function makeStorageClient() {
    return new Web3Storage({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDAzYTg2NERGZTM4OTA3NzA0MzNFMWVjNjU0MjUxYjBBM2Y5MGY0NzYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Njk1Mjk0MzUwMTYsIm5hbWUiOiJib2tlZSJ9.cWkPaWS7m_-bNdk76LsVJpiwoYepOEIFMWK0Fp1UiLU",
    });
  }
  const client = makeStorageClient();

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let fname = data.get("fname");
    let lname = data.get("lname");
    let college = data.get("college");
    let position = data.get("position");
    let file = data.get("photo");
    let year = new Date();
    year = year.getFullYear();
    const cid = await client.put(file);

    const signer = await getProviderOrSigner(true);
    const collegeContract = new Contract(CONTRACT_ADDRESS, abi, signer);
    const transaction = await collegeContract.registerCandidate(
      fname,
      lname,
      college,
      year,
      position
    );

    await transaction.wait();
    window.alert("transaction confirmed");
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

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "Ethereum Mainnet",
        providerOptions: {},
        disableInjectedProvider: false,
      });

      connectWallet();
    }
  }, [walletConnected]);

  return (
    <ThemeProvider theme={theme}>
      <Container className={styles.form} component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}></Avatar>
          <Typography component="h1" variant="h5" sx={{ color: "black" }}>
            Register Candidate
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="fname"
              label="First Name"
              name="fname"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lname"
              label="Last Name"
              name="lname"
              autoComplete="lname"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="pos"
              label="Position"
              name="position"
              autoComplete="pos"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="college"
              label="College"
              id="college"
              autoComplete="col"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
