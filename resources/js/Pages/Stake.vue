<script setup>
import { connected, Cmon, balance,stakeToken } from "@/contract";
import AppLayout from "@/Layouts/AppLayout.vue";
import { Head, Link } from "@inertiajs/vue3";
import { ref, onMounted, computed, watch } from "vue";

const amountFrom = ref("0.1");
const amountTo = ref("0.01");
const Button = ref("stake");

const convertedAmount = computed(() => {
  amountTo.value = amountFrom.value;
  return amountTo.value;
});
const reward = computed(() => {
  return (amountFrom.value / 100) * 5;
});
function ButtonChange(data) {
  Button.value = data;
}
async function unstakeAssets() {

  
    try {

    const tx = await stakeToken(
      "0x0290377d81c20F6347dbA71F5ca5d00316c8f33d",
      "0x0000000000000000000000000000000000000000",
      amountFrom.value,
      amountTo.value,
      "Unstaking"
      );

  } catch (err) {
    console.error("Swap failed:", err);
  }
}
async function stakeAssets() {


    try {

    const tx = await stakeToken(
       '0x0000000000000000000000000000000000000000',
        '0x0290377d81c20F6347dbA71F5ca5d00316c8f33d',
            amountFrom.value,
      amountTo.value,
      'staking'
      );

  } catch (err) {
    console.error("Swap failed:", err);
  }
}



</script>
<template>
  <AppLayout>
    <Head title="Createlize monad testnet Stake page" />
    <div class="container mt-5 pt-5">
      <!-- Account Data -->
      <div class="row g-2 card-border mb-4">
        <div class="col-12 col-lg-4 col-xl-4 col-xxl-3">
          <div
            class="card-bs border-secondary border-end border-opacity-50 p-3 me-5"
          >
            <div class="d-flex gap-1">
              <p class="crypt-grayscale-500">Total Staked</p>
              <a href="#" class="link-secondary" id="encrypt">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.4"
                    d="M21.25 9.15005C18.94 5.52005 15.56 3.43005 12 3.43005C10.22 3.43005 8.49 3.95005 6.91 4.92005C5.33 5.90005 3.91 7.33005 2.75 9.15005C1.75 10.7201 1.75 13.2701 2.75 14.8401C5.06 18.4801 8.44 20.5601 12 20.5601C13.78 20.5601 15.51 20.0401 17.09 19.0701C18.67 18.0901 20.09 16.6601 21.25 14.8401C22.25 13.2801 22.25 10.7201 21.25 9.15005ZM12 16.0401C9.76 16.0401 7.96 14.2301 7.96 12.0001C7.96 9.77005 9.76 7.96005 12 7.96005C14.24 7.96005 16.04 9.77005 16.04 12.0001C16.04 14.2301 14.24 16.0401 12 16.0401Z"
                    fill="currentColor"
                  />
                  <path
                    d="M12.0004 9.14001C10.4304 9.14001 9.15039 10.42 9.15039 12C9.15039 13.57 10.4304 14.85 12.0004 14.85C13.5704 14.85 14.8604 13.57 14.8604 12C14.8604 10.43 13.5704 9.14001 12.0004 9.14001Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>
            <div class="d-flex pb-3">
              <h3 class="fw-bold encrypted mb-0">
                {{ Cmon }} <span class="fs-5">CMON</span>
              </h3>
            </div>
            <p class="crypt-grayscale-700 encrypted">≈ {{ Cmon*3.58756 }} USD</p>
          </div>
        </div>
        <div class="col-12 col-lg-4 col-xl-4 col-xxl-3">
          <div class="card-bs p-3">
            <p class="crypt-grayscale-500">Today‘s PnL (Coming Soon....)</p>
            <div class="d-flex flex-row align-items-center gap-2 pb-3">
              <h3 class="fw-bold encrypted mb-0">
                0 <span class="fs-5">(0.00%)</span>
              </h3>
              <div>
                <a href="#" class="badge bg-info text-dark col-auto"
                  >PnL analysis →</a
                >
              </div>
            </div>
            <p class="crypt-grayscale-700 encrypted">+0.00 USD</p>
          </div>
        </div>
        <div class="col-12 col-lg-4 col-xl-4 col-auto">
          <div class="card-bs p-3">
            <p class="crypt-grayscale-500">MON balance</p>
            <div class="d-flex pb-3">
              <h3 class="fw-bold encrypted mb-0">
                {{ balance.slice(0, 9) }} <span class="fs-5">MON</span>
              </h3>
            </div>
            <p class="crypt-grayscale-700 encrypted">
              ≈ {{ 3.45 * balance.slice(0, 9) }} USD
            </p>
          </div>
        </div>
      </div>

      <div class="flex p-2 p-sm-3 mb-4">
        <div
          class="nav nav-tabs nav-justified card-line card-bs p-1"
          role="tablist"
        >
          <button
            class="nav-link fw-medium"
            :class="{ active: Button === 'stake' }"
            @click="ButtonChange('stake')"
            type="button"
          >
            Stake
          </button>
          <button
            class="nav-link fw-medium"
            :class="{ active: Button === 'unstake' }"
            @click="ButtonChange('unstake')"
            type="button"
          >
            Unstake
          </button>
        </div>
      </div>
   <form v-if="Button ==='stake'" @submit.prevent="stakeAssets">
      <div class="row justify-content-between" >
      
        <div class="col-md-6 col-12">
          <div class="modal-content">
            <div class="modal-header d-flex">
              <h5
                class="d-flex align-items-center gap-3 crypt-grayscale-100 mb-0"
              >
                Stake Assets
              </h5>
            </div>
            <div class="modal-body">
              <!--Stake Form -->
              <div class="input-group justify-content-center mb-4">
                <div
                  class="d-flex flex-row align-items-center gap-2 circles gd-bg px-3 py-1"
                >
                  <label class="form-label text-light mb-0"
                    >1 MON ≈ 0.99773528 CMON</label
                  >
                  <img
                    alt=""
                    width="24"
                    src="https://crypt.tophivetheme.com/demo/images/icon/stake-change.svg"
                  />
                </div>
              </div>
              <div class="input-group">
                <label class="form-label crypt-grayscale-600"
                  >Stake Amount</label
                >
                <label class="form-label ms-auto crypt-grayscale-600"
                  >Balance :
                  <span class="text-primary"
                    >{{ balance.slice(0, 5) }} MON</span
                  ></label
                >
              </div>
              <div class="input-group d-flex">
                <input
                        :class="{
                            'text-danger':
                              amountFrom > Number(balance),
                          }"
                          :max="Number(balance)"
                          step="any"
                             required
                  type="number"
                  class="form-control text-sm"
                  v-model="amountFrom"
                  placeholder="Min 0.1"
                />
                <div class="input-group-append input-group-text p-1">
                  <select class="form-select text-sm crypt-grayscale-500">
                    <option selected>MON</option>
                  </select>
                </div>
              </div>
              <div class="input-group justify-content-center p-3">
                <img
                  alt=""
                  style="width: 32px"
                  src="https://crypt.tophivetheme.com/demo/images/icon/stake-down.svg"
                />
              </div>
              <div class="card-bs p-2 bg-5">
                <div class="input-group">
                  <label class="form-label crypt-grayscale-600">Receive</label>
                </div>
                <div class="input-group">
                  <input
                    type="number"
                    class="form-control"
                    :placeholder="convertedAmount"
                    disabled
                    readonly
                  />
                  <span class="input-group-text fw-bold text-info">CMON</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-12">
          <div class="alert alert-warning d-flex mt-3 mb-4 p-2" role="alert">
            <svg
              class="flex-shrink-0 me-2"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.4"
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                fill="currentColor"
              />
              <path
                d="M12 13.75C12.41 13.75 12.75 13.41 12.75 13V8C12.75 7.59 12.41 7.25 12 7.25C11.59 7.25 11.25 7.59 11.25 8V13C11.25 13.41 11.59 13.75 12 13.75Z"
                fill="currentColor"
              />
              <path
                d="M12.92 15.6199C12.87 15.4999 12.8 15.3899 12.71 15.2899C12.61 15.1999 12.5 15.1299 12.38 15.0799C12.14 14.9799 11.86 14.9799 11.62 15.0799C11.5 15.1299 11.39 15.1999 11.29 15.2899C11.2 15.3899 11.13 15.4999 11.08 15.6199C11.03 15.7399 11 15.8699 11 15.9999C11 16.1299 11.03 16.2599 11.08 16.3799C11.13 16.5099 11.2 16.6099 11.29 16.7099C11.39 16.7999 11.5 16.8699 11.62 16.9199C11.74 16.9699 11.87 16.9999 12 16.9999C12.13 16.9999 12.26 16.9699 12.38 16.9199C12.5 16.8699 12.61 16.7999 12.71 16.7099C12.8 16.6099 12.87 16.5099 12.92 16.3799C12.97 16.2599 13 16.1299 13 15.9999C13 15.8699 12.97 15.7399 12.92 15.6199Z"
                fill="currentColor"
              />
            </svg>
            <p class="mb-0">
              CMON’s value increases over time as staking rewards accrue after
              launch. You will get back your initial MON and earned rewards.
            </p>
          </div>
          <div class="mt-2 text-sm card-border p-2">
            <div class="d-flex flex-row justify-content-between">
              <p class="crypt-grayscale-500">Conversion Ratio</p>
              <p class="crypt-grayscale-500">1 MON ≈ 0.997834 CMON</p>
            </div>
            <div class="d-flex flex-row justify-content-between">
              <p class="crypt-grayscale-500">Reference APR</p>
              <p class="crypt-grayscale-500">5.00%</p>
            </div>
            <div class="d-flex flex-row justify-content-between">
              <p class="crypt-grayscale-500">Monthly Est. Reward</p>
              <p class="text-up">{{ reward }} MON</p>
            </div>
          </div>
          <div class="d-grid mt-5 mb-3">
            <button
              v-if="!connected"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              class="btn btn-warning"
              type="button"
            >
              Connect Wallet
            </button>
            <button v-else type="submit" class="btn btn-warning">
              Stake MON
            </button>
          </div>
        </div>
      </div>
      </form>
     <form v-else @submit.prevent="unstakeAssets">

      <div  class="row justify-content-between">
   
        <div class="col-md-6 col-12">
          <div class="modal-content">
            <div class="modal-header d-flex">
              <h5
                class="d-flex align-items-center gap-3 crypt-grayscale-100 mb-0"
              >
                Stake Assets
              </h5>
            </div>
            <div class="modal-body">
              <!--Stake Form -->
              <div class="input-group justify-content-center mb-4">
                <div
                  class="d-flex flex-row align-items-center gap-2 circles gd-bg px-3 py-1"
                >
                  <label class="form-label text-light mb-0"
                    >1 CMON ≈ 0.99773528 MON</label
                  >
                  <img
                    alt=""
                    width="24"
                    src="https://crypt.tophivetheme.com/demo/images/icon/stake-change.svg"
                  />
                </div>
              </div>
              <div class="input-group">
                <label class="form-label crypt-grayscale-600"
                  >Stake Amount</label
                >
                <label class="form-label ms-auto crypt-grayscale-600"
                  >Balance :
                  <span class="text-primary"
                    >{{ Cmon.slice(0, 5) }} CMON</span
                  ></label
                >
              </div>
              <div class="input-group d-flex">
                <input
                  type="number"
                  class="form-control text-sm"
                  v-model="amountFrom"
                  placeholder="Min 0.1"
                           :class="{
                            'text-danger':
                              amountFrom > Number(Cmon),
                          }"
                          :max="Number(Cmon)"
                          step="any"
                             required
                />
                <div class="input-group-append input-group-text p-1">
                  <select class="form-select text-sm crypt-grayscale-500">
                    <option selected>CMON</option>
                  </select>
                </div>
              </div>
              <div class="input-group justify-content-center p-3">
                <img
                  alt=""
                  style="width: 32px"
                  src="https://crypt.tophivetheme.com/demo/images/icon/stake-down.svg"
                />
              </div>
              <div class="card-bs p-2 bg-5">
                <div class="input-group">
                  <label class="form-label crypt-grayscale-600">Receive</label>
                </div>
                <div class="input-group">
                  <input
                    type="number"
                    class="form-control"
                    :placeholder="convertedAmount"

                    disabled
                    readonly
                  />
                  <span class="input-group-text fw-bold text-info">MON</span>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div class="col-md-6 col-12 mt-2">
          <div class="alert alert-warning d-flex mt-3 mb-4 p-2" role="alert">
            <svg
              class="flex-shrink-0 me-2"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.4"
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                fill="currentColor"
              />
              <path
                d="M12 13.75C12.41 13.75 12.75 13.41 12.75 13V8C12.75 7.59 12.41 7.25 12 7.25C11.59 7.25 11.25 7.59 11.25 8V13C11.25 13.41 11.59 13.75 12 13.75Z"
                fill="currentColor"
              />
              <path
                d="M12.92 15.6199C12.87 15.4999 12.8 15.3899 12.71 15.2899C12.61 15.1999 12.5 15.1299 12.38 15.0799C12.14 14.9799 11.86 14.9799 11.62 15.0799C11.5 15.1299 11.39 15.1999 11.29 15.2899C11.2 15.3899 11.13 15.4999 11.08 15.6199C11.03 15.7399 11 15.8699 11 15.9999C11 16.1299 11.03 16.2599 11.08 16.3799C11.13 16.5099 11.2 16.6099 11.29 16.7099C11.39 16.7999 11.5 16.8699 11.62 16.9199C11.74 16.9699 11.87 16.9999 12 16.9999C12.13 16.9999 12.26 16.9699 12.38 16.9199C12.5 16.8699 12.61 16.7999 12.71 16.7099C12.8 16.6099 12.87 16.5099 12.92 16.3799C12.97 16.2599 13 16.1299 13 15.9999C13 15.8699 12.97 15.7399 12.92 15.6199Z"
                fill="currentColor"
              />
            </svg>
            <p class="mb-0">
              CMON’s value increases over time as staking rewards accrue after
              launch. You will get back your initial MON and earned rewards.
            </p>
          </div>
          <div class="mt-2 text-sm card-border p-2">
            <div class="d-flex flex-row justify-content-between">
              <p class="crypt-grayscale-500">Conversion Ratio</p>
              <p class="crypt-grayscale-500">1 CMON ≈ 0.997834 MON</p>
            </div>

            <div class="d-flex flex-row justify-content-between">
              <p class="crypt-grayscale-500">Monthly Reward Subtracted</p>
              <p class="text-down">{{ reward }} MON</p>
            </div>
          </div>
          <div class="d-grid mt-5 mb-3">
            <button
              v-if="!connected"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              class="btn btn-warning"
              type="button"
            >
              Connect Wallet
            </button>
            <button v-else type="submit" class="btn btn-warning">
              Unstake
            </button>
          </div>
        </div>
      
      </div>

  </form>

    </div>
  </AppLayout>
</template>