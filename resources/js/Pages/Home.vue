<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import { onMounted } from "vue";
import { Head, Link, router } from "@inertiajs/vue3";
import {
  connectWallet,
  connected,
  account,
  disconnectWallet,
  setGreeting,
  isConnected,
} from "@/contract.js";

onMounted(() => {
  // Create the script element
  const script = document.createElement("script");
  script.src =
    "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
  script.async = true;

  // Widget config
  script.innerHTML = JSON.stringify({
    symbols: [
      { proName: "FOREXCOM:SPXUSD", title: "S&P 500 Index" },
      { proName: "FOREXCOM:NSXUSD", title: "US 100 Cash CFD" },
      { proName: "FX_IDC:EURUSD", title: "EUR to USD" },
      { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
      { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
    ],
    showSymbolLogo: true,
    isTransparent: true,
    displayMode: "adaptive",
    colorTheme: "dark",
    locale: "en",
  });

  // Append into container
  document
    .querySelector(".tradingview-widget-container__widget")
    .appendChild(script);
});
</script>
<template>
  <AppLayout>
    <Head title="Createlize monad testnet home page" />

    <div class="">
      <section class="container-fluid bs5-bg hero-temp1">
        <div class="container bs5-hero pt-5 p-0">
          <div class="d-sm-flex flex-row align-items-center mt-5 pt-5">
            <div class="col-md-6 in-view">
              <h1 class="fw-medium">
                Find the Next <span class="fw-bold gd-text">Crypto Gem</span>
              </h1>
              <p class="crypt-grayscale-300 mt-4">
                “Monad Testnet: Unlocking Limitless Opportunities with Trusted,
                Decentralized Freedom.”
              </p>
              <div class="d-flex align-items-center gap-3 mt-4">
                <Link :href="route('swap')" class="custom-btn btn-11"
                  ><span>Start Swaping</span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 7L13.5 15.5L8.5 10.5L2 17"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M16 7H22V13"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </Link>
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
                <button
                  v-else
                  class="btn btn-lg shiny-cta signup-btn"
             @click="setGreeting('hi monad')"
                >
                  
                  Say GMonad
                </button>
              </div>
              <div class="row mt-4 align-items-center">
                <p class="crypt-grayscale-500">
                  Excellent
                  <span class="crypt-grayscale-100 meta">4.7 out of 5</span>
                  <a href="https://www.createlize.org/" target="_blank">
                    Createlize
                  </a>
                </p>
              </div>
              <div class="d-flex flex-row gap-4 mt-5 mb-5">
                <div class="meta">
                  <h4>$12.46B+</h4>
                  <p class="mt-2">24h Trading Volume</p>
                </div>
                <div class="meta">
                  <h4>2600+</h4>
                  <p class="mt-2">Cryptocurrencies</p>
                </div>
                <div class="meta">
                  <h4>150%</h4>
                  <p class="mt-2">Simple Earn APR</p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <img
                class="ms-2"
                src="./../../assets/img/home.svg"
                alt=""
                width="700"
              />
            </div>
          </div>
        </div>
        <!-- TradingView Ticker -->

        <div
          class="tradingview-widget-container__widget mt-5 circle card-bs"
        ></div>
      </section>

      <!-- Trusted by industry leaders -->
      <section class="container mt-5">
        <h5 class="gd-text text-center text-uppercase">
          Trusted by industry leaders
        </h5>
        <div class="partner grayscale-item crypt-scroll in-view">
          <div class="crypt-scrolling scroll-right">
            <div>
              <img
                alt=""
                style="width: 200px"
                src="https://crypt.tophivetheme.com/demo/images/partner/logo-3.svg"
              />
            </div>
            <div>
              <img
                alt=""
                style="width: 200px"
                src="https://crypt.tophivetheme.com/demo/images/partner/logo-2.svg"
              />
            </div>
            <div>
              <img
                alt=""
                style="width: 200px"
                src="https://crypt.tophivetheme.com/demo/images/partner/logo-4.svg"
              />
            </div>
            <div>
              <img
                alt=""
                style="width: 200px"
                src="https://crypt.tophivetheme.com/demo/images/partner/logo-9.svg"
              />
            </div>
            <div>
              <img
                alt=""
                style="width: 200px"
                src="https://crypt.tophivetheme.com/demo/images/partner/logo-10.svg"
              />
            </div>
            <div>
              <img
                alt=""
                style="width: 200px"
                src="https://crypt.tophivetheme.com/demo/images/partner/logo-5.svg"
              />
            </div>
            <div>
              <img
                alt=""
                style="width: 200px"
                src="https://crypt.tophivetheme.com/demo/images/partner/logo-3.svg"
              />
            </div>
            <div>
              <img
                alt=""
                style="width: 200px"
                src="https://crypt.tophivetheme.com/demo/images/partner/logo-2.svg"
              />
            </div>
            <div>
              <img
                alt=""
                style="width: 200px"
                src="https://crypt.tophivetheme.com/demo/images/partner/logo-4.svg"
              />
            </div>
            <div>
              <img
                alt=""
                style="width: 200px"
                src="https://crypt.tophivetheme.com/demo/images/partner/logo-9.svg"
              />
            </div>
            <div>
              <img
                alt=""
                style="width: 200px"
                src="https://crypt.tophivetheme.com/demo/images/partner/logo-10.svg"
              />
            </div>
            <div>
              <img
                alt=""
                style="width: 200px"
                src="https://crypt.tophivetheme.com/demo/images/partner/logo-5.svg"
              />
            </div>
          </div>
        </div>
      </section>
      <!-- Products & Services -->
      <section class="container mt-5">
        <div class="row mt-5 pt-2">
          <div class="text-center in-view">
            <h2>
              Explore Crypt <span class="gd-text">Products & Services</span>
            </h2>
          </div>
        </div>
        <div class="row mt-5 pt-2">
          <div class="col-12 col-sm-12 col-md-12 col-lg-4 mb-4">
            <div class="card d-sm-flex flex-sm-row gap-3 p-4">
              <div class="in-view">
                <h4 class="card-title fw-medium mb-3">Spot Trading</h4>
                <p class="card-text">
                  The purpose of lorem ipsum is to create a natural looking
                  block of text sentence, paragraph, page, etc.
                </p>
              </div>
              <img
                class="mt-4"
                alt=""
                width="140"
                src="https://crypt.tophivetheme.com/demo/images/icon/spot.svg"
              />
            </div>
          </div>
          <div class="col-12 col-sm-12 col-md-12 col-lg-4 mb-4">
            <div class="card d-sm-flex flex-sm-row gap-3 p-4">
              <div class="in-view">
                <h4 class="card-title fw-medium mb-3">Buy Crypto</h4>
                <p class="card-text">
                  The purpose of lorem ipsum is to create a natural looking
                  block of text sentence, paragraph, page, etc.
                </p>
              </div>
              <img
                class="mt-4"
                alt=""
                width="140"
                src="https://crypt.tophivetheme.com/demo/images/icon/funding.svg"
              />
            </div>
          </div>
          <div class="col-12 col-sm-12 col-md-12 col-lg-4 mb-4">
            <div class="card d-sm-flex flex-sm-row gap-3 p-4">
              <div class="in-view">
                <h4 class="card-title fw-medium mb-3">Trading Bot</h4>
                <p class="card-text">
                  The purpose of lorem ipsum is to create a natural looking
                  block of text sentence, paragraph, page, etc.
                </p>
              </div>
              <img
                class="mt-4"
                alt=""
                width="140"
                src="https://crypt.tophivetheme.com/demo/images/icon/bot.svg"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-sm-12 col-md-12 col-lg-4 mb-4">
            <div class="card d-sm-flex flex-sm-row gap-3 p-4">
              <div class="in-view">
                <h4 class="card-title fw-medium mb-3">Crypt Earn</h4>
                <p class="card-text">
                  The purpose of lorem ipsum is to create a natural looking
                  block of text.
                </p>
              </div>
              <img
                class="mt-4 grayscale-item"
                alt=""
                width="140"
                src="https://crypt.tophivetheme.com/demo/images/icon/icon-20.svg"
              />
            </div>
          </div>
          <div class="col-12 col-sm-12 col-md-12 col-lg-4 mb-4">
            <div class="card d-sm-flex flex-sm-row gap-3 p-4">
              <div class="in-view">
                <h4 class="card-title fw-medium mb-3">Margin Trading</h4>
                <p class="card-text">
                  The purpose of lorem ipsum is to create a natural looking
                  block of text.
                </p>
              </div>
              <img
                class="mt-4 grayscale-item"
                alt=""
                width="140"
                src="https://crypt.tophivetheme.com/demo/images/icon/icon-23.svg"
              />
            </div>
          </div>
          <div class="col-12 col-sm-12 col-md-12 col-lg-4 mb-4">
            <div class="card d-sm-flex flex-sm-row gap-3 p-4">
              <div class="in-view">
                <h4 class="card-title fw-medium mb-3">Futures Trading</h4>
                <p class="card-text">
                  The purpose of lorem ipsum is to create a natural looking
                  block of text.
                </p>
              </div>
              <img
                class="mt-4 grayscale-item"
                alt=""
                width="140"
                src="https://crypt.tophivetheme.com/demo/images/icon/icon-21.svg"
              />
            </div>
          </div>
        </div>
      </section>
      <!-- How to get started -->
      <section class="container mt-0 mt-sm-5 pt-0 pt-sm-4">
        <div class="row align-items-center">
          <div class="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-7 p-5 in-view">
            <div class="text-left pb-4">
              <h2>How to Get Started</h2>
              <p class="crypt-grayscale-500 mt-3">
                You can receive your payments in your digital wallet in crypto
                or <br />in your bank account in fiat — it’s your choice.
              </p>
            </div>
            <div class="accordion">
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingFive">
                  <button
                    class="accordion-button fs-4 fw-medium"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFive"
                    aria-expanded="true"
                    aria-controls="collapseFive"
                  >
                    1. Create an account
                  </button>
                </h2>
                <div
                  id="collapseFive"
                  class="accordion-collapse collapse show"
                  aria-labelledby="headingFive"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    Pick one of 50 000+ supported currency pairs from the list.
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingSix">
                  <button
                    class="accordion-button collapsed fs-4 fw-medium"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseSix"
                    aria-expanded="false"
                    aria-controls="collapseSix"
                  >
                    2. Enter swap details
                  </button>
                </h2>
                <div
                  id="collapseSix"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingSix"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    Confirm details and send your assets to the generated
                    address.
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingSeven">
                  <button
                    class="accordion-button collapsed fs-4 fw-medium"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseSeven"
                    aria-expanded="false"
                    aria-controls="collapseSeven"
                  >
                    3. Trade your crypto
                  </button>
                </h2>
                <div
                  id="collapseSeven"
                  class="accordion-collapse collapse"
                  aria-labelledby="headingSeven"
                  data-bs-parent="#accordionExample"
                >
                  <div class="accordion-body">
                    Receive exchanged crypto with the best possible rate.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-5 in-view">
            <img
              class="grayscale-item"
              style="width: 100%"
              src="https://crypt.tophivetheme.com/demo/images/slider/crypt02.png"
              alt=""
            />
          </div>
        </div>
      </section>
      <!-- The best rate always -->
      <section class="container mt-4 mt-sm-5 pt-0 pt-sm-4">
        <h2 class="text-center">The Best Rate Always</h2>
        <div class="row mt-5 pt-2 in-view">
          <div class="col-md-4 mb-4">
            <div class="card card-border gd-bg">
              <div class="card-body">
                <img
                  class="grayscale-item"
                  src="https://crypt.tophivetheme.com/demo/images/icon/4.svg"
                  alt=""
                  width="80"
                />
                <h4 class="card-title mt-4 mb-2">No Hidden Fees</h4>
                <p class="card-text">
                  The purpose of lorem ipsum is to create a natural looking
                  block of text sentence, paragraph.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="card card-border gd-bg">
              <div class="card-body">
                <img
                  class="grayscale-item"
                  src="https://crypt.tophivetheme.com/demo/images/icon/13.svg"
                  alt=""
                  width="80"
                />
                <h4 class="card-title mt-4 mb-2">Competitive Rates</h4>
                <p class="card-text">
                  The purpose of lorem ipsum is to create a natural looking
                  block of text sentence, paragraph.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="card card-border gd-bg">
              <div class="card-body">
                <img
                  class="grayscale-item"
                  src="https://crypt.tophivetheme.com/demo/images/icon/10.svg"
                  alt=""
                  width="80"
                />
                <h4 class="card-title mt-4 mb-2">Secure Asset Storage</h4>
                <p class="card-text">
                  The purpose of lorem ipsum is to create a natural looking
                  block of text sentence, paragraph.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-8 mb-3">
            <div class="card p-4 bg-5">
              <div class="card-body in-view">
                <h2 class="gd-text mb-2">Trade Anytime, Anywhere</h2>
                <h5 class="text-white text-opacity-75 mt-3">
                  Easily embed the widget on your website or mobile app with
                  just a few clicks.
                </h5>
                <a
                  class="btn btn-editor btn-info mt-3"
                  href="exchange.html"
                  role="button"
                  >Start Copy Trading</a
                >
                <div class="pt-2">
                  <div class="attributes">
                    <!-- Content, Design, Speaking, Creative, Engineering  -->
                    <div class="attribute p-2">
                      <img
                        class=""
                        alt=""
                        style="width: 44px"
                        src="https://crypt.tophivetheme.com/demo/images/coin/tron.svg"
                      />
                      TRON
                    </div>
                    <div class="attribute">
                      <img
                        class=""
                        alt=""
                        style="width: 44px"
                        src="https://crypt.tophivetheme.com/demo/images/coin/bnb.svg"
                      />
                      Binance
                    </div>
                    <div class="attribute">
                      <img
                        class=""
                        alt=""
                        style="width: 44px"
                        src="https://crypt.tophivetheme.com/demo/images/coin/sol.svg"
                      />
                      Solana
                    </div>
                    <div class="attribute">
                      <img
                        class=""
                        alt=""
                        style="width: 44px"
                        src="https://crypt.tophivetheme.com/demo/images/coin/pepe.svg"
                      />
                      Pepe
                    </div>
                    <div class="attribute">
                      <img
                        class=""
                        alt=""
                        style="width: 44px"
                        src="https://crypt.tophivetheme.com/demo/images/coin/link.svg"
                      />
                      Chainlink
                    </div>
                  </div>
                </div>
                <img
                  class=""
                  alt=""
                  style="width: 100%"
                  src="https://crypt.tophivetheme.com/demo/images/slider/bg-5.png"
                />
                <div class="crypt-scroll">
                  <div class="crypt-scrolling">
                    <div>
                      <img
                        alt=""
                        style="width: 60px"
                        src="https://crypt.tophivetheme.com/demo/images/coin/avax.svg"
                      />
                    </div>
                    <div>
                      <img
                        alt=""
                        style="width: 60px"
                        src="https://crypt.tophivetheme.com/demo/images/coin/eth.svg"
                      />
                    </div>
                    <div>
                      <img
                        alt=""
                        style="width: 60px"
                        src="https://crypt.tophivetheme.com/demo/images/coin/link.svg"
                      />
                    </div>
                    <div>
                      <img
                        alt=""
                        style="width: 60px"
                        src="https://crypt.tophivetheme.com/demo/images/coin/sol.svg"
                      />
                    </div>
                    <div>
                      <img
                        alt=""
                        style="width: 60px"
                        src="https://crypt.tophivetheme.com/demo/images/coin/near.svg"
                      />
                    </div>
                    <div>
                      <img
                        alt=""
                        style="width: 60px"
                        src="https://crypt.tophivetheme.com/demo/images/coin/mnt.svg"
                      />
                    </div>
                    <div>
                      <img
                        alt=""
                        style="width: 60px"
                        src="https://crypt.tophivetheme.com/demo/images/coin/bnb.svg"
                      />
                    </div>
                    <div>
                      <img
                        alt=""
                        style="width: 60px"
                        src="https://crypt.tophivetheme.com/demo/images/coin/kas.svg"
                      />
                    </div>
                    <div>
                      <img
                        alt=""
                        style="width: 60px"
                        src="https://crypt.tophivetheme.com/demo/images/coin/apex.svg"
                      />
                    </div>
                    <div>
                      <img
                        alt=""
                        style="width: 60px"
                        src="https://crypt.tophivetheme.com/demo/images/coin/arb.svg"
                      />
                    </div>
                    <div>
                      <img
                        alt=""
                        style="width: 60px"
                        src="https://crypt.tophivetheme.com/demo/images/coin/wld.svg"
                      />
                    </div>
                    <div>
                      <img
                        alt=""
                        style="width: 60px"
                        src="https://crypt.tophivetheme.com/demo/images/coin/tron.svg"
                      />
                    </div>
                    <div>
                      <img
                        alt=""
                        style="width: 60px"
                        src="https://crypt.tophivetheme.com/demo/images/coin/sui.svg"
                      />
                    </div>
                    <div>
                      <img
                        alt=""
                        style="width: 60px"
                        src="https://crypt.tophivetheme.com/demo/images/coin/op.svg"
                      />
                    </div>
                    <div>
                      <img
                        alt=""
                        style="width: 60px"
                        src="https://crypt.tophivetheme.com/demo/images/coin/pepe.svg"
                      />
                    </div>
                    <div>
                      <img
                        alt=""
                        style="width: 60px"
                        src="https://crypt.tophivetheme.com/demo/images/coin/stx.svg"
                      />
                    </div>
                    <div>
                      <img
                        alt=""
                        style="width: 60px"
                        src="https://crypt.tophivetheme.com/demo/images/coin/btc.svg"
                      />
                    </div>
                    <div>
                      <img
                        alt=""
                        style="width: 60px"
                        src="https://crypt.tophivetheme.com/demo/images/coin/dot.svg"
                      />
                    </div>
                    <div>
                      <img
                        alt=""
                        style="width: 60px"
                        src="https://crypt.tophivetheme.com/demo/images/coin/ada.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div
              class="card card-border px-4 pb-0 gd-bg align-content-between h-100"
            >
              <h4 class="card-title mt-3 mb-2">
                Faster Trading, Better Assets
              </h4>
              <p class="card-text pb-3">
                The purpose of lorem ipsum is to create a natural looking block
                of text sentence.
              </p>
              <div class="crypt-scroll mt-2">
                <div class="crypt-scrolling scroll-right">
                  <div class="card-mordern wallet-card">
                    <img
                      class="me-2"
                      alt=""
                      style="width: 32px"
                      src="https://crypt.tophivetheme.com/demo/images/icon/metamask.svg"
                    />Metamask
                  </div>
                  <div class="card-mordern wallet-card">
                    <img
                      class="me-2"
                      alt=""
                      style="width: 32px"
                      src="https://crypt.tophivetheme.com/demo/images/icon/coinbase.svg"
                    />Coinbase
                  </div>
                  <div class="card-mordern wallet-card">
                    <img
                      class="me-2"
                      alt=""
                      style="width: 32px"
                      src="https://crypt.tophivetheme.com/demo/images/icon/phantom.svg"
                    />Phantom
                  </div>
                  <div class="card-mordern wallet-card">
                    <img
                      class="me-2"
                      alt=""
                      style="width: 32px"
                      src="https://crypt.tophivetheme.com/demo/images/icon/rainbow.svg"
                    />Rainbow
                  </div>
                  <div class="card-mordern wallet-card">
                    <img
                      class="me-2"
                      alt=""
                      style="width: 32px"
                      src="https://crypt.tophivetheme.com/demo/images/icon/ibw.svg"
                    />Install Bitget Wallet
                  </div>
                  <div class="card-mordern wallet-card">
                    <img
                      class="me-2"
                      alt=""
                      style="width: 32px"
                      src="https://crypt.tophivetheme.com/demo/images/icon/walletconnect.svg"
                    />WalletConnect
                  </div>
                  <div class="card-mordern wallet-card">
                    <img
                      class="me-2"
                      alt=""
                      style="width: 32px"
                      src="https://crypt.tophivetheme.com/demo/images/icon/passkeys.svg"
                    />Passkeys
                  </div>
                  <div class="card-mordern wallet-card">
                    <img
                      class="me-2"
                      alt=""
                      style="width: 32px"
                      src="https://crypt.tophivetheme.com/demo/images/icon/trustwallet.svg"
                    />Trustwallet
                  </div>
                  <div class="card-mordern wallet-card">
                    <img
                      class="me-2"
                      alt=""
                      style="width: 32px"
                      src="https://crypt.tophivetheme.com/demo/images/icon/bitkeep.svg"
                    />BitKeep
                  </div>
                </div>
              </div>
              <div class="mt-4">
                <img
                  class="bottom-0"
                  src="https://crypt.tophivetheme.com/demo/images/features/app.png"
                  alt=""
                  width="364"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Benefits -->
      <section class="container mt-4 mt-sm-5 pt-0 pt-sm-4">
        <div class="text-center">
          <h2>
            Benefits of <br />Buying Crypto with
            <span class="gd-text">Every Trader</span>
          </h2>
          <p class="card-text crypt-grayscale-500 mt-3">
            We eliminate obstacles that stand in the way of your success.
          </p>
        </div>
        <div class="row pt-5">
          <div class="col-12 col-md-6 mb-3">
            <div class="card p-4 pt-0 pe-0 bg-3 in-view h-100">
              <div class="">
                <img
                  class="float-end"
                  src="https://crypt.tophivetheme.com/demo/images/features/candles.png"
                  alt=""
                  width="260"
                />
              </div>
              <h3 class="fw-bold text-dark">New to Trading?</h3>
              <p class="card-text text-dark text-opacity-75 pe-4">
                Take advantage of our promotions and demo account to practice
                risk-free. Master the markets with insights from our team of
                more than 70 expert educators.
              </p>
              <div class="d-flex mt-4">
                <a class="btn btn-editor btn-info mb-2" href="#!" role="button"
                  >Start With Confidence</a
                >
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6 mb-3">
            <div class="card p-4 pb-0 bg-1 in-view">
              <h3 class="fw-bold text-dark">Experienced Trader?</h3>
              <p class="card-text text-dark text-opacity-75 pe-4">
                Enjoy a premium experience designed for seasoned traders with
                rewarding benefits including access to the widest selection
                trading tools.
              </p>
              <div class="d-flex mt-4">
                <a
                  class="btn btn-editor btn-primary mb-2"
                  href="#!"
                  role="button"
                  >Discover Our Offering</a
                >
              </div>
              <div class="float-end">
                <img
                  class="float-end"
                  src="https://crypt.tophivetheme.com/demo/images/features/experienced-trade.png"
                  alt=""
                  width="260"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Blog -->
      <section class="container mt-4 mt-sm-5 pt-0 pt-sm-4">
        <div class="text-center">
          <h2>Stay Updated with Our Blog</h2>
        </div>
        <div class="row pt-5">
          <div class="col-12 col-md-4 mb-4">
            <a href="blog-single.html" class="blog-card">
              <div
                class="thumb"
                style="background-image: url(images/blog/blog-12.jpg)"
              ></div>
              <div class="meta p-3">
                <span class="badge badge text-uppercase text-bg-success"
                  >Metaverse</span
                >
                <h5 class="title-link">
                  FOMC holds rates steady, Bitcoin and Ethereum price decline
                </h5>
                <p class="crypt-grayscale-600">
                  2 mins read / updated on Tue Dec 29 2024
                </p>
              </div>
            </a>
          </div>
          <div class="col-12 col-md-4 mb-4">
            <a href="blog-single.html" class="blog-card">
              <div
                class="thumb"
                style="background-image: url(images/blog/blog-13.jpg)"
              ></div>
              <div class="meta p-3">
                <span class="badge badge text-uppercase text-bg-info"
                  >Ethereum</span
                >
                <h5 class="title-link">
                  Restaking with ETHx | Boosted reward programs
                </h5>
                <p class="crypt-grayscale-600">
                  4 mins read / updated on Fri Oct 15 2024
                </p>
              </div>
            </a>
          </div>
          <div class="col-12 col-md-4 mb-4">
            <a href="blog-single.html" class="blog-card">
              <div
                class="thumb"
                style="background-image: url(images/blog/blog-14.jpg)"
              ></div>
              <div class="meta p-3">
                <span class="badge badge text-uppercase text-bg-warning"
                  >Trading</span
                >
                <h5 class="title-link">
                  Wrapping tokens enables broader across the Web3 ecosystem
                </h5>
                <p class="crypt-grayscale-600">
                  5 mins read / updated on Sat May 22 2024
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>
      <!-- FAQ -->
      <section class="container faqs mt-4 mt-sm-5 pt-0 pt-sm-4">
        <h2 class="text-center">FAQ</h2>
        <div class="accordion pt-5 pb-4 in-view">
          <div class="accordion-item">
            <div class="accordion-header" id="headingOne">
              <button
                class="accordion-button fs-5"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                What are the benefits of staking?
              </button>
            </div>
            <div
              id="collapseOne"
              class="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                The passage experienced today it's seen all around the web; on
                templates, websites, and stock designs. Use our generator to get
                your own, or read on for the authoritative history of lorem
                ipsum.
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <div class="accordion-header" id="headingTwo">
              <button
                class="accordion-button fs-5 collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                What is a blockchain API?
              </button>
            </div>
            <div
              id="collapseTwo"
              class="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                Letraset used it on their dry-transfer sheets, and again during
                the 90s as desktop publishers bundled the text with their
                software. Today it's seen all around the web; on templates,
                websites, and stock designs. Use our generator to get your own,
                or read on for the authoritative history of lorem ipsum.
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <div class="accordion-header" id="headingThree">
              <button
                class="accordion-button fs-5 collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                How do I get blockchain API?
              </button>
            </div>
            <div
              id="collapseThree"
              class="accordion-collapse collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                The passage experienced a surge in popularity during the 1980s
                when Letraset used it on their dry-transfer sheets, and again
                during the 90s as desktop publishers bundled the text with their
                software. Today it's seen all around the web on templates,
                websites, and stock designs.
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <div class="accordion-header" id="headingFour">
              <button
                class="accordion-button fs-5 collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFour"
                aria-expanded="false"
                aria-controls="collapseFour"
              >
                How do nodes work?
              </button>
            </div>
            <div
              id="collapseFour"
              class="accordion-collapse collapse"
              aria-labelledby="headingFour"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                The placeholder text, beginning with the line “Lorem ipsum dolor
                sit amet, consectetur adipiscing elit”, looks like Latin because
                in its youth, centuries ago, it was Latin.
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Newsletter -->
      <section class="container mt-4 mt-sm-5 pt-0 pt-sm-4 pb-5 nl-bg">
        <div class="row newsletter justify-content-center" id="contact">
          <div class="d-flex flex-column text-center mb-4">
            <h2 class="text-center text-uppercase mb-2" id="news">
              Join Our 💌 Newsletter!
            </h2>
            <p class="text-center m-auto fs-6 crypt-grayscale-500 mt-2">
              Get updates, insights, and reports on the latest industry trends.
            </p>
          </div>
          <div class="newsletter-form newsletter text-center mt-4">
            <p class="crypt-grayscale-400" id="distance">
              Don't be shy. You are <span id="distance_text">0</span> pixels
              away from hitting that button!
            </p>
            <form>
              <input
                type="email"
                maxlength="50"
                id="exampleFormControlInput1"
                required
                placeholder="Enter your email address"
              />
              <button id="element" class="btn btn-lg shiny-cta signup-btn">
                Subscribe
              </button>
            </form>
          </div>
          <div
            class="d-flex flex-row justify-content-center align-items-center text-center gap-1 mt-3"
          >
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
              ></path>
              <path
                d="M6.75 9L8.25 10.5L11.25 7.5"
                stroke="#339af0"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            <h6 class="crypt-grayscale-500 mb-0">
              You are subscribing to all our networks
              <a class="text-info text-link" href="#!">Select networks</a>
            </h6>
          </div>
        </div>
      </section>
    </div>
  </AppLayout>
</template>

