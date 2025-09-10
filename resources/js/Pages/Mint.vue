<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import { Head,Link } from "@inertiajs/vue3";
import { ref, onMounted,computed } from "vue";


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
                        <span class="fs-2 text-uppercase fw-medium mb-0 gd-text1">Earn Free</span>
                        <h2 class="text-uppercase fw-medium mb-0 text-white">Crypto Today</h2>
                        <p class="col-md-8 col-lg-5 col-sm-12 text-white text-opacity-75 mb-3">You now have full access to all of Coin's features, and are in the highest tier for transaction limits.</p>
                        <a class="btn btn-lg shiny-cta" href="#!" data-bs-toggle="modal" data-bs-target="#CuponCrypto">Claim now</a>
                        <div class="d-sm-flex flex-row gap-4 mt-4">
                            <div class="d-flex flex-row align-items-center gap-1 mb-2">
                                <svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" fill="#339af0" fill-opacity="0.23"/>
                                    <path d="M6.75 9L8.25 10.5L11.25 7.5" stroke="#339af0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <h6 class="text-white mb-0"><span class="text-info">Unlimited</span> Deposit & Withdrawal Limits</h6>
                            </div>
                            <div class="d-flex flex-row align-items-center gap-1 mb-2">
                                <svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" fill="#339af0" fill-opacity="0.23"/>
                                    <path d="M6.75 9L8.25 10.5L11.25 7.5" stroke="#339af0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <h6 class="text-white mb-0">CryptCoin <span class="text-primary">Earn</span></h6>
                            </div>
                            <div class="d-flex flex-row align-items-center gap-1 mb-2">
                                <svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" fill="#339af0" fill-opacity="0.23"/>
                                    <path d="M6.75 9L8.25 10.5L11.25 7.5" stroke="#339af0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <h6 class="text-white mb-0"><span class="text-info">Enhanced </span>due dilligence</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </div>
                    <!-- Card -->

                    <div class="modal fade" id="CuponCrypto" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header border-0 mt-2 d-flex">
                    <button type="button" class="btn-close text-reset close-notify align-items-center justify-content-center" data-bs-dismiss="modal" aria-label="Close">
                        <svg class="close-notify" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.5 4.5L4.5 13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M4.5 4.5L13.5 13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
                <div class="modal-body">
                    <!--Rewards -->
                    <div class="d-flex flex-column mb-3 text-center">
                        <h6 class="text-light fs-6 fw-bold mb-4">🎉You have received</h6>
                        <h2 class="fw-bold text-info mb-3">1 <span class="crypt-grayscale-300">coupon(s)</span></h2>
                        <p class="crypt-grayscale-500">Use the coupon from <span class="text-warning">Create Trading Bot</span></p>
                    </div>
                    <!--Ticket -->
                    <div class="cupons mt-3 mb-4 p-3">
                        <div class="d-flex align-items-center py-2">
                            <div class="flex">
                                <span class="text-dark fs-2 fw-bold">30%</span>
                                <div class="text-dark fs-6">OFF</div>
                            </div>
                            <div class="vr mx-3"></div>
                            <div class="flex">
                                <div class="text-dark fs-5 fw-bold mb-1">$100 TradingBot Coupon</div>
                                <p class="text-dark text-opacity-75 mb-0">Expires on 2024/12/15 (UTC)</p>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <p class="text-dark text-sm mb-0">Applicable to all trading bots</p>
                            <button class="btn btn-editor circle btn-warning" type="button">Use now</button>
                        </div>
                    </div>
                    <div class="d-grid text-center gap-3 mt-3 mb-3">
                        <a class="btn btn-lg btn-primary" href="#!" role="button">Claim</a>
                        <small class="text-dark crypt-grayscale-600 mb-0">Manage rewards programs anytime in Settings</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
  </AppLayout>
    
</template>