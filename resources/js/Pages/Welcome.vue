<script setup>
import { ref, onMounted } from "vue";
import { ethers } from "ethers";

const contractAddress = "0xA6a1ff9Cc47431BAA4Bd59d2EB27c63E218c0B3F";
const tokenAddress = "0x0000000000000000000000000000000000000000";

// ABI: only include the functions/events you need now (excluding swap)
// const contractABI = [
//   "function greeting() view returns (string)",
//   "function callFee() view returns (uint256)",
//   "function setGreeting(string _greeting) payable",
//   "function withdrawETH()",
//   "function withdrawToken(address _token)",
//   "function withdrawWmon()",
//   "function deposit(address _token, uint256 _amount)",
//   "function depositWmon(uint256 _amount)",
//   "function depositOwner(address _token, uint256 _amount)",
//   "event Deposited(address indexed from, address token, uint256 amount)",
// ];

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


async function connectWallet() {
  if (!window.ethereum) {
    alert("Please install MetaMask!");
    return;
  }

  try {
    // -------------------------
    // 1) Request account access
    // -------------------------
    provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = await provider.getSigner();
    account.value = await signer.getAddress();

    // -------------------------
    // 2) Ensure Monad Testnet
    // -------------------------
    const chainIdHex = "0x279f"; // 10143 in hex
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainIdHex }],
      });
    } catch (e) {
      if (e.code === 4902) {
        await window.ethereum.request({
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
    // 3) Attach Contract
    // -------------------------
    contract = new ethers.Contract(contractAddress, contractABI, signer);

    greeting.value = await contract.greeting();
    callFee.value = (await contract.callFee()).toString();
    connected.value = true;
    await loadPortfolios()
  } catch (err) {
    console.error("Wallet connection failed:", err);
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
// async function approveToken(tokenAddress, contractAddress, amount) {
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
</script>



<template>
  <div class="p-6 space-y-4">
    <h1 class="text-xl font-bold">Gmonad Contract UI</h1>

    <!-- Connect -->
    <div>
      <button
        v-if="!connected"
        @click="connectWallet"
        class="bg-purple-500 text-white px-4 py-2 rounded"
      >
        Connect Wallet
      </button>
      <div v-else>
        <button
          @click="disconnectWallet"
          class="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Disconnect
        </button>

        <p><strong>Connected:</strong> {{ account }}</p>
      </div>
    </div>

    <template v-if="connected">
      <p><strong>Greeting:</strong> {{ greeting }}</p>
      <p><strong>Call Fee:</strong> {{ callFee }} wei</p>
      <input type="text" v-model="tokenAddress" placeholder="Token Address" />

      <!-- Greeting -->
      <div>
        <button
          @click="setGreeting('Hello Monad!')"
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Set Greeting
        </button>
      </div>

      <!-- Withdraw -->
      <div class="space-x-2">
        <button
          @click="withdrawETH"
          class="bg-red-500 text-white px-4 py-2 rounded"
        >
          Withdraw ETH
        </button>
        <button
          @click="withdrawWmon"
          class="bg-red-500 text-white px-4 py-2 rounded"
        >
          Withdraw WMON
        </button>
        <button
          @click="depositMON(1)"
          class="bg-purple-500 text-white px-4 py-2 rounded"
        >
          Deposit 1 MON
        </button>
      </div>

      <!-- Deposit -->
      <div>
        <button
          @click="deposit(tokenAddress, 1)"
          class="bg-green-500 text-white px-4 py-2 rounded"
        >
          Deposit 1 Token
        </button>
        <button
          @click="depositWmon(1)"
          class="bg-green-500 text-white px-4 py-2 rounded ml-2"
        >
          Deposit 1 WMON
        </button>
        <button
          @click="swapWmon"
          class="bg-green-500 text-white px-4 py-2 rounded ml-2"
        >
          swap WMON
        </button>
        <button
          @click="swapToken('0x0F0BDEbF0F83cD1EE3974779Bcb7315f9808c714','0x0000000000000000000000000000000000000000',1)"
          class="bg-green-500 text-white px-4 py-2 rounded ml-2"
        >
          swap One
        </button>
      </div>

      <!-- Swap -->
      <div class="mt-4 space-y-2">
        <input type="text" v-model="tokenA" placeholder="Token A Address" class="border p-1" />
        <input type="text" v-model="tokenB" placeholder="Token B Address" class="border p-1" />
        <input type="number" v-model="amountA" placeholder="Amount A" class="border p-1" />
        <input type="number" v-model="swapRate" placeholder="Rate (scaled to 1e18)" class="border p-1" />
        <button @click="swapTokens" class="bg-yellow-500 text-white px-4 py-2 rounded">Swap</button>
      </div>

      <!-- Portfolios -->
      <div class="mt-4">
        <h2 class="font-bold">User Portfolio</h2>
        <ul>
          <li v-for="(item,i) in userPortfolio" :key="i">{{ item.token }}: {{ item.balance }}</li>
        </ul>

        <h2 class="font-bold mt-2">Contract Portfolio</h2>
        <ul>
          <li v-for="(item,i) in contractPortfolio" :key="i">{{ item.token }}: {{ item.balance }}</li>
        </ul>
      </div>
    </template>
  </div>
</template>

<!-- <script setup>
import { ref } from "vue";
import { ethers } from "ethers";

const account = ref(null);
const balance = ref(null);
const error = ref(null);

let provider; // ethers provider
let signer;   // wallet signer

// Monad testnet RPC provider
const rpcProvider = new ethers.JsonRpcProvider("https://docs-demo.monad-testnet.quiknode.pro/");

const connectWallet = async () => {
  try {
    if (!window.ethereum) throw new Error("No wallet found");

    // Request access to accounts
    await window.ethereum.request({ method: "eth_requestAccounts" });
    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();

    // Get connected account
    account.value = await signer.getAddress();

    // Fetch balance for connected account
    const rawBalance = await rpcProvider.getBalance(account.value, "latest");
    balance.value = ethers.formatEther(rawBalance); // Convert wei → WMON
  } catch (err) {
    error.value = err.message;
  }
};
</script>

<template>
  <div class="p-4 space-y-4">
    <button @click="connectWallet" class="px-4 py-2 rounded bg-black text-white">
      Connect Wallet
    </button>

    <div v-if="account">
      <p>Connected Wallet: {{ account }}</p>
      <p>Balance: {{ balance }} WMON</p>
    </div>

    <p v-if="error" class="text-red-500">Error: {{ error }}</p>
  </div>
</template> -->
