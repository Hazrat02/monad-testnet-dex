<script setup>
import { Head } from '@inertiajs/vue3';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo.vue';

defineProps({
    terms: String,
});
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
      <input type="text" v-model="tokenAddress" />

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
      </div>
    </template>
  </div>
</template>
