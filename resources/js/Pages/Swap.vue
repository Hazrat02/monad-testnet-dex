

<script setup>
import { connected, swapToken, provider, account } from "@/contract";
import AppLayout from "@/Layouts/AppLayout.vue";
import { getTokenPrice } from "@/localstorage";
import { Head, Link } from "@inertiajs/vue3";
import { ethers } from "ethers";
import { ref, onMounted, computed, watch } from "vue";

const cmonAddress = "0x0290377d81c20F6347dbA71F5ca5d00316c8f33d"; // CMON contract
const cmonAbi = [
  "function balanceOf(address account) external view returns (uint256)",
  "function decimals() view returns (uint8)", // optional, for formatting
];
const cmonContract = new ethers.Contract(cmonAddress, cmonAbi, provider);

// Example usage
getUserCmonBalance("0xYourUserAddressHere");

const balances = ref([]);
const Dbalances = ref([]);
const userAddress = "0x0b9a6c15912F840a81C9AE41cc7382a728880edb";
const selectedsymbol = ref("mon");
const selectedFrom = ref({
  symbol: "MON",
  balance: "0.00",
  usd_per_token: "3.85514500",
  mon_per_token: "1",
});
const amountFrom = ref("0.05");
const amountTo = ref("0.01");
const selectedTo = ref({
  address: "0x0290377d81c20F6347dbA71F5ca5d00316c8f33d",
  name: "Createlize Mon",
  decimals: 18,
  symbol: "CMON",
  balance: "0.00",
  usd_per_token: "3.85514500",
  categories: ["Unverified"],
  mon_per_token: "2",
  pconf: "100",
  mon_value: "0.00",
});

async function getUserCmonBalance(userAddress) {
  try {
    const balance = await cmonContract.balanceOf(userAddress);

    // Convert balance to human-readable format
    const formattedBalance = ethers.formatUnits(balance, 18);
    console.log(`User CMON balance: ${formattedBalance}`);

    return formattedBalance;
  } catch (err) {}
}

// Fetch balances function
const fetchBalances = async () => {
  try {
    const results = account.value
      ? await getTokenPrice(account.value)
      : await getTokenPrice("no");

    Dbalances.value = results.default.filter(
      (token) =>
        token.categories?.includes("verified") &&
        Number(token.mon_per_token) > 0
    );

    if (results.assets) {
      balances.value = results.assets.filter(
        (token) =>
          token.categories?.includes("verified") &&
          Number(token.mon_per_token) > 0
      );
    } else {
      balances.value = "";
    }

    if (account.value) {
      const Cmon = await getUserCmonBalance(account.value);

      selectedFrom.value = results.assets.find((token) =>
        token.categories?.includes("native")
      );

      const cmonToken = results.default.find(
        (token) => token.symbol === "CMON"
      );

      if (cmonToken) {
        cmonToken.balance = Cmon; // set user balance
        selectedTo.value = cmonToken; // keep the object, not just balance

        balances.value.push(cmonToken);
      }
    } else {
      selectedFrom.value = results.default.find((token) =>
        token.categories?.includes("native")
      );

      selectedTo.value = results.default.find(
        (token) => token.symbol === "CMON"
      );
    }
  } catch (error) {
    console.error("Error fetching balances:", error);
  }
};

const exchangeTokens = () => {
  // Swap selected tokens
  const tempToken = { ...selectedFrom.value };

  selectedFrom.value = { ...selectedTo.value };
  selectedTo.value = tempToken;

  // Swap amounts
  const tempAmount = amountFrom.value;
  amountFrom.value = amountTo.value;
  amountTo.value = tempAmount;
};

const balanceChange = (from, to, amount1, amount2) => {
  const fromToken = balances.value.find((token) => token.address === from);

  if (fromToken) {
    fromToken.balance = Number(fromToken.balance) - Number(amount1);
    selectedFrom.value = fromToken;
  }

  // Add or update `toToken`
  let toToken = balances.value.find((token) => token.address === to);

  // if (toToken) {
  //   // Already exists → just increase balance
  //   toToken.balance = String(
  //     Number(toToken.balance) + Number(amount2)
  //   );
  // }
};
onMounted(() => {
  // Show

  fetchBalances();
});

async function swap() {
  try {
    // const tx = await swapToken(
    //   selectedFrom.address,
    //   selectedTo.address,
    //   '1',
    //   '1'
    // );
    const tx = await swapToken(
      selectedFrom.value.address,
      selectedTo.value.address,
      amountFrom.value,
      amountTo.value
    );

    // if (tx) {
    //     balanceChange(
    //   selectedFrom.value.address,
    //   selectedTo.value.address,
    //   amountFrom.value,
    //   amountTo.value
    // );

    // }
    // console.log("Transaction sent, waiting for confirmation...");
  } catch (err) {
    console.error("Swap failed:", err);
  }
}

const selectedsymbolTo = computed(() => {
  const fromToken = balances.value.find(
    (token) => token.symbol === selectedsymbol
  );
  console.log(fromToken);
  return fromToken;
});

const convertedAmount = computed(() => {
  const priceTokenA = selectedFrom.value.mon_per_token;
  const priceTokenB = selectedTo.value.mon_per_token;
  const amountA = amountFrom.value;

  if (!priceTokenA || !priceTokenB || !amountA) return 0;

  const usdValue = amountA * priceTokenA;
  amountTo.value = usdValue / priceTokenB;
  return amountTo.value;
});
const SelectedToBanalace = computed(() => {
  const fromToken = balances.value.find(
    (token) => token.address === selectedTo.value.address
  );

  return fromToken ? fromToken.balance : 0;
});

watch(connected, fetchBalances, { immediate: false });
</script>
<template>
  <AppLayout>
    <Head title="Createlize monad testnet swap page" />
    <!-- Main Content -->

    <div class="container-fluid mt-5 pt-3">
      <div class="row g-2">
        <div class="row tab-content table-responsive card-bs p-2 mt-2">
          <!--Market Tabs -->

          <div class="col-12 col-md-6" id="convertCrypto">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header d-flex">
                  <h5
                    class="d-flex align-items-center gap-3 crypt-grayscale-100 mb-0"
                  >
                    Swap
                  </h5>
                </div>
                <form @submit.prevent="swap">
                  <div class="modal-body">
                    <!--Convert Form -->

                    <div class="card-bs p-2 bg-5">
                      <div class="input-group">
                        <label class="form-label crypt-grayscale-600"
                          >From</label
                        >
                        <label class="form-label ms-auto crypt-grayscale-600"
                          >Balance :
                          <span class="text-primary" v-if="balances.length > 0"
                            >{{ Number(selectedFrom.balance).toFixed(5) }}
                            {{ selectedFrom.symbol }}</span
                          >
                          <span class="text-primary" v-else
                            >0.00 {{ selectedFrom.symbol }}</span
                          >
                        </label>
                      </div>
                      <div class="input-group d-flex">
                        <input
                          :class="{
                            'text-danger':
                              amountFrom > Number(selectedFrom.balance),
                          }"
                          :max="Number(selectedFrom.balance)"
                          step="any"
                          type="number"
                          v-model="amountFrom"
                          class="form-control text-sm"
                          placeholder="0.00"
                          required
                        />
                        <div class="input-group-append input-group-text p-1">
                          <select
                            class="form-select text-sm crypt-grayscale-500"
                            v-model="selectedFrom"
                          >
                            <option selected disabled>Select From Token</option>
                            <template v-if="balances.length > 0">
                              <option
                                v-for="token in balances"
                                :key="token.symbol"
                                :value="token"
                                :hidden="token.symbol === selectedTo.symbol"
                              >
                                <div>{{ token.symbol }}</div>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <div>
                                  {{ Number(token.balance).toFixed(2) }}
                                </div>
                              </option>
                            </template>
                            <template v-else>
                              <option
                                v-for="token in Dbalances"
                                :key="token.symbol"
                                :value="token"
                                :hidden="token.symbol === selectedTo.symbol"
                              >
                                <div>{{ token.symbol }}</div>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <div>0.00</div>
                              </option>
                            </template>
                            <!-- <option
                             v-if="balances.length > 0"

                              v-for="token in balances"
                              :key="token.symbol"
                              :value="token"
                              :hidden="token.symbol === selectedTo.symbol"
                            >
                              <div>{{ token.symbol }}</div>
                              &nbsp;&nbsp;&nbsp;&nbsp;
                              <div>{{ Number(token.balance).toFixed(2) }}</div>
                            </option> -->
                          </select>
                        </div>
                      </div>
                      <label class="form-label crypt-grayscale-600 mt-1"
                        >≈
                        {{
                          (
                            Number(selectedFrom.usd_per_token) * amountFrom
                          ).toFixed(5)
                        }}</label
                      >
                    </div>

                    <div class="input-group justify-content-center p-3">
                      <img
                        @click="exchangeTokens"
                        class="mouse"
                        alt=""
                        style="width: 32px"
                        src="https://crypt.tophivetheme.com/demo/images/icon/switch.svg"
                      />
                    </div>

                    <div class="card-bs p-2 bg-5">
                      <div class="input-group">
                        <label class="form-label crypt-grayscale-600">To</label>
                        <label class="form-label ms-auto crypt-grayscale-600"
                          >Balance :
                          <span class="text-primary" v-if="balances.length > 0"
                            >{{ Number(SelectedToBanalace).toFixed(5) }}
                            {{ selectedTo.symbol }}</span
                          >
                          <span class="text-primary" v-else
                            >0.00 {{ selectedTo.symbol }}</span
                          >
                        </label>
                      </div>
                      <div class="input-group d-flex">
                        <input
                          type="number"
                          disabled
                          class="form-control text-sm"
                          placeholder="0.001 - 310000"
                          :value="convertedAmount"
                        />
                        <div class="input-group-append input-group-text p-1">
                          <select
                            class="form-select text-sm crypt-grayscale-500"
                            v-model="selectedTo"
                          >
                            <option selected disabled>Select to Token</option>
                            <option
                              v-for="token in Dbalances"
                              :key="token.symbol"
                              :value="token"
                              :hidden="token.symbol === selectedFrom.symbol"
                            >
                              <div>{{ token.symbol }}</div>
                            </option>
                          </select>
                        </div>
                      </div>
                      <label class="form-label crypt-grayscale-600 mt-1"
                        >≈
                        {{
                          (Number(selectedTo.usd_per_token) * amountTo).toFixed(
                            5
                          )
                        }}</label
                      >
                    </div>
                    <div class="mt-2 text-sm">
                      <div class="d-flex flex-row justify-content-between">
                        <p class="crypt-grayscale-500">Slippage Tolerance:</p>
                        <p class="crypt-grayscale-500">0.10%</p>
                      </div>
                      <div class="d-flex flex-row mt-0 justify-content-between">
                        <p class="crypt-grayscale-500">Swap Fee:</p>
                        <p class="crypt-grayscale-500">0.001 Mon</p>
                      </div>
                    </div>
                    <div class="d-grid mt-1 mb-3">
                      <button
                        v-if="connected"
                        class="btn btn-info"
                        type="submit"
                      >
                        Swap Now
                      </button>
                      <button
                        v-if="!connected"
                        type="button"
                        class="btn btn-lg shiny-cta signup-btn"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                      >
                        <svg
                          width="25"
                          height="25"
                          viewBox="0 0 25 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21.5 10.5V14.5H17.5C16.9696 14.5 16.4609 14.2893 16.0858 13.9142C15.7107 13.5391 15.5 13.0304 15.5 12.5C15.5 11.9696 15.7107 11.4609 16.0858 11.0858C16.4609 10.7107 16.9696 10.5 17.5 10.5H21.5ZM18 12.69C18.0149 12.6275 18.0149 12.5625 18 12.5C18.0008 12.4344 17.9879 12.3694 17.962 12.3091C17.9362 12.2489 17.898 12.1946 17.85 12.15C17.7565 12.0584 17.6309 12.0071 17.5 12.0071C17.3691 12.0071 17.2435 12.0584 17.15 12.15C17.102 12.1946 17.0638 12.2489 17.038 12.3091C17.0121 12.3694 16.9992 12.4344 17 12.5C16.9979 12.5658 17.0102 12.6312 17.0362 12.6916C17.0621 12.7521 17.1009 12.8062 17.15 12.85C17.1949 12.8978 17.2491 12.936 17.3093 12.962C17.3695 12.9881 17.4344 13.0015 17.5 13.0015C17.5656 13.0015 17.6305 12.9881 17.6907 12.962C17.7509 12.936 17.8051 12.8978 17.85 12.85C17.9154 12.8136 17.9679 12.7576 18 12.69Z"
                            fill="#facc15"
                          />
                          <path
                            d="M18 12.5C18.0149 12.5625 18.0149 12.6275 18 12.69C17.9787 12.7524 17.9407 12.8078 17.89 12.85C17.8451 12.8978 17.7909 12.936 17.7307 12.962C17.6705 12.9881 17.6056 13.0015 17.54 13.0015C17.4744 13.0015 17.4095 12.9881 17.3493 12.962C17.2891 12.936 17.2349 12.8978 17.19 12.85C17.1336 12.8102 17.0872 12.7579 17.0542 12.6972C17.0213 12.6365 17.0027 12.569 17 12.5C16.9992 12.4344 17.0122 12.3694 17.038 12.3091C17.0638 12.2489 17.102 12.1947 17.15 12.15C17.2435 12.0584 17.3692 12.0071 17.5 12.0071C17.6309 12.0071 17.7566 12.0584 17.85 12.15C17.8981 12.1947 17.9362 12.2489 17.9621 12.3091C17.9879 12.3694 18.0008 12.4344 18 12.5Z"
                            fill="currentColor"
                          />
                          <path
                            d="M18.5 20H5.5C4.83696 20 4.20107 19.7366 3.73223 19.2678C3.26339 18.7989 3 18.163 3 17.5V7.5C3 6.83696 3.26339 6.20107 3.73223 5.73223C4.20107 5.26339 4.83696 5 5.5 5H18.5C19.163 5 19.7989 5.26339 20.2678 5.73223C20.7366 6.20107 21 6.83696 21 7.5V10.5C21 10.6326 20.9473 10.7598 20.8536 10.8536C20.7598 10.9473 20.6326 11 20.5 11C20.3674 11 20.2402 10.9473 20.1464 10.8536C20.0527 10.7598 20 10.6326 20 10.5V7.5C20 7.10218 19.842 6.72064 19.5607 6.43934C19.2794 6.15804 18.8978 6 18.5 6H5.5C5.10218 6 4.72064 6.15804 4.43934 6.43934C4.15804 6.72064 4 7.10218 4 7.5V17.5C4 17.8978 4.15804 18.2794 4.43934 18.5607C4.72064 18.842 5.10218 19 5.5 19H18.5C18.8978 19 19.2794 18.842 19.5607 18.5607C19.842 18.2794 20 17.8978 20 17.5V14.5C20 14.3674 20.0527 14.2402 20.1464 14.1464C20.2402 14.0527 20.3674 14 20.5 14C20.6326 14 20.7598 14.0527 20.8536 14.1464C20.9473 14.2402 21 14.3674 21 14.5V17.5C21 18.163 20.7366 18.7989 20.2678 19.2678C19.7989 19.7366 19.163 20 18.5 20Z"
                            fill="currentColor"
                          />
                          <path
                            d="M21.5 15.0001H17.5C16.837 15.0001 16.2011 14.7367 15.7323 14.2679C15.2634 13.799 15 13.1632 15 12.5001C14.9985 12.1706 15.0633 11.8441 15.1904 11.54C15.3175 11.2359 15.5044 10.9605 15.74 10.7301C15.9691 10.4961 16.243 10.3109 16.5455 10.1854C16.8479 10.06 17.1726 9.99694 17.5 10.0001H21.5C21.6326 10.0001 21.7598 10.0528 21.8536 10.1466C21.9473 10.2403 22 10.3675 22 10.5001V14.5001C22 14.6327 21.9473 14.7599 21.8536 14.8537C21.7598 14.9474 21.6326 15.0001 21.5 15.0001ZM17.5 11.0001C17.1038 11.0053 16.7253 11.165 16.4451 11.4452C16.1649 11.7254 16.0052 12.1039 16 12.5001C16 12.8979 16.1581 13.2795 16.4394 13.5608C16.7207 13.8421 17.1022 14.0001 17.5 14.0001H21V11.0001H17.5Z"
                            fill="currentColor"
                          />
                        </svg>
                        Connect Wallet
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div class="col-md-6 col-12">
            <!--Table -->
            <div class="table-responsive">
              <div class="modal-header d-flex">
                <h5
                  class="d-flex align-items-center gap-3 crypt-grayscale-100 mb-0"
                >
                  Supported Token price
                </h5>
              </div>
              <table class="table table-dark table-hover crypt-tab">
                <thead>
                  <tr>
                    <th scope="col">Token</th>
                    <th scope="col">Price(USD)</th>
                    <th scope="col">Price(MON)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="token in Dbalances.slice(0, 12)"
                    :key="token.symbol"
                  >
                    <td>
                      <div class="d-flex flex-row align-items-center gap-2">
                        <div class="fav-btn">
                          <svg
                            class="favme bal1"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              stroke="currentColor"
                              d="M11.173 3.007L12.768 3L15.178 8.11L20.504 8.941L21 10.436L17.11 14.449L18.005 20.085L16.707 21L11.972 18.352L7.236 21L5.94 20.077L6.886 14.445L3 10.436L3.496 8.941L8.818 8.111L11.173 3.007Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                        <div class="d-flex flex-row align-items-center gap-2">
                          <p class="fw-medium mb-0">
                            {{ token.symbol }}
                            <span v-if="token.symbol !=='CMON'" class="verified text-sm">Verified</span>
                            <span v-else class="unverified text-sm">Unverified</span>
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>${{ token.usd_per_token }}</td>
                    <td>
                      {{ Number(token.mon_per_token).toFixed(3) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="row g-2">
        <!-- History -->
        <div class="col-12"></div>
      </div>
    </div>

    <!-- Transfer Modal -->
    <div
      class="modal fade"
      id="transferCrypto"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header d-flex">
            <h5
              class="d-flex align-items-center gap-3 crypt-grayscale-100 mb-0"
            >
              Transfer
            </h5>
            <button
              type="button"
              class="btn-close text-reset close-notify align-items-center justify-content-center"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <svg
                class="close-notify"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.5 4.5L4.5 13.5"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4.5 4.5L13.5 13.5"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
          <div class="modal-body">
            <!--Transfer Form -->
            <div class="d-flex flex-column">
              <label class="form-label text-sm text-light"
                >Internal transfers are free on Crypt.</label
              >
              <div class="card-bs p-2 bg-5">
                <div class="input-group">
                  <label class="input-group-text">From</label>
                  <select class="form-select text-sm crypt-grayscale-300">
                    <option disabled>Options</option>
                    <option selected>Fiat and Spot</option>
                    <option value="1">Funding</option>
                    <option value="2">Isolated Margin</option>
                    <option value="3">COIN-M Futures</option>
                  </select>
                </div>
                <div class="input-group justify-content-between p-2">
                  <img
                    alt=""
                    style="width: 20px"
                    src="https://crypt.tophivetheme.com/demo/images/icon/arrow-down.svg"
                  />
                  <a href="#!">
                    <img
                      alt=""
                      style="width: 24px"
                      src="https://crypt.tophivetheme.com/demo/images/icon/switch.svg"
                    />
                  </a>
                </div>
                <div class="input-group">
                  <label class="input-group-text">To</label>
                  <select class="form-select text-sm crypt-grayscale-300">
                    <option disabled>Options</option>
                    <option selected>Cross Margin</option>
                    <option value="1">USDⓈ-M Futures</option>
                    <option value="2">Fiat and Spot</option>
                    <option value="3">COIN-M Futures</option>
                  </select>
                </div>
              </div>
              <label class="form-label text-sm text-light mt-4">Coin</label>
              <div class="input-group mb-3">
                <select class="form-select crypt-grayscale-300">
                  <option selected>1INCH</option>
                  <option value="1">USDT</option>
                  <option value="2">AAVE</option>
                  <option value="3">ACE</option>
                  <option value="4">ALGO</option>
                  <option value="5">APE</option>
                  <option value="6">CELO</option>
                </select>
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend input-group-text">Amount ≈</div>
                <input
                  class="form-control placeholder-text"
                  type="text"
                  placeholder="Enter the transfer amount"
                />
                <a
                  href="#"
                  class="input-group-append input-group-text text-warning"
                  >MAX</a
                >
              </div>
              <div class="mt-2 text-sm">
                <div class="d-flex flex-row justify-content-between">
                  <p class="crypt-grayscale-500">Max Transferrable:</p>
                  <p class="crypt-grayscale-600">0.00000000 USDT</p>
                </div>
                <div class="d-flex flex-row justify-content-between">
                  <p class="crypt-grayscale-500">Avaliable:</p>
                  <p class="crypt-grayscale-600">0.00000000 USDT</p>
                </div>
              </div>
              <div class="d-grid mt-5 mb-3">
                <a class="btn btn-warning" href="#!" role="button">Confirm</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Convert Modal -->
  </AppLayout>
</template>

<style scoped>
select {
  max-height: 100px !important;
  overflow: scroll;
}
.mouse {
  cursor: pointer;
}

.spinner {
  --size: 48px;
  --color: #3b82f6;
  width: var(--size);
  height: var(--size);
  border: calc(var(--size) / 8) solid rgba(255, 255, 255, 0.863);
  border-top-color: var(--color);
  border-radius: 50%;
  animation: spin 0.9s linear infinite;
  display: inline-block;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* accessibility helper */
.visually-hidden {
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
  border: 0;
  padding: 0;
  margin: -1px;
}
</style>
