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
  depositMON,
  depositOwner,
  MintNft,
  swapTokens,
  loadPortfolios,
  greeting,
  callFee,
  setGreeting,
  disconnectWallet,
} from "@/contract";
import AppLayout from "@/Layouts/AppLayout.vue";
</script>



<template>
  <AppLayout>
    <Head title="Createlize monad testnet admin page" />

    <header
      class="crypt-header blur-header align-items-center fixed-top z-3"
      style=""
    >
      <div class="row align-items-center justify-content-between">
 
        <!-- secondary menu -->
        <div class="col-auto d-flex flex-row align-items-center">
          <div class="user-settings gap-2 gap-sm-3">
            <!-- Dropdown (Assets) -->
            <div class="dropdown profile_menu disable-sm-screen">
              <a
                class="nav-link crypto-has-dropdown fw-medium"
                href="#!"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Assets
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0"
                  y="0"
                  version="1.1"
                  viewBox="0 0 29 29"
                  xml:space="preserve"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-miterlimit="10"
                    stroke-width="2"
                    d="m20.5 11.5-6 6-6-6"
                  ></path>
                </svg>
              </a>
              <div class="dropdown-menu dropdown-menu-shows">
                <div
                  class="d-flex flex-column ps-2 pe-1 border-bottom border-success border-opacity-10"
                >
                  <p class="text-sm fw-bold crypt-grayscale-600 mb-0">
                    Overview
                  </p>
                  <div class="d-flex col-auto gap-1 p-0">
                    <div>
                      <h4
                        class="fw-bold crypt-grayscale-400 mb-0 encrypted"
                        data-content="0.00000"
                      >
                        0.00000
                      </h4>
                    </div>
                    <div>
                      <select
                        class="form-select text-bg-bs2 crypt-grayscale-600"
                      >
                        <option selected="">BTC</option>
                        <option value="1">ETH</option>
                        <option value="2">BNB</option>
                        <option value="3">USDT</option>
                      </select>
                    </div>
                  </div>
                  <h6
                    class="text-sm crypt-grayscale-600 encrypted"
                    data-content="≈ $0.00 USDT"
                  >
                    ≈ $0.00 USDT
                  </h6>
                </div>
                <div>
                  <a class="dropdown-item text-left" href="my-asset.html">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM11.9999 9L8.99985 12L11.9999 15L14.9999 12L11.9999 9Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    Overview
                  </a>
                </div>
                <div>
                  <a class="dropdown-item" href="spot.html">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M9.99996 20.0302C13.3136 20.0302 15.9999 17.3439 15.9999 14.0302C15.9999 10.7166 13.3136 8.03027 9.99996 8.03027C6.68627 8.03027 4 10.7166 4 14.0302C4 17.3439 6.68627 20.0302 9.99996 20.0302ZM10.0001 12.0303L8.0001 14.0302L10.0001 16.0302L12 14.0302L10.0001 12.0303Z"
                        fill="currentColor"
                      ></path>
                      <path
                        opacity="0.4"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M17.9431 13.0726C19.1897 12.1633 19.9997 10.6914 19.9997 9.03024C19.9997 6.26883 17.7612 4.03027 14.9998 4.03027C13.3386 4.03027 11.8667 4.84034 10.9575 6.08698C14.6102 6.52271 17.5073 9.41976 17.9431 13.0726Z"
                        fill="currentColor"
                      ></path>
                      <path
                        opacity="0.4"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M18.811 19.7803L20.5306 21.5L19.47 22.5606L16.5054 19.596C16.1929 19.2836 16.1929 18.777 16.5054 18.4646L19.47 15.5L20.5306 16.5607L18.811 18.2803H23.0003V19.7803H18.811Z"
                        fill="currentColor"
                      ></path>
                      <path
                        opacity="0.4"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.18931 5.7803L3.46966 7.49996L4.53031 8.56061L7.49493 5.59599C7.80735 5.28357 7.80735 4.77704 7.49494 4.46463L4.53031 1.5L3.46966 2.56065L5.18931 4.28031H1V5.7803H5.18931Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    Spot
                  </a>
                </div>
                <div>
                  <a class="dropdown-item" href="margin.html">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.4"
                        d="M6.63526 16.3363C8.65442 15.7953 9.85267 13.7198 9.31164 11.7007C8.77061 9.68151 6.69517 8.48325 4.67602 9.02428C2.65687 9.56531 1.45861 11.6408 1.99964 13.6599C2.54067 15.6791 4.61611 16.8773 6.63526 16.3363Z"
                        fill="currentColor"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M17.6034 13.3978C20.6321 12.5862 22.4295 9.47303 21.6179 6.44429C20.8064 3.41557 17.6932 1.61818 14.6645 2.42972C11.6358 3.24127 9.83842 6.35443 10.6499 9.38316C11.4615 12.4119 14.5746 14.2093 17.6034 13.3978ZM15.6444 6.08567L14.3062 8.40349L16.6241 9.74168L17.9623 7.42386L15.6444 6.08567Z"
                        fill="currentColor"
                      ></path>
                      <path
                        opacity="0.4"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M20.958 14.9477L4.50603 19.356L4.13867 17.985L20.5906 13.5767L20.958 14.9477Z"
                        fill="currentColor"
                      ></path>
                      <path
                        opacity="0.4"
                        d="M11.8706 20.4531L13.763 17.6143L15.6555 20.4531H11.8706Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    Margin
                  </a>
                </div>
                <div>
                  <a class="dropdown-item" href="futures.html">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M11.9999 17.6361C15.0124 17.6361 17.4545 15.1941 17.4545 12.1816C17.4545 9.16914 15.0124 6.72705 11.9999 6.72705C8.98749 6.72705 6.54541 9.16914 6.54541 12.1816C6.54541 15.1941 8.98749 17.6361 11.9999 17.6361ZM12.0001 10.3634L10.1819 12.1816L12.0001 13.9998L13.8183 12.1816L12.0001 10.3634Z"
                        fill="currentColor"
                      ></path>
                      <path
                        opacity="0.4"
                        d="M4.16992 9.80079C5.18954 6.44343 8.30936 4 11.9999 4C16.5185 4 20.1817 7.66312 20.1817 12.1818L22.0001 9.45454"
                        stroke="currentColor"
                        stroke-width="1.36364"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        opacity="0.4"
                        d="M19.8302 14.5626C18.8106 17.92 15.6908 20.3634 12.0003 20.3634C7.48159 20.3634 3.81847 16.7003 3.81847 12.1816L2 14.9089"
                        stroke="currentColor"
                        stroke-width="1.36364"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                    Futures
                  </a>
                </div>
                <div>
                  <a class="dropdown-item" href="trading-bots.html">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.4"
                        d="M3 10H1V14H3V10Z"
                        fill="currentColor"
                      ></path>
                      <path
                        opacity="0.4"
                        d="M23 10H21V14H23V10Z"
                        fill="currentColor"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M6 5C4.89543 5 4 5.89543 4 7V17C4 18.1046 4.89543 19 6 19H18C19.1046 19 20 18.1046 20 17V7C20 5.89543 19.1046 5 18 5H6ZM9.99991 8H7.99991V11H9.99991V8ZM14.3997 13.2004C13.7311 13.7027 12.9019 14 12.0003 14C11.0985 14 10.269 13.7027 9.6005 13.2005L8.39915 14.7995C9.40214 15.553 10.6505 16 12.0003 16C13.3502 16 14.5982 15.5528 15.601 14.7995L14.3997 13.2004ZM13.9998 8H15.9998V11H13.9998V8Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    Trading Bots
                  </a>
                </div>
                <div>
                  <a class="dropdown-item" href="earn.html">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.4"
                        d="M8.24423 19.9962L3 16.5L3.65836 16.1708C4.50294 15.7485 5.49706 15.7485 6.34164 16.1708L8.15542 17.0777C8.71084 17.3554 9.32329 17.5 9.94427 17.5H13L10.9487 16.8162C10.3821 16.6274 10 16.0972 10 15.5H18.1716C18.702 15.5 19.2107 15.7107 19.5858 16.0858L21 17.5L18 21.5L16 20.5H9.90833C9.31605 20.5 8.73703 20.3247 8.24423 19.9962Z"
                        fill="currentColor"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M9 14.5C12.3137 14.5 15 11.8137 15 8.5C15 5.18629 12.3137 2.5 9 2.5C5.68629 2.5 3 5.18629 3 8.5C3 11.8137 5.68629 14.5 9 14.5ZM9 6.5L7 8.5L9 10.5L11 8.5L9 6.5Z"
                        fill="currentColor"
                      ></path>
                      <path
                        opacity="0.4"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M15.0005 13.4494C16.0742 12.0877 16.7148 10.3686 16.7148 8.5C16.7148 6.63135 16.0742 4.91234 15.0005 3.55065C15.2338 3.51727 15.4723 3.5 15.7148 3.5C18.4763 3.5 20.7148 5.73858 20.7148 8.5C20.7148 11.2614 18.4763 13.5 15.7148 13.5C15.4723 13.5 15.2338 13.4827 15.0005 13.4494Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    Earn
                  </a>
                </div>
              </div>
            </div>

            <!-- Dropdown (Orders) -->

            <!-- Hamburger Menu -->
            <div id="mobile_menu" class="close">
              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasDarkNavbar"
                aria-controls="offcanvasDarkNavbar"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 18H20"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  ></path>
                  <path
                    d="M4 12H20"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  ></path>
                  <path
                    d="M4 6H20"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

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
