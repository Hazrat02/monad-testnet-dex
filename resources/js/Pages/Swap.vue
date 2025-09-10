

<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import { Head,Link } from "@inertiajs/vue3";
import { ref, onMounted,computed } from "vue";

const balances = ref([]);
const userAddress = "0x0b9a6c15912F840a81C9AE41cc7382a728880edb";
const selectedFrom = ref({
  symbol: 'MON',
  balance: '0.00',
  usd_per_token: '3.85514500',
  mon_per_token: '1'
})
const amountFrom = ref("0.05");
const amountTo = ref("0.01");
const selectedTo = ref({
  symbol: 'CMON',
  balance: '0.00',
  usd_per_token: '3.85514500',
  mon_per_token: '2'

})
// Fetch balances function
const fetchBalances = async () => {
  try {
    const response = await fetch(`/api/assets/${userAddress}`);
    const results = await response.json();

    balances.value = results.filter(
      (token) =>
        token.categories?.includes("verified") &&
        Number(token.mon_per_token) > 0
    );
    selectedFrom.value = results.find((token) =>
      token.categories?.includes("native")
    );
  } catch (error) {
    console.error("Error fetching balances:", error);
  }
};

const exchangeTokens = () => {
  // Swap selected tokens
  const tempToken = { ...selectedFrom.value }

  selectedFrom.value = { ...selectedTo.value }
  selectedTo.value = tempToken

  // Swap amounts
  const tempAmount = amountFrom.value
  amountFrom.value = amountTo.value
  amountTo.value = tempAmount
}
onMounted(() => {
  fetchBalances();
});

function swap() {}

const convertedAmount = computed(() => {
  const priceTokenA = selectedFrom.value.mon_per_token
  const priceTokenB = selectedTo.value.mon_per_token
  const amountA = amountFrom.value

  if (!priceTokenA || !priceTokenB || !amountA) return 0

  const usdValue = amountA * priceTokenA
  amountTo.value = usdValue / priceTokenB
  return amountTo.value

})

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
                          <span class="text-primary" v-if="selectedFrom"
                            >{{ Number(selectedFrom.balance).toFixed(5) }}
                            {{ selectedFrom.symbol }}</span
                          ></label
                        >
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
                            <option
                              v-for="token in balances"
                              :key="token.symbol"
                              :value="token"
                              :hidden="token.symbol === selectedTo.symbol"
                            >
                              <div>{{ token.symbol }}</div>
                              &nbsp;&nbsp;&nbsp;&nbsp;
                              <div>{{ Number(token.balance).toFixed(2) }}</div>
                            </option>
                          </select>
                        </div>
                      </div>
                      <label
                     
                        
                        class="form-label crypt-grayscale-600 mt-1"
                        >≈
                        {{
                          (
                            Number(selectedFrom.usd_per_token) * amountFrom
                          ).toFixed(5)
                        }}</label
                      >
                    </div>


                    <div  class="input-group justify-content-center p-3 ">
                      <img @click="exchangeTokens" class="mouse"
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
                          <span class="text-primary" v-if="selectedTo"
                            >{{ Number(selectedTo.balance).toFixed(5) }}
                            {{ selectedTo.symbol }}</span
                          ></label
                        >
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
                              v-for="token in balances"
                              :key="token.symbol"
                              :value="token"
                                :hidden="token.symbol === selectedFrom.symbol"
                            >
                              <div>{{ token.symbol }}</div>
                              &nbsp;&nbsp;&nbsp;&nbsp;
                              <div>{{ Number(token.balance).toFixed(2) }}</div>
                            </option>
                          </select>
                        </div>
                      </div>
                      <label class="form-label crypt-grayscale-600 mt-1"
                        >≈ {{
                          (
                            Number(selectedTo.usd_per_token) * amountTo
                          ).toFixed(5)
                        }}</label
                      >
                    </div>
                    <div class="mt-2 text-sm">
                      <div class="d-flex flex-row justify-content-between">
                        <p class="crypt-grayscale-500">Rate:</p>
                        <p class="crypt-grayscale-500">1 ADA ≈ 0.728877 USDT</p>
                      </div>
                    </div>
                    <div class="d-grid mt-1 mb-3">
                      <button class="btn btn-info" type="submit">
                        Swap Now
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
                     v-for="token in balances.slice(0, 12)" :key="token.symbol"
                             
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
                            <span class="verified text-sm">Verified</span>
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>${{ token.usd_per_token }}</td>
                    <td >
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

    <button data-bs-toggle="modal" data-bs-target="#stakeCrypto">
      See more
    </button>

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
.mouse{
    cursor: pointer;
}
</style>