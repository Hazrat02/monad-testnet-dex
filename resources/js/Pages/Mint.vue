<script setup>
import { connected,MintToken,account,contract,NextClaim } from "@/contract";
import AppLayout from "@/Layouts/AppLayout.vue";
import { getWithTTL,setWithTTL } from "@/localstorage";
import { Head, Link } from "@inertiajs/vue3";
import { ref, computed, onMounted, onUnmounted,watch  } from 'vue'








const CLAIM_INTERVAL = 24 * 60 * 60 // 24 hours in seconds
const secondsLeft = ref(CLAIM_INTERVAL)
let timerInterval = null

function startCountdown(targetTime) {
  clearInterval(timerInterval)
  const update = () => {
    const now = Math.floor(Date.now() / 1000)
    const diff = targetTime - now
    secondsLeft.value = diff > 0 ? diff : 0
    if (secondsLeft.value <= 0) clearInterval(timerInterval)
  }
  update() // run immediately
  timerInterval = setInterval(update, 1000)
}

async function fetchLastClaim() {
  if (!contract || !account.value) return

  const last = await contract.getLastClaim(account.value) // BigInt
  const lastClaim = Number(last) // convert to Number

  // store locally to persist across reloads
  setWithTTL('lastClaimed', lastClaim)

  const targetTime = lastClaim + CLAIM_INTERVAL
  startCountdown(targetTime)
}

// onMounted: first try local storage, fallback to blockchain
onMounted(() => {
  const storedLast = getWithTTL('lastClaimed')
  if (storedLast) {
    const targetTime = Number(storedLast) + CLAIM_INTERVAL
    startCountdown(targetTime)
  } else {
    fetchLastClaim()
  }
})

// watch for account or contract changes
watch(NextClaim, fetchLastClaim, { immediate: true })

onUnmounted(() => {
  clearInterval(timerInterval)
})

const formattedTime = computed(() => {
  const sec = secondsLeft.value
  const hrs = Math.floor(sec / 3600)
  const mins = Math.floor((sec % 3600) / 60)
  const secs = sec % 60
  return `${hrs.toString().padStart(2,'0')}:${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`
})





</script>
<template>
  <AppLayout>
    <Head title="Createlize monad testnet Token mint page" />
    <div class="container-fluid pt-5">
      <div class="row">
        <!-- Main -->
        <div class="col-md-12 col-xl-12 col-xxl-8 g-2 mb-2">
          <!-- Hero -->
          <div class="card-bs reward-bg p-4 mb-2">
            <span class="fs-2 text-uppercase fw-medium mb-0 gd-text1"
              >Earn Free</span
            >
            <h2 class="text-uppercase fw-medium mb-0 text-white">
              Crypto Today
            </h2>
            <p
              class="col-md-8 col-lg-5 col-sm-12 text-white text-opacity-75 mb-3"
            >
              You now have full access to all of Coin's features, and are in the
              highest tier for transaction limits.
            </p>
            <a v-if="connected && Number(secondsLeft) === 0"
              class="btn btn-lg shiny-cta"
            @click="MintToken"
              >Claim now</a
            >
           
            <button 
            disabled
         v-if="connected && Number(secondsLeft) > 0"
            
              class="btn btn-lg shiny-cta"
            
          
              >Next Claim: {{formattedTime}}</button
            >
                <button
              v-if="!connected"
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
            <div class="d-sm-flex flex-row gap-4 mt-4">
              <div class="d-flex flex-row align-items-center gap-1 mb-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z"
                    fill="#339af0"
                    fill-opacity="0.23"
                  />
                  <path
                    d="M6.75 9L8.25 10.5L11.25 7.5"
                    stroke="#339af0"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <h6 class="text-white mb-0">
                  <span class="text-info">Unlimited</span> Deposit & Withdrawal
                  Limits
                </h6>
              </div>
              <div class="d-flex flex-row align-items-center gap-1 mb-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z"
                    fill="#339af0"
                    fill-opacity="0.23"
                  />
                  <path
                    d="M6.75 9L8.25 10.5L11.25 7.5"
                    stroke="#339af0"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <h6 class="text-white mb-0">
                  CryptCoin <span class="text-primary">Earn</span>
                </h6>
              </div>
              <div class="d-flex flex-row align-items-center gap-1 mb-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z"
                    fill="#339af0"
                    fill-opacity="0.23"
                  />
                  <path
                    d="M6.75 9L8.25 10.5L11.25 7.5"
                    stroke="#339af0"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <h6 class="text-white mb-0">
                  <span class="text-info">Enhanced </span>due dilligence
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Card -->

    <div style="margin-bottom: 50vW;"
      class="modal fade"
      id="CuponCrypto"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header border-0 mt-2 d-flex">
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
            <div class="d-flex flex-column mb-3 text-center">
              <h2 class="fw-bold text-info mb-3">
                <span class="crypt-grayscale-300">Connecting..</span>
              </h2>
              <p class="crypt-grayscale-500">
                Accept connection request in the wallet
              </p>
            </div>
            <div class="mt-3 mb-4 p-3 row justify-content-center">
              <div class="spinner-wrapper" role="status" aria-label="Loading">
                <div class="spinner"></div>
                <img class="circle-img" src="img/circle-logo.png" alt="Logo" />
              </div>
            </div>
           
          </div>
        </div>
      </div>
    </div>
    <!-- <div
      class="modal fade"
      id="CuponCrypto"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header border-0 mt-2 d-flex">
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
            <div class="d-flex flex-column mb-3 text-center">
              <h6 class="text-light fs-6 fw-bold mb-4">🎉You have received</h6>
              <h2 class="fw-bold text-info mb-3">
                1 <span class="crypt-grayscale-300">coupon(s)</span>
              </h2>
              <p class="crypt-grayscale-500">
                Use the coupon from
                <span class="text-warning">Create Trading Bot</span>
              </p>
            </div>
            <div class="cupons mt-3 mb-4 p-3">
              <div class="d-flex align-items-center py-2">
                <div class="flex">
                  <span class="text-dark fs-2 fw-bold">30%</span>
                  <div class="text-dark fs-6">OFF</div>
                </div>
                <div class="vr mx-3"></div>
                <div class="flex">
                  <div class="text-dark fs-5 fw-bold mb-1">
                    $100 TradingBot Coupon
                  </div>
                  <p class="text-dark text-opacity-75 mb-0">
                    Expires on 2024/12/15 (UTC)
                  </p>
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <p class="text-dark text-sm mb-0">
                  Applicable to all trading bots
                </p>
                <button class="btn btn-editor circle btn-warning" type="button">
                  Use now
                </button>
              </div>
            </div>
            <div class="d-grid text-center gap-3 mt-3 mb-3">
              <a class="btn btn-lg btn-primary" href="#!" role="button"
                >Claim</a
              >
              <small class="text-dark crypt-grayscale-600 mb-0"
                >Manage rewards programs anytime in Settings</small
              >
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </AppLayout>
</template>

