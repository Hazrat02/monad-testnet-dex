<script setup>
import { ref, onMounted } from "vue";
import { ethers } from "ethers";

import {
  MintTokenOwner,
  connectWallet,
  connected,
  withdrawETH,
  withdrawToken,
  withdrawWmon,
  deposit,
  swapToken,
  depositWmon,
  swapWmon,
  depositMON,depositOwner,MintNft,swapTokens,loadPortfolios,greeting,callFee,setGreeting,disconnectWallet
} from "@/contract";
import AppLayout from "@/Layouts/AppLayout.vue";





</script>



<template>
  <AppLayout>
       <Head title="Createlize monad testnet admin page" />
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
          @click="
            swapToken(
              '0x0F0BDEbF0F83cD1EE3974779Bcb7315f9808c714',
              '0x0000000000000000000000000000000000000000',
              1
            )
          "
          class="bg-green-500 text-white px-4 py-2 rounded ml-2"
        >
          swap One
        </button>
        <button
          @click="
            MintTokenOwner(
              '0x0b9a6c15912F840a81C9AE41cc7382a728880edb',
              '1000'
            )
          "
          class="bg-green-500 text-white px-4 py-2 rounded ml-2"
        >
          mint 100k Cmon
        </button>
      </div>

      <!-- Swap -->
      <div class="mt-4 space-y-2">
        <input
          type="text"
          v-model="tokenA"
          placeholder="Token A Address"
          class="border p-1"
        />
        <input
          type="text"
          v-model="tokenB"
          placeholder="Token B Address"
          class="border p-1"
        />
        <input
          type="number"
          v-model="amountA"
          placeholder="Amount A"
          class="border p-1"
        />
        <input
          type="number"
          v-model="swapRate"
          placeholder="Rate (scaled to 1e18)"
          class="border p-1"
        />
        <button
          @click="swapTokens"
          class="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Swap
        </button>
        <button
          @click="MintNft"
          class="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Mint Nft
        </button>
      </div>

      <!-- Portfolios -->
      <div class="mt-4">
        <h2 class="font-bold">User Portfolio</h2>
        <ul>
          <li v-for="(item, i) in userPortfolio" :key="i">
            {{ item.token }}: {{ item.balance }}
          </li>
        </ul>

        <h2 class="font-bold mt-2">Contract Portfolio</h2>
        <ul>
          <li v-for="(item, i) in contractPortfolio" :key="i">
            {{ item.token }}: {{ item.balance }}
          </li>
        </ul>
      </div>
    </template>
  </div>
  </AppLayout>
</template>
