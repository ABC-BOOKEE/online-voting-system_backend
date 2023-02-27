exports.abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "c_id",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "totalVote",
        type: "uint256",
      },
    ],
    name: "afterVote",
    type: "event",
  },
  {
    inputs: [],
    name: "endElectionWithResults",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "firstName",
            type: "string",
          },
          {
            internalType: "string",
            name: "surName",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "Ref_year",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "college",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "votes",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "cand_id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "position",
            type: "string",
          },
        ],
        internalType: "struct CollegeVoting.Candidate",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "candidateAddress",
        type: "uint256",
      },
    ],
    name: "makevote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_college",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_year",
        type: "uint256",
      },
    ],
    name: "registerAsVoter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_firstName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_surName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_college",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_year",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_position",
        type: "string",
      },
    ],
    name: "registerCandidate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "votersWhitelistForElection",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "getCandWithId",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "firstName",
            type: "string",
          },
          {
            internalType: "string",
            name: "surName",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "Ref_year",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "college",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "votes",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "cand_id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "position",
            type: "string",
          },
        ],
        internalType: "struct CollegeVoting.Candidate",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "i_owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "returnCandidates",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "firstName",
            type: "string",
          },
          {
            internalType: "string",
            name: "surName",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "Ref_year",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "college",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "votes",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "cand_id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "position",
            type: "string",
          },
        ],
        internalType: "struct CollegeVoting.Candidate[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "User",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

exports.CONTRACT_ADDRESS = "0xa196769Ca67f4903eCa574F5e76e003071A4d84a";
