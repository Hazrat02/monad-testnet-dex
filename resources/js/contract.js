import { ref, onMounted } from "vue";
import { ethers } from "ethers";

import { setWithTTL, removeKey, tokenPrice } from "./localstorage";
// const contractAddress = "0xA2b4117FEf6E40f73054a60B45552959f6476a68";
const contractAddress = "0x7721285afBB74f5f95E2a15ceB8fd189c61451bc";
const tokenAddress = "0x0000000000000000000000000000000000000000";

// Usage
const zero = '0x0000000000000000000000000000000000000000';      // "0x0000000000000000000000000000000000000000"
const max = 2 ^ 256 - 1;       // 2^256 - 1

const contractABI = [
  // Public variables (view)
  "function owner() view returns (address)",
  "function cmon() view returns (address)",
  "function nft() view returns (address)",
  "function greeting() view returns (string)",
  "function callFee() view returns (uint256)",
  "function totalTokenBalance(address) view returns (uint256)",

  // Greeting
  "function setGreeting(string _greeting) payable",

  // Withdraw
  "function withdrawETH()",
  "function withdrawToken(address _token)",
  "function withdrawWmon()",

  // Deposit
  "function deposit(address _token, uint256 _amount)",
  "function depositWmon(uint256 _amount)",
  "function depositOwner(address _token, uint256 _amount)",

  // Swap
  "function swapWmon() payable",
  "function swapOne(address tokenA, address tokenB, uint256 amount)",
  "function swap(address tokenA, address tokenB, uint256 amountA, uint256 amountB) payable",

  // Portfolio
  "function getUserPortfolio(address user) view returns (address[] tokens, uint256[] balances)",
  "function getContractPortfolio() view returns (address[] tokens, uint256[] balances)",
  "function getContractBalance(address _token) view returns (uint256)",

  // Token
  "function claimToken()",
  "function ownerMintToken(address to, uint256 amount)",
  "function getTimeUntilNextClaim(address user) view returns (uint256)",
  "function getLastClaim(address user) view returns (uint256)",

  // NFT
  "function mintUserNFT()",
  "function ownerMintNFT(address to)",

  // Events
  "event TokenClaimed(address indexed user)",
  "event NFTMinted(address indexed user)",
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
const callFee = ref("0.002");
// const tokenAddress = ref("");
const tokenA = ref("");
const tokenB = ref("");
const amountA = ref(0);
const swapRate = ref(0);
const NextClaim = ref(24 * 60 * 60);

const userPortfolio = ref([]);
const contractPortfolio = ref([]);







async function connectWallet(walletName) {
  ActionModal.open("Connecting", "Accept connection request in the wallet", 'load')

  const modalEl = document.getElementById('staticBackdrop')
  if (modalEl) {
    const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl)
    modal.hide()
  }





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

    tokenPrice.value = '';
    account.value = await signer.getAddress();


    setWithTTL('address', { account: account.value, platform: walletName });

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
    greeting.value = await contract.greeting();
    callFee.value = (await contract.callFee()).toString();
    const time = await contract.getLastClaim(account.value);

    const balance = await contract.totalTokenBalance('0x0290377d81c20F6347dbA71F5ca5d00316c8f33d');
    console.log('dsd', balance);

    NextClaim.value = Number(time);
    connected.value = true;
    ActionModal.close()



  } catch (err) {
    console.error("Wallet connection failed:", err);
  }
}








function disconnectWallet() {
  tokenPrice.value = ''
  provider = null;
  signer = null;
  contract = null;
  account.value = "";
  greeting.value = "";
  callFee.value = "";
  connected.value = false;
  removeKey('address');
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

//   async function deposit(tokenAddress, amount) {
//   const erc20 = new ethers.Contract(
//     tokenAddress,
//     ["function approve(address spender, uint256 amount) public returns (bool)"],
//     signer
//   );

//   // Approve before deposit
//   const weiAmount = ethers.parseUnits(amount.toString(), 18); // assumes token has 18 decimals
//   await erc20.approve(contractAddress, weiAmount);

//   const tx = await contract.deposit(tokenAddress, amount);
//   await tx.wait();
// }

async function deposit(tokenAddress, amount) {
  // Get signer
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  // Create ERC20 contract
  const erc20 = new ethers.Contract(
    tokenAddress,
    [
      "function approve(address spender, uint256 amount) public returns (bool)",
      "function decimals() view returns (uint8)"
    ],
    signer
  );

  // Fetch token decimals dynamically
  const decimals = await erc20.decimals();

  // Convert to correct wei amount
  const weiAmount = ethers.parseUnits(amount.toString(), decimals);

  // Approve
  let tx = await erc20.approve(contractAddress, weiAmount);
  await tx.wait();

  // Deposit (use weiAmount, not amount)
  tx = await contract.deposit(tokenAddress, weiAmount);
  await tx.wait();

  console.log(`Deposited ${amount} ${tokenAddress}`);
}




async function swapToken(tokenA, tokenB, amountA, amountB) {
  ActionModal.open("Swapping", "Accept all request in the wallet", 'load')

  try {
    const decimalsA = tokenA === zero ? 18 : await getDecimals(tokenA);
    const decimalsB = tokenB === zero ? 18 : await getDecimals(tokenB);
    // const decimalsA = tokenA === zero ? 18 : 18;
    // const decimalsB = tokenB === zero ? 18 : 18;

    const parsedAmountA = ethers.parseUnits(amountA.toString(), decimalsA);
    const parsedAmountB = ethers.parseUnits(amountB.toString(), decimalsB);

    // Approve ERC20 tokenA if not native
    if (tokenA !== zero) {
      const tokenAContract = new ethers.Contract(tokenA, ["function approve(address spender, uint256 amount) public returns (bool)",
        "function allowance(address owner, address spender) public view returns (uint256)"], signer);
      const allowance = await tokenAContract.allowance(await signer.getAddress(), contractAddress);
      if (allowance < parsedAmountA) {
        const approveTx = await tokenAContract.approve(contractAddress, ethers.MaxUint256);
        await approveTx.wait();
        console.log("TokenA approved");
      }
    }

    // Call swap
    const tx = await contract.swap(
      tokenA,
      tokenB,
      parsedAmountA,
      parsedAmountB,
      { value: tokenA === zero ? parsedAmountA : 0 }
    );
    await tx.wait();
    ActionModal.open("Success", "Swap successful!", 'success')
    return true

  } catch (err) {
    console.log(err)
    let reason = "Transaction failed";

    // Try to extract reason safely
    if (err.reason) {
      reason = err.reason;
    } else if (err.error && err.error.message) {
      reason = err.error.message;
    } else if (err.shortMessage) {
      reason = err.shortMessage;
    } else if (err.cause && err.cause.reason) {
      reason = err.cause.reason;
    } else if (err.message) {
      reason = err.message;
    }

    ActionModal.open("Failed", reason, 'error')
    return false
  }

}

// Helper to get ERC20 decimals
async function getDecimals(tokenAddress) {
  const erc20 = new ethers.Contract(tokenAddress, ["function decimals() view returns (uint8)"], signer);
  return await erc20.decimals();
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
  const amount = '1'
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

async function MintNft() {
  try {
    // Convert to wei
    const weiAmount = ethers.parseEther("0.25");

    // Call the fallback/receive function with MON
    const tx = await signer.sendTransaction({
      to: contractAddress,
      value: weiAmount,
    });



    await tx.wait();
  } catch (err) {
    console.error("MON deposit failed:", err);
  }



  try {
    const tx = await contract.mintUserNFT(); // no amount param needed
    await tx.wait();
    console.log("NFT minted successfully!");
  } catch (err) {
    console.error("NFT mint failed:", err);
  }
}


async function MintNftOwner(address) {



  try {
    const tx = await contract.ownerMintNFT(address); // no amount param needed
    await tx.wait();
    console.log("NFT minted successfully!");
  } catch (err) {
    console.error("NFT mint failed:", err);
  }
}

async function MintToken() {
  ActionModal.open("CMon Minting..", "Accept Minting request in the wallet", 'load')


  try {
    const tx = await contract.claimToken(); // no amount param needed
    await tx.wait();
    NextClaim.value = 24 * 60 * 60;
    ActionModal.open("Success", "Cmon minted successfully!", 'success')

  } catch (err) {
    console.error("Cmon mint failed:", err);
    ActionModal.open("Failed", "Cmon mint failed!Try again.", 'error')

  }


}
async function MintTokenOwner(address, amount) {
  ActionModal.open("CMon Minting..", "Accept Minting request in the wallet", 'load')

  const parsedAmountA = ethers.parseUnits(amount.toString(), 18);

  try {
    const tx = await contract.ownerMintToken(address, parsedAmountA); // no amount param needed
    await tx.wait();

    ActionModal.open("Success", "Cmon minted successfully!", 'success')

  } catch (err) {
    console.error("Cmon mint failed:", err);
    ActionModal.open("Failed", "Cmon mint failed!Try again.", 'error')

  }


}

export {
  MintTokenOwner,
  contract,
  provider,
  MintToken,
  NextClaim,
  MintNft,
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

};
