import { ref, onMounted } from "vue";
import { ethers } from "ethers";
import { setWithTTL,getWithTTL  } from "./localstorage";
const contractAddress = "0xA6a1ff9Cc47431BAA4Bd59d2EB27c63E218c0B3F";
const tokenAddress = "0x0000000000000000000000000000000000000000";



const contractABI = [
  "function greeting() view returns (string)",
  "function callFee() view returns (uint256)",
  "function setGreeting(string _greeting) payable",
  "function withdrawETH()",
  "function withdrawToken(address _token)",
  "function withdrawWmon()",
  "function deposit(address _token, uint256 _amount)",
  "function depositWmon(uint256 _amount)",
  "function depositOwner(address _token, uint256 _amount)",
  "function swap(address tokenA, address tokenB, uint256 amountA, uint256 rate) payable",
  "function swapWmon() external payable",
  "function swapOne(address tokenA, address tokenB, uint256 amount) external",
  "function getUserPortfolio(address user) view returns (address[] memory, uint256[] memory)",
  "function getContractPortfolio() view returns (address[] memory, uint256[] memory)",
  "event Deposited(address indexed from, address token, uint256 amount)",
  "event Swapped(address indexed user, address tokenA, address tokenB, uint256 amountA, uint256 amountB)"
];

// Minimal ERC20 ABI for approve/allowance
const ERC20ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function balanceOf(address account) external view returns (uint256)",
  "function decimals() view returns (uint8)"
];

let provider;
let signer;
let contract;




// const greeting = ref("");
// const callFee = ref("");
// const account = ref("");
// const connected = ref("");


const connected = ref(false);
const account = ref("");
const greeting = ref("");
const callFee = ref("");
// const tokenAddress = ref("");
const tokenA = ref("");
const tokenB = ref("");
const amountA = ref(0);
const swapRate = ref(0);

const userPortfolio = ref([]);
const contractPortfolio = ref([]);


//  onMounted(() => {
//  if (getWithTTL('address')) {
// provider = getWithTTL('provider')
// signer = getWithTTL('signer')
// contract = getWithTTL('contract')
//  connected.value = true;
// //  connectWallet(getWithTTL('address').platform)


//  } 


// });

//   async function connectWallet(wallet_name) {
//   if (!window.ethereum) {
//     alert("Please install MetaMask!");
//     return;
//   }

//   try {
//     // -------------------------
//     // 1) Request account access
//     // -------------------------
//     provider = new ethers.BrowserProvider(window.ethereum);
//     await provider.send("eth_requestAccounts", []);
//     signer = await provider.getSigner();
//     account.value = await signer.getAddress();

//     // -------------------------
//     // 2) Ensure Monad Testnet
//     // -------------------------
//     const chainIdHex = "0x279f"; // 10143 in hex
//     try {
//       await window.ethereum.request({
//         method: "wallet_switchEthereumChain",
//         params: [{ chainId: chainIdHex }],
//       });
//     } catch (e) {
//       if (e.code === 4902) {
//         await window.ethereum.request({
//           method: "wallet_addEthereumChain",
//           params: [
//             {
//               chainId: chainIdHex,
//               chainName: "Monad Testnet",
//               rpcUrls: ["https://testnet-rpc.monad.xyz"],
//               nativeCurrency: {
//                 name: "MON",
//                 symbol: "MON",
//                 decimals: 18,
//               },
//               blockExplorerUrls: ["https://testnet.monadexplorer.com"],
//             },
//           ],
//         });
//       } else {
//         throw e;
//       }
//     }

//     // -------------------------
//     // 3) Attach Contract
//     // -------------------------
//     contract = new ethers.Contract(contractAddress, contractABI, signer);

//     greeting.value = await contract.greeting();
//     callFee.value = (await contract.callFee()).toString();
//     connected.value = true;
//     await loadPortfolios()
//   } catch (err) {
//     console.error("Wallet connection failed:", err);
//   }
// }






async function connectWallet(walletName) {
  try {
    if (!window.ethereum) {
      alert("Please install an EVM wallet!");
      return;
    }

    let ethProvider;

    switch (walletName.toLowerCase()) {
      case "metamask":
        if (!window.ethereum.isMetaMask) alert("MetaMask not found!");
        ethProvider = window.ethereum;
        break;

      case "bitget":
        if (!window.bitkeep?.ethereum) alert("Bitget wallet not found!");
        ethProvider = window.bitkeep.ethereum;
        break;

      // case "coinbase":
      //   if (!window.ethereum.isCoinbaseWallet) alert("Coinbase Wallet not found!");
      //   ethProvider = window.ethereum;
      //   break;

      // case "rainbow":
      //   // Rainbow injects a normal ethereum provider, check for window.ethereum
      //   ethProvider = window.ethereum;
      //   break;

      default:
        alert("Unsupported wallet!");
        return;
    }

    // -------------------------
    // Connect provider
    // -------------------------
    provider = new ethers.BrowserProvider(ethProvider);
    await provider.send("eth_requestAccounts", []);
    signer = await provider.getSigner();
    const account = await signer.getAddress();
console.log('provider',provider)
console.log('signer',signer)
console.log('account',account)
setWithTTL('address',{ account: account, platform: walletName } );

//     // -------------------------
    // Ensure Monad Testnet
    // -------------------------
    const chainIdHex = "0x279f"; // 10143
    try {
      await ethProvider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainIdHex }],
      });
    } catch (e) {
      if (e.code === 4902) {
        await ethProvider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: chainIdHex,
              chainName: "Monad Testnet",
              rpcUrls: ["https://testnet-rpc.monad.xyz"],
              nativeCurrency: {
                name: "MON",
                symbol: "MON",
                decimals: 18,
              },
              blockExplorerUrls: ["https://testnet.monadexplorer.com"],
            },
          ],
        });
      } else {
        throw e;
      }
    }

    // -------------------------
    // Attach Contract
    // -------------------------
    contract = new ethers.Contract(contractAddress, contractABI, signer);
    // setWithTTL('contract',contract );

    greeting.value = await contract.greeting();
    callFee.value = (await contract.callFee()).toString();
    
    connected.value = true;
    // await loadPortfolios();


    console.log(`${walletName} connected:`, account);

  } catch (err) {
    console.error("Wallet connection failed:", err);
  }
}




async function isConnected() {
  try {
    if (!provider) return false;

    const accounts = await provider.send("eth_accounts", []);
    return accounts && accounts.length > 0;
  } catch (err) {
    console.error("Failed to check connection:", err);
    return false;
  }
}



function disconnectWallet() {
  provider = null;
  signer = null;
  contract = null;
  account.value = "";
  greeting.value = "";
  callFee.value = "";
  connected.value = false;
}


// -----------------------------------
// Contract Calls
// -----------------------------------
  async function setGreeting(newGreeting) {
  const fee = await contract.callFee();
  const tx = await contract.setGreeting(newGreeting, { value: fee });
  await tx.wait();
  greeting.value = await contract.greeting();
}

  async function withdrawETH() {
  const tx = await contract.withdrawETH();
  await tx.wait();
}

  async function withdrawToken(tokenAddress) {
  const tx = await contract.withdrawToken(tokenAddress);
  await tx.wait();
}

  async function withdrawWmon() {
  const tx = await contract.withdrawWmon();
  await tx.wait();
}

  async function deposit(tokenAddress, amount) {
  const erc20 = new ethers.Contract(
    tokenAddress,
    ["function approve(address spender, uint256 amount) public returns (bool)"],
    signer
  );

  // Approve before deposit
  const weiAmount = ethers.parseUnits(amount.toString(), 18); // assumes token has 18 decimals
  await erc20.approve(contractAddress, weiAmount);

  const tx = await contract.deposit(tokenAddress, amount);
  await tx.wait();
}
//   async function approveToken(tokenAddress, contractAddress, amount) {
//   const token = new ethers.Contract(tokenAddress, ERC20ABI, signer);
//   const decimals = await token.decimals();
//   const value = ethers.parseUnits(amount.toString(), decimals);

//   const tx = await token.approve(contractAddress, value);
//   await tx.wait();
// }

  async function swapToken(tokenA, tokenB, amount) {
  const token = new ethers.Contract(tokenA, ERC20ABI, signer);
  const decimals = await token.decimals();
  const value = ethers.parseUnits(amount.toString(), decimals);

  // First approve tokenA for swap
  // const approveTx = await token.approve(contract.target, value);
  const approveTx = await token.approve(contractAddress, value);
  await approveTx.wait();

  // Now swap
  const swapTx = await contract.swapOne(tokenA, tokenB, value);
  await swapTx.wait();

}


  async function depositWmon(amount) {
  const wmonAddress = "0x760AfE86e5de5fa0Ee542fc7B7B713e1c5425701";

  const erc20 = new ethers.Contract(
    wmonAddress,
    ["function approve(address spender, uint256 amount) public returns (bool)"],
    signer
  );

  const weiAmount = ethers.parseUnits(amount.toString(), 18);
  await erc20.approve(contractAddress, weiAmount);

  const tx = await contract.depositWmon(amount);
  await tx.wait();
}
  async function swapWmon() {
  const wmonAddress = "0x760AfE86e5de5fa0Ee542fc7B7B713e1c5425701";
const amount ='1'
  const erc20 = new ethers.Contract(
    wmonAddress,
    ["function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function balanceOf(address account) external view returns (uint256)",
  "function decimals() view returns (uint8)"],
    signer
  );

  const weiAmount = ethers.parseUnits(amount.toString(), 18);
  await erc20.approve(contractAddress, weiAmount);

  const tx = await contract.swapWmon({ value: 0 }); // if your function has payable
  await tx.wait();
}
  async function depositMON(amount) {
  try {
    // Convert to wei
    const weiAmount = ethers.parseUnits(amount.toString(), 18);

    // Call the fallback/receive function with MON
    const tx = await signer.sendTransaction({
      to: contractAddress,
      value: weiAmount,
    });

    await tx.wait();
    console.log(`Deposited ${amount} MON successfully`);
  } catch (err) {
    console.error("MON deposit failed:", err);
  }
}

  async function depositOwner(tokenAddress, amount) {
  const erc20 = new ethers.Contract(
    tokenAddress,
    ["function approve(address spender, uint256 amount) public returns (bool)"],
    signer
  );

  const weiAmount = ethers.parseUnits(amount.toString(), 18);
  await erc20.approve(contractAddress, weiAmount);

  const tx = await contract.depositOwner(tokenAddress, amount);
  await tx.wait();
}


// --------------------------
// Swap
// --------------------------
  async function swapTokens() {
  const fee = await contract.callFee();
  const weiAmountA = ethers.parseUnits(amountA.value.toString(), 18);

  // Approve tokenA
  const erc20 = new ethers.Contract(
    tokenA.value,
    ["function approve(address spender, uint256 amount) public returns (bool)"],
    signer
  );
  await erc20.approve(contractAddress, weiAmountA);

  // Call swap
  const tx = await contract.swap(tokenA.value, tokenB.value, amountA.value, swapRate.value, { value: fee });
  await tx.wait();
}

// --------------------------
// Load portfolios
// --------------------------
  async function loadPortfolios() {
  if (!connected.value) return;

  const [userTokens, userBalances] = await contract.getUserPortfolio(account.value);


  const [contractTokens, contractBalances] = await contract.getContractPortfolio();

  userPortfolio.value = userTokens.map((t, i) => ({
    token: t,
    balance: userBalances[i].toString()
  }));

  contractPortfolio.value = contractTokens.map((t, i) => ({
    token: t,
    balance: contractBalances[i].toString()
  }));
}



export {
  connected,
  account,
  greeting,
  callFee,
  userPortfolio,
  contractPortfolio,
  tokenA,
  tokenB,
  amountA,
  swapRate,
  connectWallet,
  disconnectWallet,
  setGreeting,
  withdrawETH,
  withdrawToken,
  withdrawWmon,
  deposit,
  depositWmon,
  depositMON,
  depositOwner,
  swapToken,
  swapWmon,
  swapTokens,
  loadPortfolios,
  isConnected
};
