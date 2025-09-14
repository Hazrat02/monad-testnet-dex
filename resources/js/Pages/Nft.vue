<script setup>
import { connected, MintNft } from "@/contract";
import AppLayout from "@/Layouts/AppLayout.vue";
import { Head, Link } from "@inertiajs/vue3";
import { ref, onMounted, computed } from "vue";
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("https://testnet-rpc.monad.xyz");
const contractAddress = "0x4FA562648baA2f36990d784B8fD3D3262294AFF2";

const abi = ["function totalSupply() view returns (uint256)"];

const minted = ref(0);
const click = ref(0);
const click1 = ref(false);
const click2 = ref(false);
const click3 = ref(false);

const trueCount = computed(() => {
  return [click1.value, click2.value, click3.value].filter((v) => v).length;
});

async function clickcount(button) {
  if (button == "1") {
    click1.value = true;
  } else if (button == "2") {
    click2.value = true;
  } else {
    click3.value = true;
  }
}

function copyContract() {
  navigator.clipboard.writeText(contractAddress).then(() => {
    alert("Copied: " + contractAddress);
  });
}

const contract = new ethers.Contract(contractAddress, abi, provider);

async function getSupplyData() {
  const total = await contract.totalSupply();

  minted.value = total.toString();
}

onMounted(() => {
  getSupplyData();
});
</script>
<template>
  <AppLayout>
    <Head title="Createlize monad testnet NFT mint page" />
    <div class="mt-5">
      <div class="row justify-content-center g-2 mt-5">
        <div class="col-12 col-md-12 col-lg-9">
          <div class="p-3 h-100">
            <!-- Profile -->
            <div class="row align-items-center p-2">
              <div class="col-12 col-md-12 col-xl-7">
                <div class="row justify-content-evenly">
                  <div class="mt-5 col-3">
                    <img class="img-fluid" src="img/nft.png" alt="" />
                  </div>
                  <div class="col-9 mt-5">
                    <div class="d-flex flex-wrap align-items-center gap-2">
                      <h4 class="crypt-grayscale-100 fw-bold">
                        Createlize ExtraNad
                      </h4>
                    </div>
                    <div class="pb-2 text-sm">
                      <a
                        href="#"
                        class="crypt-grayscale-600 link-light"
                        role="button"
                        >Created At: 10-09-2025 16:13:15
                        <span class="text-sm fw-bold">BD</span>
                      </a>
                    </div>
                    <div class="d-flex flex-wrap align-items-center gap-3">
                      <div class="verified gd-bg px-0">
                        <a class="d-flex gap-2 mb-2 verified mt-2">
                          <p class="crypt-grayscale-600 mb-0">CON:</p>
                          <p class="crypt-grayscale-100 mb-0">
                            {{
                              contractAddress.slice(0, 5) +
                              "***" +
                              contractAddress.slice(-6)
                            }}
                          </p>
                          <div
                            class="crypt-grayscale-500"
                            @click="copyContract"
                            title="Copy"
                          >
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
                                d="M9.15556 5C6.8605 5 5 6.8605 5 9.15556V12.48C5 14.5149 6.46269 16.2083 8.39406 16.566C8.75174 18.4974 10.4451 19.96 12.48 19.96H15.8044C18.0995 19.96 19.96 18.0995 19.96 15.8044V12.48C19.96 10.4451 18.4974 8.75174 16.566 8.39406C16.2083 6.46269 14.5149 5 12.48 5H9.15556ZM14.8315 8.32444C14.4892 7.35604 13.5657 6.66222 12.48 6.66222H9.15556C7.77853 6.66222 6.66222 7.77853 6.66222 9.15556V12.48C6.66222 13.5657 7.35603 14.4892 8.32444 14.8315V12.48C8.32444 10.1849 10.1849 8.32444 12.48 8.32444H14.8315ZM9.98667 12.48C9.98667 11.103 11.103 9.98667 12.48 9.98667H15.8044C17.1814 9.98667 18.2978 11.103 18.2978 12.48V15.8044C18.2978 17.1814 17.1814 18.2978 15.8044 18.2978H12.48C11.103 18.2978 9.98667 17.1814 9.98667 15.8044V12.48Z"
                                fill="currentColor"
                              />
                            </svg>
                          </div>
                        </a>
                      </div>
                      <div class="social d-flex">
                        <a href="#!" rel="nofollow"
                          ><img
                            style="width: 40px; height: 40px"
                            src="img/magiceden.jpg"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-12 col-xl-5">
                <div class="row mt-3">
                  <div class="col-12 col-md-4 pb-4">
                    <div
                      class="d-flex flex-sm-wrap justify-content-between gap-4"
                    >
                      <p class="crypt-grayscale-600 mb-0">Identification</p>
                      <a
                        class="unverified alert align-items-center d-flex mb-0 gap-2"
                        role="button"
                      >
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <!-- Outer star/badge shape -->
                          <path
                            d="M10.401 0.794778C10.7011 0.396626 11.2989 0.396625 11.599 0.794778L12.9886 2.6388C13.1879 2.90318 13.5369 3.00566 13.8474 2.89097L16.0135 2.091C16.4812 1.91827 16.9841 2.24147 17.0212 2.73864L17.1934 5.04126C17.218 5.37139 17.4562 5.64629 17.7795 5.7177L20.0342 6.21577C20.521 6.32331 20.7693 6.86709 20.5318 7.30543L19.4317 9.33557C19.274 9.62663 19.3258 9.98668 19.5591 10.2215L21.1866 11.8595C21.538 12.2132 21.4529 12.8049 21.0161 13.0452L18.9931 14.1583C18.703 14.3179 18.5519 14.6488 18.6213 14.9725L19.1048 17.2303C19.2092 17.7178 18.8178 18.1696 18.3204 18.1357L16.0167 17.9783C15.6864 17.9558 15.3804 18.1524 15.2637 18.4622L14.4498 20.6231C14.2741 21.0897 13.7005 21.2581 13.3004 20.9606L11.4475 19.5828C11.1819 19.3852 10.8181 19.3852 10.5525 19.5828L8.69955 20.9606C8.29948 21.2581 7.72589 21.0897 7.55016 20.6231L6.73628 18.4622C6.6196 18.1524 6.3136 17.9558 5.98332 17.9783L3.67964 18.1357C3.18224 18.1696 2.79076 17.7178 2.89517 17.2303L3.37874 14.9725C3.44807 14.6488 3.29697 14.3179 3.00692 14.1583L0.983894 13.0452C0.547091 12.8049 0.462014 12.2132 0.813412 11.8595L2.44089 10.2215C2.67423 9.98668 2.72599 9.62664 2.56827 9.33557L1.46819 7.30543C1.23066 6.86709 1.479 6.32331 1.96582 6.21577L4.2205 5.7177C4.54376 5.64629 4.78196 5.37139 4.80664 5.04126L4.97876 2.73864C5.01593 2.24147 5.51884 1.91827 5.98652 2.091L8.15255 2.89097C8.4631 3.00566 8.81211 2.90318 9.01135 2.6388L10.401 0.794778Z"
                            fill="currentColor"
                          />
                          <!-- Close (X) sign inside -->
                          <path
                            opacity="0.9"
                            d="M8 8 L14 14 M14 8 L8 14"
                            stroke="#000"
                            stroke-width="2"
                            stroke-linecap="round"
                          />
                        </svg>

                        Unverified
                      </a>
                    </div>
                  </div>
                  <div class="col-12 col-md-4 pb-4">
                    <div
                      class="d-flex flex-sm-wrap justify-content-between gap-4"
                    >
                      <p class="crypt-grayscale-600 mb-0">Supply</p>
                      <h3 class="fw-bold crypt-grayscale-100 mb-0">10k</h3>
                    </div>
                  </div>
                  <div class="col-12 col-md-4 pb-4">
                    <div
                      class="d-flex flex-sm-wrap justify-content-between gap-4"
                    >
                      <p class="crypt-grayscale-600 mb-0">Minted</p>
                      <a
                        class="crypt-grayscale-100 d-flex align-items-center text-link"
                      >
                        <h3 class="text-link fw-bold mb-0">{{ minted }}</h3>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Daily Check-In -->
    <div class="card-bs container p-3 mb-2">
      <div class="d-flex justify-content-between">
        <h4 class="fw-medium mb-4">
          Complate all task --- {{ trueCount }}/3
        </h4>
        <div class="pb-2">
          <button
            @click="MintNft"
            v-if="connected"
            :disabled="!click1 || !click2 || !click3"
            class="btn btn-editor-sm btn-warning"
            role="button"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.75 9H14.25"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9 3.75V14.25"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Claim NFT
          </button>
          <button
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            v-else
            class="btn btn-editor-sm btn-warning"
            role="button"
          >
            Connect Wallet
          </button>
        </div>
      </div>

      <div class="wrappers">
        <div class="step">
          <div class="step-figure">
            <div class="bullet-circle circle-check">
              <svg
                width="16"
                height="17"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8 16.8252C10.1217 16.8252 12.1566 15.9823 13.6569 14.482C15.1571 12.9818 16 10.9469 16 8.8252C16 6.70346 15.1571 4.66863 13.6569 3.16834C12.1566 1.66805 10.1217 0.825195 8 0.825195C5.87827 0.825195 3.84344 1.66805 2.34315 3.16834C0.842855 4.66863 0 6.70346 0 8.8252C0 10.9469 0.842855 12.9818 2.34315 14.482C3.84344 15.9823 5.87827 16.8252 8 16.8252V16.8252ZM11.707 7.5322C11.8892 7.34359 11.99 7.09099 11.9877 6.82879C11.9854 6.5666 11.8802 6.31578 11.6948 6.13038C11.5094 5.94497 11.2586 5.8398 10.9964 5.83752C10.7342 5.83524 10.4816 5.93604 10.293 6.1182L7 9.4112L5.707 8.1182C5.5184 7.93604 5.2658 7.83524 5.0036 7.83752C4.7414 7.8398 4.49059 7.94497 4.30518 8.13038C4.11977 8.31578 4.0146 8.5666 4.01233 8.82879C4.01005 9.09099 4.11084 9.34359 4.293 9.5322L6.293 11.5322C6.48053 11.7197 6.73484 11.825 7 11.825C7.26516 11.825 7.51947 11.7197 7.707 11.5322L11.707 7.5322V7.5322Z"
                  fill="#6BD838"
                ></path>
              </svg>
            </div>
          </div>
          <div>
            <h6 class="crypt-grayscale-300 fs-6 mb-0">X follow</h6>
            <p class="crypt-grayscale-600 mb-0 mt-1">
              Click here to follow
              <a
                @click="clickcount('1')"
                target="_blank"
                href="https://x.com/Hazratalli02"
                class="text-info fw-medium"
                >Createlize Monad</a
              >
              on X.
            </p>
          </div>
        </div>
        <div class="step">
          <div class="step-figure">
            <div class="bullet-circle"></div>
          </div>
          <div>
            <h6 class="crypt-grayscale-300 fs-6 mb-0">Like & Repost</h6>
            <p class="crypt-grayscale-600 mb-0 mt-1">
              <a
                @click="clickcount('2')"
                target="_blank"
                href="https://x.com/Hazratalli02"
                class="text-info fw-medium"
                >Click here</a
              >
              and show your support — like & repost our pin post on X.
            </p>
          </div>
        </div>
        <div class="step">
          <div class="step-figure">
            <div class="bullet-circle"></div>
          </div>
          <div>
            <h6 class="crypt-grayscale-300 fs-6 mb-0">Join on TG</h6>
            <p class="crypt-grayscale-600 mb-0 mt-1">
              <a
                @click="clickcount('3')"
                target="_blank"
                href="https://t.me/crypto_minners2"
                class="text-info fw-medium"
                >Join our TG</a
              >
              to connect, engage, and stay updated with the community.
            </p>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>