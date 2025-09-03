<script setup>
import { ref, computed } from "vue";
import { ethers } from "ethers";

const account = ref(null);
const chainOk = ref(false);

// 👇 Default tokens (change to what you want to swap)
const fromToken = ref("0x0000000000000000000000000000000000000000"); // Example ERC20
const toToken = ref("0x760AfE86e5de5fa0Ee542fc7B7B713e1c5425701"); // Example ERC20
const amount = ref("1"); // 👈 human-readable amount, e.g. "1" token (NOT in wei)

const quote = ref(null);
let provider, signer;

async function connect() {
  if (!window.ethereum) throw new Error("No wallet found");
  await window.ethereum.request({
    method: "wallet_requestPermissions",
    params: [{ eth_accounts: {} }],
  });
  provider = new ethers.BrowserProvider(window.ethereum);
  signer = await provider.getSigner();
  account.value = await signer.getAddress();

  // ✅ Ensure you're on Monad testnet
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
            nativeCurrency: { name: "MON", symbol: "MON", decimals: 18 },
            blockExplorerUrls: ["https://testnet.monadexplorer.com"],
          },
        ],
      });
    } else {
      throw e;
    }
  }
  chainOk.value = true;
}

async function fetchQuote() {
  // ⚠️ Replace with your Monorail App ID
  const url = new URL("https://testnet-pathfinder.monorail.xyz/v4/quote");
  url.searchParams.set("source", "2871175662697871"); // 👈 your app key here
  url.searchParams.set("from", fromToken.value);
  url.searchParams.set("to", toToken.value);
  url.searchParams.set("amount", amount.value);
  url.searchParams.set("sender", account.value);
  url.searchParams.set("max_slippage", '10');

  const res = await fetch(url);
  return await res.json();
}

const needsApproval = computed(() => {
  return quote.value?.spender && fromToken.value !== ethers.ZeroAddress;
});

async function approveIfNeeded(quote) {
  if (!needsApproval.value) return;

  const erc20 = new ethers.Contract(
    fromToken.value,
    [
      "function allowance(address owner, address spender) view returns (uint256)",
      "function approve(address spender, uint256 value) returns (bool)",
    ],
    signer
  );

  const owner = account.value;
  const spender = quote.transaction.to;
  // const spender = '0x0b9a6c15912F840a81C9AE41cc7382a728880edb'
  const allowance = await erc20.allowance(owner, spender);

  if (allowance < BigInt(amount.value)) {
    const tx = await erc20.approve(spender, ethers.MaxUint256);
    await tx.wait();
  }
}

async function swap() {
  // 👉 Step 1: fetch fresh quote
  quote.value = await fetchQuote();

  if (!quote.value?.transaction) {
    alert("Quote failed: " + JSON.stringify(quote.value));
    return;
  }

  // 👉 Step 2: approve token if needed


  // 👉 Step 3: send swap transaction
  // const txHash = await window.ethereum.request({
  //   method: 'eth_sendTransaction',
  //   params: [{
  //     from: account.value,
  //     to: quote.value.transaction.to,
  //     data: quote.value.transaction.data,
  //     value: quote.value.transaction.value ?? '0x0'
  //   }]
  // })

  const txParams = {
    from: account.value,
    to: quote.value.transaction.to,
    data: quote.value.transaction.data,
    // ✅ Fix: if API returns null, force "0x0"
    value: quote.value.transaction.value,

  };

  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [txParams],
  });
}
</script>

<template>
  <!-- await approveIfNeeded(quote.value); -->

  <div class="space-y-4">
    <button @click="connect" class="px-4 py-2 rounded bg-black text-white">
      Connect Wallet
    </button>
    <div v-if="account">Account: {{ account }}</div>

    <div class="grid gap-2">
      <input
        v-model="fromToken"
        placeholder="from token address"
        class="border p-2 rounded"
      />
      <input
        v-model="toToken"
        placeholder="to token address"
        class="border p-2 rounded"
      />
      <input
        v-model="amount"
        placeholder="amount (human readable)"
        class="border p-2 rounded"
      />
    </div>

    <pre v-if="quote">{{ JSON.stringify(quote, null, 2) }}</pre>

    <button @click="swap" class="px-4 py-2 rounded bg-green-600 text-white">
      Swap
    </button>
  </div>
</template>
