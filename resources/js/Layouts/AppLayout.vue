<script setup>
import { ref } from "vue";
import { Head, Link, router } from "@inertiajs/vue3";
import { connectWallet, connected, account } from "@/contract.js";
</script>

<template>
  <body class="crypt-dark">
    <Head :title="title" />

    <!-- Header -->
    <header class="crypt-header blur-header align-items-center fixed-top z-3 ">
      <div class="row align-items-center justify-content-between">
        <div class="col-auto d-flex flex-row align-items-center">

          <div class="crypt-logo dark">
            <a href="template-1.html">
              <img
                src="https://crypt.tophivetheme.com/demo/images/logo-dark.svg"
                alt=""
              />
            </a>
          </div>
          <div class="crypt-logo light">
            <a href="template-1.html">
              <img
                src="https://crypt.tophivetheme.com/demo/images/logo.svg"
                alt=""
              />
            </a>
          </div>

          <div class="flex hidesmscreen">
            <ul
              class="d-flex flex-row align-items-center not-apply-bg gap-4 mb-0"
            >
              <li class="dropdown nav-item profile_menu">
                <a
                  class="nav-link crypto-has-dropdown fw-medium"
                  href="#!"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Landing Page
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
                <ul class="profile_menu dropdown-menu dropdown-menu-shows">
                  <li>
                    <a
                      class="dropdown-item d-flex justify-content-between align-content-center"
                      href="./template-1.html"
                    >
                      Template 1
                      <span
                        class="verified alert align-items-center d-flex mb-0"
                      >
                        NEW
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      class="dropdown-item d-flex justify-content-between align-content-center"
                      href="./template-2.html"
                    >
                      Template 2
                      <span
                        class="verified alert align-items-center d-flex mb-0"
                      >
                        NEW
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      class="dropdown-item d-flex justify-content-between align-content-center"
                      href="./template-3.html"
                    >
                      Template 3
                      <span
                        class="verified alert align-items-center d-flex mb-0"
                      >
                        NEW
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      class="dropdown-item d-flex justify-content-between align-content-center"
                      href="./template-4.html"
                    >
                      Template 4
                      <span
                        class="verified alert align-items-center d-flex mb-0"
                      >
                        NEW
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      class="dropdown-item d-flex justify-content-between align-content-center"
                      href="./template-5.html"
                    >
                      Template 5
                      <span
                        class="verified alert align-items-center d-flex mb-0"
                      >
                        NEW
                      </span>
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="./template-6.html"
                      >Template 6</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" href="./template-7.html"
                      >Template 7</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" href="./template-8.html"
                      >Template 8</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" href="./template-9.html"
                      >Template 9</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" href="./template-10.html"
                      >Template 10</a
                    >
                  </li>
                </ul>
              </li>


              <li class="nav-item dropdown profile_menu">
                <a
                  class="nav-link crypto-has-dropdown fw-medium"
                  href="#!"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Exchange
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
                <ul class="profile_menu dropdown-menu dropdown-menu-shows">
                  <li>
                    <a class="dropdown-item" href="./exchange-1.html"
                      >Exchange 1</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" href="./exchange-2.html"
                      >Exchange 2</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" href="./exchange-3.html"
                      >Exchange 3</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" href="./exchange-4.html"
                      >Exchange 4</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" href="./exchange-5.html"
                      >Exchange 5</a
                    >
                  </li>
                </ul>
              </li>


              <li class="nav-item dropdown profile_menu">
                <a
                  class="nav-link crypto-has-dropdown fw-medium"
                  href="#!"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Markets
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
                <ul class="profile_menu dropdown-menu dropdown-menu-shows">
                  <li>
                    <a class="dropdown-item" href="./market.html">All Market</a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="./price.html"
                      >Coin Overview</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" href="./highlights.html"
                      >Crypto Highlights</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" href="./marketcap.html"
                      >Market Cap</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" href="./symbols.html">Symbols</a>
                  </li>
                </ul>
              </li>


              <li class="nav-item dropdown profile_menu">
                <a
                  class="nav-link crypto-has-dropdown fw-medium"
                  href="#!"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Blog
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
                <ul class="profile_menu dropdown-menu dropdown-menu-shows">
                  <li>
                    <a class="dropdown-item" href="./blog.html">Blog Classic</a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="./blog-single.html"
                      >Blog Single</a
                    >
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <!-- secondary menu -->
        <div class="col-auto d-flex flex-row align-items-center">
          <div class="user-settings gap-2 gap-sm-3">

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
                      <h4 class="fw-bold crypt-grayscale-400 mb-0 encrypted">
                        0.00000
                      </h4>
                    </div>
                    <div>
                      <select
                        class="form-select text-bg-bs2 crypt-grayscale-600"
                      >
                        <option selected>BTC</option>
                        <option value="1">ETH</option>
                        <option value="2">BNB</option>
                        <option value="3">USDT</option>
                      </select>
                    </div>
                  </div>
                  <h6 class="text-sm crypt-grayscale-600 encrypted">
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
                      />
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
                      />
                      <path
                        opacity="0.4"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M17.9431 13.0726C19.1897 12.1633 19.9997 10.6914 19.9997 9.03024C19.9997 6.26883 17.7612 4.03027 14.9998 4.03027C13.3386 4.03027 11.8667 4.84034 10.9575 6.08698C14.6102 6.52271 17.5073 9.41976 17.9431 13.0726Z"
                        fill="currentColor"
                      />
                      <path
                        opacity="0.4"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M18.811 19.7803L20.5306 21.5L19.47 22.5606L16.5054 19.596C16.1929 19.2836 16.1929 18.777 16.5054 18.4646L19.47 15.5L20.5306 16.5607L18.811 18.2803H23.0003V19.7803H18.811Z"
                        fill="currentColor"
                      />
                      <path
                        opacity="0.4"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.18931 5.7803L3.46966 7.49996L4.53031 8.56061L7.49493 5.59599C7.80735 5.28357 7.80735 4.77704 7.49494 4.46463L4.53031 1.5L3.46966 2.56065L5.18931 4.28031H1V5.7803H5.18931Z"
                        fill="currentColor"
                      />
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
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M17.6034 13.3978C20.6321 12.5862 22.4295 9.47303 21.6179 6.44429C20.8064 3.41557 17.6932 1.61818 14.6645 2.42972C11.6358 3.24127 9.83842 6.35443 10.6499 9.38316C11.4615 12.4119 14.5746 14.2093 17.6034 13.3978ZM15.6444 6.08567L14.3062 8.40349L16.6241 9.74168L17.9623 7.42386L15.6444 6.08567Z"
                        fill="currentColor"
                      />
                      <path
                        opacity="0.4"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M20.958 14.9477L4.50603 19.356L4.13867 17.985L20.5906 13.5767L20.958 14.9477Z"
                        fill="currentColor"
                      />
                      <path
                        opacity="0.4"
                        d="M11.8706 20.4531L13.763 17.6143L15.6555 20.4531H11.8706Z"
                        fill="currentColor"
                      />
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
                      />
                      <path
                        opacity="0.4"
                        d="M4.16992 9.80079C5.18954 6.44343 8.30936 4 11.9999 4C16.5185 4 20.1817 7.66312 20.1817 12.1818L22.0001 9.45454"
                        stroke="currentColor"
                        stroke-width="1.36364"
                        stroke-linejoin="round"
                      />
                      <path
                        opacity="0.4"
                        d="M19.8302 14.5626C18.8106 17.92 15.6908 20.3634 12.0003 20.3634C7.48159 20.3634 3.81847 16.7003 3.81847 12.1816L2 14.9089"
                        stroke="currentColor"
                        stroke-width="1.36364"
                        stroke-linejoin="round"
                      />
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
                      />
                      <path
                        opacity="0.4"
                        d="M23 10H21V14H23V10Z"
                        fill="currentColor"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M6 5C4.89543 5 4 5.89543 4 7V17C4 18.1046 4.89543 19 6 19H18C19.1046 19 20 18.1046 20 17V7C20 5.89543 19.1046 5 18 5H6ZM9.99991 8H7.99991V11H9.99991V8ZM14.3997 13.2004C13.7311 13.7027 12.9019 14 12.0003 14C11.0985 14 10.269 13.7027 9.6005 13.2005L8.39915 14.7995C9.40214 15.553 10.6505 16 12.0003 16C13.3502 16 14.5982 15.5528 15.601 14.7995L14.3997 13.2004ZM13.9998 8H15.9998V11H13.9998V8Z"
                        fill="currentColor"
                      />
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
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M9 14.5C12.3137 14.5 15 11.8137 15 8.5C15 5.18629 12.3137 2.5 9 2.5C5.68629 2.5 3 5.18629 3 8.5C3 11.8137 5.68629 14.5 9 14.5ZM9 6.5L7 8.5L9 10.5L11 8.5L9 6.5Z"
                        fill="currentColor"
                      />
                      <path
                        opacity="0.4"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M15.0005 13.4494C16.0742 12.0877 16.7148 10.3686 16.7148 8.5C16.7148 6.63135 16.0742 4.91234 15.0005 3.55065C15.2338 3.51727 15.4723 3.5 15.7148 3.5C18.4763 3.5 20.7148 5.73858 20.7148 8.5C20.7148 11.2614 18.4763 13.5 15.7148 13.5C15.4723 13.5 15.2338 13.4827 15.0005 13.4494Z"
                        fill="currentColor"
                      />
                    </svg>
                    Earn
                  </a>
                </div>
              </div>
            </div>


            <div class="dropdown profile_menu disable-sm-screen">

              <a
                class="nav-link crypto-has-dropdown fw-medium"
                href="#!"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Orders
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

              <!-- dropdown menu link -->
              <ul class="profile_menu dropdown-menu dropdown-menu-shows">
                <li>
                  <a class="dropdown-item" href="order-history.html">
                    Spot Orders
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="order-history.html">
                    Margin Orders
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="order-history.html">
                    Funding Orders
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="order-history.html">
                    Earn Orders
                  </a>
                </li>
              </ul>
            </div>

    
              <button v-if="!connected" class="btn btn-lg shiny-cta signup-btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop"> <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.5 10.5V14.5H17.5C16.9696 14.5 16.4609 14.2893 16.0858 13.9142C15.7107 13.5391 15.5 13.0304 15.5 12.5C15.5 11.9696 15.7107 11.4609 16.0858 11.0858C16.4609 10.7107 16.9696 10.5 17.5 10.5H21.5ZM18 12.69C18.0149 12.6275 18.0149 12.5625 18 12.5C18.0008 12.4344 17.9879 12.3694 17.962 12.3091C17.9362 12.2489 17.898 12.1946 17.85 12.15C17.7565 12.0584 17.6309 12.0071 17.5 12.0071C17.3691 12.0071 17.2435 12.0584 17.15 12.15C17.102 12.1946 17.0638 12.2489 17.038 12.3091C17.0121 12.3694 16.9992 12.4344 17 12.5C16.9979 12.5658 17.0102 12.6312 17.0362 12.6916C17.0621 12.7521 17.1009 12.8062 17.15 12.85C17.1949 12.8978 17.2491 12.936 17.3093 12.962C17.3695 12.9881 17.4344 13.0015 17.5 13.0015C17.5656 13.0015 17.6305 12.9881 17.6907 12.962C17.7509 12.936 17.8051 12.8978 17.85 12.85C17.9154 12.8136 17.9679 12.7576 18 12.69Z" fill="#facc15"/>
                                <path d="M18 12.5C18.0149 12.5625 18.0149 12.6275 18 12.69C17.9787 12.7524 17.9407 12.8078 17.89 12.85C17.8451 12.8978 17.7909 12.936 17.7307 12.962C17.6705 12.9881 17.6056 13.0015 17.54 13.0015C17.4744 13.0015 17.4095 12.9881 17.3493 12.962C17.2891 12.936 17.2349 12.8978 17.19 12.85C17.1336 12.8102 17.0872 12.7579 17.0542 12.6972C17.0213 12.6365 17.0027 12.569 17 12.5C16.9992 12.4344 17.0122 12.3694 17.038 12.3091C17.0638 12.2489 17.102 12.1947 17.15 12.15C17.2435 12.0584 17.3692 12.0071 17.5 12.0071C17.6309 12.0071 17.7566 12.0584 17.85 12.15C17.8981 12.1947 17.9362 12.2489 17.9621 12.3091C17.9879 12.3694 18.0008 12.4344 18 12.5Z" fill="currentColor"/>
                                <path d="M18.5 20H5.5C4.83696 20 4.20107 19.7366 3.73223 19.2678C3.26339 18.7989 3 18.163 3 17.5V7.5C3 6.83696 3.26339 6.20107 3.73223 5.73223C4.20107 5.26339 4.83696 5 5.5 5H18.5C19.163 5 19.7989 5.26339 20.2678 5.73223C20.7366 6.20107 21 6.83696 21 7.5V10.5C21 10.6326 20.9473 10.7598 20.8536 10.8536C20.7598 10.9473 20.6326 11 20.5 11C20.3674 11 20.2402 10.9473 20.1464 10.8536C20.0527 10.7598 20 10.6326 20 10.5V7.5C20 7.10218 19.842 6.72064 19.5607 6.43934C19.2794 6.15804 18.8978 6 18.5 6H5.5C5.10218 6 4.72064 6.15804 4.43934 6.43934C4.15804 6.72064 4 7.10218 4 7.5V17.5C4 17.8978 4.15804 18.2794 4.43934 18.5607C4.72064 18.842 5.10218 19 5.5 19H18.5C18.8978 19 19.2794 18.842 19.5607 18.5607C19.842 18.2794 20 17.8978 20 17.5V14.5C20 14.3674 20.0527 14.2402 20.1464 14.1464C20.2402 14.0527 20.3674 14 20.5 14C20.6326 14 20.7598 14.0527 20.8536 14.1464C20.9473 14.2402 21 14.3674 21 14.5V17.5C21 18.163 20.7366 18.7989 20.2678 19.2678C19.7989 19.7366 19.163 20 18.5 20Z" fill="currentColor"/>
                                <path d="M21.5 15.0001H17.5C16.837 15.0001 16.2011 14.7367 15.7323 14.2679C15.2634 13.799 15 13.1632 15 12.5001C14.9985 12.1706 15.0633 11.8441 15.1904 11.54C15.3175 11.2359 15.5044 10.9605 15.74 10.7301C15.9691 10.4961 16.243 10.3109 16.5455 10.1854C16.8479 10.06 17.1726 9.99694 17.5 10.0001H21.5C21.6326 10.0001 21.7598 10.0528 21.8536 10.1466C21.9473 10.2403 22 10.3675 22 10.5001V14.5001C22 14.6327 21.9473 14.7599 21.8536 14.8537C21.7598 14.9474 21.6326 15.0001 21.5 15.0001ZM17.5 11.0001C17.1038 11.0053 16.7253 11.165 16.4451 11.4452C16.1649 11.7254 16.0052 12.1039 16 12.5001C16 12.8979 16.1581 13.2795 16.4394 13.5608C16.7207 13.8421 17.1022 14.0001 17.5 14.0001H21V11.0001H17.5Z" fill="currentColor"/>
                            </svg>
                            Connect Wallet</button>

     
            <div v-else class="profile_menu d-flex align-items-center">
              <div class="dropdown">
                <button
                  class="btn btn-secondary dropdown-toggle no-active d-flex align-items-center"
                  type="button"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-expanded="false"
                >
                  <img
                    alt=""
                    src="https://crypt.tophivetheme.com/demo/images/social/user.png"
                  />
                </button>
                <ul class="dropdown-menu">
                  <li class="wallet align-items-center">
                    <img
                      alt=""
                      src="https://crypt.tophivetheme.com/demo/images/social/user.png"
                    />
                    <div class="d-grid">
                      <h6 class="fw-bold crypt-grayscale-100 mb-0">
                        jh***@gmail.com
                      </h6>
                      <a class="d-flex gap-2 mb-2 verified mt-2" href="#!">
                        <p class="crypt-grayscale-600 mb-0">UID:</p>
                        <p class="crypt-grayscale-100 mb-0">35403204</p>
                        <div
                          class="crypt-grayscale-500"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
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
                  </li>
                  <li class="mt-2">
                    <a class="dropdown-item" href="./my-dashboard.html">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.4"
                          d="M18.6699 2H16.7699C14.5899 2 13.4399 3.15 13.4399 5.33V7.23C13.4399 9.41 14.5899 10.56 16.7699 10.56H18.6699C20.8499 10.56 21.9999 9.41 21.9999 7.23V5.33C21.9999 3.15 20.8499 2 18.6699 2Z"
                          fill="currentColor"
                        />
                        <path
                          opacity="0.4"
                          d="M7.24 13.4301H5.34C3.15 13.4301 2 14.5801 2 16.7601V18.6601C2 20.8501 3.15 22.0001 5.33 22.0001H7.23C9.41 22.0001 10.56 20.8501 10.56 18.6701V16.7701C10.57 14.5801 9.42 13.4301 7.24 13.4301Z"
                          fill="currentColor"
                        />
                        <path
                          d="M6.29 10.58C8.6593 10.58 10.58 8.6593 10.58 6.29C10.58 3.9207 8.6593 2 6.29 2C3.9207 2 2 3.9207 2 6.29C2 8.6593 3.9207 10.58 6.29 10.58Z"
                          fill="currentColor"
                        />
                        <path
                          d="M17.7099 22C20.0792 22 21.9999 20.0793 21.9999 17.71C21.9999 15.3407 20.0792 13.42 17.7099 13.42C15.3406 13.42 13.4199 15.3407 13.4199 17.71C13.4199 20.0793 15.3406 22 17.7099 22Z"
                          fill="currentColor"
                        />
                      </svg>
                      Dashboard
                    </a>
                    <a class="dropdown-item" href="./my-asset.html">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21.0602 11.8201L20.9002 11.6001C20.6202 11.2601 20.2902 10.9901 19.9102 10.7901C19.4002 10.5001 18.8202 10.3501 18.2202 10.3501H5.7702C5.1702 10.3501 4.6002 10.5001 4.0802 10.7901C3.6902 11.0001 3.3402 11.2901 3.0502 11.6501C2.4802 12.3801 2.2102 13.2801 2.3002 14.1801L2.6702 18.8501C2.8002 20.2601 2.9702 22.0001 6.1402 22.0001H17.8602C21.0302 22.0001 21.1902 20.2601 21.3302 18.8401L21.7002 14.1901C21.7902 13.3501 21.5702 12.5101 21.0602 11.8201ZM14.3902 17.3401H9.6002C9.2102 17.3401 8.9002 17.0201 8.9002 16.6401C8.9002 16.2601 9.2102 15.9401 9.6002 15.9401H14.3902C14.7802 15.9401 15.0902 16.2601 15.0902 16.6401C15.0902 17.0301 14.7802 17.3401 14.3902 17.3401Z"
                          fill="currentColor"
                        />
                        <path
                          opacity="0.4"
                          d="M3.37988 11.31C3.59988 11.11 3.81988 10.93 4.07988 10.79C4.58988 10.5 5.16988 10.35 5.76988 10.35H18.2299C18.8299 10.35 19.3999 10.5 19.9199 10.79C20.1799 10.93 20.4099 11.11 20.6199 11.32V10.79V9.82C20.6199 6.25 19.5299 5.16 15.9599 5.16H13.5799C13.1399 5.16 13.1299 5.15 12.8699 4.81L11.6699 3.2C11.0999 2.46 10.6499 2 9.21988 2H8.03988C4.46988 2 3.37988 3.09 3.37988 6.66V10.8V11.31Z"
                          fill="currentColor"
                        />
                      </svg>
                      My Asset
                    </a>
                    <a class="dropdown-item" href="./order-history.html">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.4"
                          d="M6.73049 19.7C7.55049 18.82 8.80049 18.89 9.52049 19.85L10.5305 21.2C11.3405 22.27 12.6505 22.27 13.4605 21.2L14.4705 19.85C15.1905 18.89 16.4405 18.82 17.2605 19.7C19.0405 21.6 20.4905 20.97 20.4905 18.31V7.04C20.5005 3.01 19.5605 2 15.7805 2H8.22049C4.44049 2 3.50049 3.01 3.50049 7.04V18.3C3.50049 20.97 4.96049 21.59 6.73049 19.7Z"
                          fill="currentColor"
                        />
                        <path
                          d="M16.2305 11.75H10.7305C10.3205 11.75 9.98047 11.41 9.98047 11C9.98047 10.59 10.3205 10.25 10.7305 10.25H16.2305C16.6405 10.25 16.9805 10.59 16.9805 11C16.9805 11.41 16.6405 11.75 16.2305 11.75Z"
                          fill="currentColor"
                        />
                        <path
                          d="M16.2305 7.75H10.7305C10.3205 7.75 9.98047 7.41 9.98047 7C9.98047 6.59 10.3205 6.25 10.7305 6.25H16.2305C16.6405 6.25 16.9805 6.59 16.9805 7C16.9805 7.41 16.6405 7.75 16.2305 7.75Z"
                          fill="currentColor"
                        />
                        <path
                          d="M7.78027 8C7.23027 8 6.78027 7.55 6.78027 7C6.78027 6.45 7.23027 6 7.78027 6C8.33027 6 8.78027 6.45 8.78027 7C8.78027 7.55 8.33027 8 7.78027 8Z"
                          fill="currentColor"
                        />
                        <path
                          d="M7.78027 12C7.23027 12 6.78027 11.55 6.78027 11C6.78027 10.45 7.23027 10 7.78027 10C8.33027 10 8.78027 10.45 8.78027 11C8.78027 11.55 8.33027 12 7.78027 12Z"
                          fill="currentColor"
                        />
                      </svg>
                      My Orders
                    </a>
                    <a class="dropdown-item" href="./export.html">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.4"
                          d="M20.5 10.19H17.61C15.24 10.19 13.31 8.26 13.31 5.89V3C13.31 2.45 12.86 2 12.31 2H8.07C4.99 2 2.5 4 2.5 7.57V16.43C2.5 20 4.99 22 8.07 22H15.93C19.01 22 21.5 20 21.5 16.43V11.19C21.5 10.64 21.05 10.19 20.5 10.19Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M15.8 2.20999C15.39 1.79999 14.68 2.07999 14.68 2.64999V6.13999C14.68 7.59999 15.92 8.80999 17.43 8.80999C18.38 8.81999 19.7 8.81999 20.83 8.81999C21.4 8.81999 21.7 8.14999 21.3 7.74999C19.86 6.29999 17.28 3.68999 15.8 2.20999Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M12.28 14.72C11.99 14.43 11.51 14.43 11.22 14.72L10.5 15.44V11.25C10.5 10.84 10.16 10.5 9.75 10.5C9.34 10.5 9 10.84 9 11.25V15.44L8.28 14.72C7.99 14.43 7.51 14.43 7.22 14.72C6.93 15.01 6.93 15.49 7.22 15.78L9.22 17.78C9.23 17.79 9.24 17.79 9.24 17.8C9.3 17.86 9.38 17.91 9.46 17.95C9.56 17.98 9.65 18 9.75 18C9.85 18 9.94 17.98 10.03 17.94C10.12 17.9 10.2 17.85 10.28 17.78L12.28 15.78C12.57 15.49 12.57 15.01 12.28 14.72Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                      Export History
                    </a>
                    <a class="dropdown-item" href="./identification.html">
                      <div class="d-flex flex-row align-items-center gap-1">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18 13C17.06 13 16.19 13.33 15.5 13.88C14.58 14.61 14 15.74 14 17C14 17.75 14.21 18.46 14.58 19.06C15.27 20.22 16.54 21 18 21C19.01 21 19.93 20.63 20.63 20C20.94 19.74 21.21 19.42 21.42 19.06C21.79 18.46 22 17.75 22 17C22 14.79 20.21 13 18 13ZM20.07 16.57L17.94 18.54C17.8 18.67 17.61 18.74 17.43 18.74C17.24 18.74 17.05 18.67 16.9 18.52L15.91 17.53C15.62 17.24 15.62 16.76 15.91 16.47C16.2 16.18 16.68 16.18 16.97 16.47L17.45 16.95L19.05 15.47C19.35 15.19 19.83 15.21 20.11 15.51C20.39 15.81 20.37 16.28 20.07 16.57Z"
                            fill="currentColor"
                          ></path>
                          <path
                            opacity="0.4"
                            d="M21.09 21.5C21.09 21.78 20.87 22 20.59 22H3.41003C3.13003 22 2.91003 21.78 2.91003 21.5C2.91003 17.36 6.99003 14 12 14C13.03 14 14.03 14.14 14.95 14.41C14.36 15.11 14 16.02 14 17C14 17.75 14.21 18.46 14.58 19.06C14.78 19.4 15.04 19.71 15.34 19.97C16.04 20.61 16.97 21 18 21C19.12 21 20.13 20.54 20.85 19.8C21.01 20.34 21.09 20.91 21.09 21.5Z"
                            fill="currentColor"
                          ></path>
                          <path
                            d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                        Identity Verification
                        <span
                          class="verified alert align-items-center d-flex mb-0"
                        >
                          Verified
                        </span>
                      </div>
                    </a>
                    <a class="dropdown-item" href="./settings.html">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.4"
                          d="M2 12.8801V11.1201C2 10.0801 2.85 9.22006 3.9 9.22006C5.71 9.22006 6.45 7.94006 5.54 6.37006C5.02 5.47006 5.33 4.30006 6.24 3.78006L7.97 2.79006C8.76 2.32006 9.78 2.60006 10.25 3.39006L10.36 3.58006C11.26 5.15006 12.74 5.15006 13.65 3.58006L13.76 3.39006C14.23 2.60006 15.25 2.32006 16.04 2.79006L17.77 3.78006C18.68 4.30006 18.99 5.47006 18.47 6.37006C17.56 7.94006 18.3 9.22006 20.11 9.22006C21.15 9.22006 22.01 10.0701 22.01 11.1201V12.8801C22.01 13.9201 21.16 14.7801 20.11 14.7801C18.3 14.7801 17.56 16.0601 18.47 17.6301C18.99 18.5401 18.68 19.7001 17.77 20.2201L16.04 21.2101C15.25 21.6801 14.23 21.4001 13.76 20.6101L13.65 20.4201C12.75 18.8501 11.27 18.8501 10.36 20.4201L10.25 20.6101C9.78 21.4001 8.76 21.6801 7.97 21.2101L6.24 20.2201C5.33 19.7001 5.02 18.5301 5.54 17.6301C6.45 16.0601 5.71 14.7801 3.9 14.7801C2.85 14.7801 2 13.9201 2 12.8801Z"
                          fill="currentColor"
                        />
                        <path
                          d="M12 15.25C13.7949 15.25 15.25 13.7949 15.25 12C15.25 10.2051 13.7949 8.75 12 8.75C10.2051 8.75 8.75 10.2051 8.75 12C8.75 13.7949 10.2051 15.25 12 15.25Z"
                          fill="currentColor"
                        />
                      </svg>
                      Account Settings
                    </a>
                    <a class="dropdown-item" href="./security.html">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.4"
                          d="M20.91 11.12C20.91 16.01 17.36 20.59 12.51 21.93C12.18 22.02 11.82 22.02 11.49 21.93C6.63996 20.59 3.08997 16.01 3.08997 11.12V6.73006C3.08997 5.91006 3.70998 4.98007 4.47998 4.67007L10.05 2.39007C11.3 1.88007 12.71 1.88007 13.96 2.39007L19.53 4.67007C20.29 4.98007 20.92 5.91006 20.92 6.73006L20.91 11.12Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M14.5 10.5C14.5 9.12 13.38 8 12 8C10.62 8 9.5 9.12 9.5 10.5C9.5 11.62 10.24 12.55 11.25 12.87V15.5C11.25 15.91 11.59 16.25 12 16.25C12.41 16.25 12.75 15.91 12.75 15.5V12.87C13.76 12.55 14.5 11.62 14.5 10.5Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                      Security
                    </a>
                    <a class="dropdown-item" href="./api.html">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M16 8H8V16H16V8Z" fill="currentColor"></path>
                        <path
                          opacity="0.4"
                          d="M5 22C6.65 22 8 20.65 8 19V16H5C3.35 16 2 17.35 2 19C2 20.65 3.35 22 5 22Z"
                          fill="currentColor"
                        ></path>
                        <path
                          opacity="0.4"
                          d="M5 8H8V5C8 3.35 6.65 2 5 2C3.35 2 2 3.35 2 5C2 6.65 3.35 8 5 8Z"
                          fill="currentColor"
                        ></path>
                        <path
                          opacity="0.4"
                          d="M16 8H19C20.65 8 22 6.65 22 5C22 3.35 20.65 2 19 2C17.35 2 16 3.35 16 5V8Z"
                          fill="currentColor"
                        ></path>
                        <path
                          opacity="0.4"
                          d="M19 22C20.65 22 22 20.65 22 19C22 17.35 20.65 16 19 16H16V19C16 20.65 17.35 22 19 22Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                      API Management
                    </a>
                    <a class="dropdown-item" href="./rewards.html">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.4"
                          d="M18 20.5H17V20.25C17 19.15 16.1 18.25 15 18.25H12.75V15.96C12.5 15.99 12.25 16 12 16C11.75 16 11.5 15.99 11.25 15.96V18.25H9C7.9 18.25 7 19.15 7 20.25V20.5H6C5.59 20.5 5.25 20.84 5.25 21.25C5.25 21.66 5.59 22 6 22H18C18.41 22 18.75 21.66 18.75 21.25C18.75 20.84 18.41 20.5 18 20.5Z"
                          fill="currentColor"
                        ></path>
                        <path
                          opacity="0.4"
                          d="M5.51979 11.64C4.85979 11.39 4.27979 10.98 3.81979 10.52C2.88979 9.49 2.27979 8.26 2.27979 6.82C2.27979 5.38 3.40979 4.25 4.84979 4.25H5.40979C5.14979 4.78 4.99979 5.37 4.99979 6V9C4.99979 9.94 5.17979 10.83 5.51979 11.64Z"
                          fill="currentColor"
                        ></path>
                        <path
                          opacity="0.4"
                          d="M21.72 6.82C21.72 8.26 21.11 9.49 20.18 10.52C19.72 10.98 19.14 11.39 18.48 11.64C18.82 10.83 19 9.94 19 9V6C19 5.37 18.85 4.78 18.59 4.25H19.15C20.59 4.25 21.72 5.38 21.72 6.82Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M15 2H9C6.79 2 5 3.79 5 6V9C5 12.87 8.13 16 12 16C15.87 16 19 12.87 19 9V6C19 3.79 17.21 2 15 2ZM14.84 8.45L14.22 9.21C14.12 9.32 14.05 9.54 14.06 9.69L14.12 10.67C14.16 11.27 13.73 11.58 13.17 11.36L12.26 11C12.12 10.95 11.88 10.95 11.74 11L10.83 11.36C10.27 11.58 9.84 11.27 9.88 10.67L9.94 9.69C9.95 9.54 9.88 9.32 9.78 9.21L9.16 8.45C8.77 7.99 8.94 7.48 9.52 7.33L10.47 7.09C10.62 7.05 10.8 6.91 10.88 6.78L11.41 5.96C11.74 5.45 12.26 5.45 12.59 5.96L13.12 6.78C13.2 6.91 13.38 7.05 13.53 7.09L14.48 7.33C15.06 7.48 15.23 7.99 14.84 8.45Z"
                          fill="currentColor"
                        ></path>
                        <path
                          opacity="0.4"
                          d="M14.8402 8.45014L14.2202 9.21014C14.1202 9.32014 14.0502 9.54014 14.0602 9.69014L14.1202 10.6701C14.1602 11.2701 13.7302 11.5801 13.1702 11.3601L12.2602 11.0001C12.1202 10.9501 11.8802 10.9501 11.7402 11.0001L10.8302 11.3601C10.2702 11.5801 9.84024 11.2701 9.88024 10.6701L9.94023 9.69014C9.95023 9.54014 9.88023 9.32014 9.78023 9.21014L9.16023 8.45014C8.77024 7.99014 8.94024 7.48014 9.52024 7.33014L10.4702 7.09014C10.6202 7.05014 10.8002 6.91014 10.8802 6.78014L11.4102 5.96014C11.7402 5.45014 12.2602 5.45014 12.5902 5.96014L13.1202 6.78014C13.2002 6.91014 13.3802 7.05014 13.5302 7.09014L14.4802 7.33014C15.0602 7.48014 15.2302 7.99014 14.8402 8.45014Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                      Reward Hub
                    </a>
                    <a class="dropdown-item" href="./login.html">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.4"
                          d="M16.19 2H7.82002C4.18002 2 2.01001 4.17 2.01001 7.81V16.18C2.01001 19.82 4.18002 21.99 7.82002 21.99H16.19C19.83 21.99 22 19.82 22 16.18V7.81C22 4.17 19.83 2 16.19 2Z"
                          fill="currentColor"
                        />
                        <path
                          d="M9.16985 14.0899C9.35985 14.0899 9.54985 14.0199 9.69985 13.8699L14.0799 9.48992V11.9199C14.0799 12.3299 14.4199 12.6699 14.8299 12.6699C15.2399 12.6699 15.5799 12.3299 15.5799 11.9199V7.67992C15.5799 7.57992 15.5599 7.48992 15.5199 7.38992C15.4399 7.20992 15.2998 7.05993 15.1098 6.97993C15.0198 6.93993 14.9199 6.91992 14.8199 6.91992H10.5799C10.1699 6.91992 9.82985 7.25992 9.82985 7.66992C9.82985 8.07992 10.1699 8.41992 10.5799 8.41992H13.0098L8.62985 12.7999C8.33985 13.0899 8.33985 13.5699 8.62985 13.8599C8.78985 14.0199 8.97985 14.0899 9.16985 14.0899Z"
                          fill="currentColor"
                        />
                        <path
                          d="M18.7099 16.28C18.5799 15.89 18.1599 15.68 17.7599 15.81C14.0399 17.05 9.94993 17.05 6.22993 15.81C5.83993 15.68 5.40994 15.89 5.27994 16.28C5.14994 16.67 5.35994 17.1 5.74994 17.23C7.75994 17.9 9.86994 18.24 11.9899 18.24C14.1099 18.24 16.2199 17.9 18.2299 17.23C18.6299 17.09 18.8399 16.67 18.7099 16.28Z"
                          fill="currentColor"
                        />
                      </svg>
                      Log Out
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div class="controller">
              <a
                href="#!"
                class="notify"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasNotify"
              >
                <div class="notification"></div>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M18.707 8.796c0 1.256.332 1.997 1.063 2.85.553.628.73 1.435.73 2.31 0 .874-.287 1.704-.863 2.378a4.537 4.537 0 01-2.9 1.413c-1.571.134-3.143.247-4.736.247-1.595 0-3.166-.068-4.737-.247a4.532 4.532 0 01-2.9-1.413 3.616 3.616 0 01-.864-2.378c0-.875.178-1.682.73-2.31.754-.854 1.064-1.594 1.064-2.85V8.37c0-1.682.42-2.781 1.283-3.858C7.861 2.942 9.919 2 11.956 2h.09c2.08 0 4.204.987 5.466 2.625.82 1.054 1.195 2.108 1.195 3.745v.426zM9.074 20.061c0-.504.462-.734.89-.833.5-.106 3.545-.106 4.045 0 .428.099.89.33.89.833-.025.48-.306.904-.695 1.174a3.635 3.635 0 01-1.713.731 3.795 3.795 0 01-1.008 0 3.618 3.618 0 01-1.714-.732c-.39-.269-.67-.694-.695-1.173z"
                  />
                </svg>
              </a>
            </div>

         
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
                  />
                  <path
                    d="M4 12H20"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M4 6H20"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
    <!-- Offcanvas Navbar -->
    <nav class="navbar py-0 navbar-dark bg-dark">
      <div class="container-fluid">
        <div
          class="offcanvas offcanvas-end"
          tabindex="-1"
          id="offcanvasDarkNavbar"
        >
          <!-- header -->
          <div class="offcanvas-header card-line">
            <div
              class="d-flex align-items-center gap-3 crypt-grayscale-100 text-uppercase mb-0 fw-bold"
            >
              <div class="controller update text-bg-info">
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                >
                  <!-- <style>@keyframes loader5{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}</style> -->
                  <g
                    style="
                      animation: loader5 1.5s linear infinite both;
                      transform-origin: center center;
                    "
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="4"
                      stroke="#0A0A30"
                      stroke-width="1.5"
                    />
                    <circle cx="17" cy="7" r="1" fill="#265BFF" />
                  </g>
                </svg>
              </div>
              Crypt 2.0
            </div>

            <button
              type="button"
              class="btn-close text-reset close-notify align-items-center justify-content-center"
              data-bs-dismiss="offcanvas"
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

          <!-- main menu -->
          <div class="offcanvas-body">
            <!-- Search -->
            <form class="d-flex" role="search">
              <input
                type="text"
                class="search search-input form-control form-control-lg text-sm"
                placeholder="Search coin"
              />
            </form>

            <!-- Menu -->
            <ul
              class="navbar-nav justify-content-end flex-grow-1 gap-2 mt-3 pb-3"
            >
              <!-- Dropdown (Landing Page) -->
              <li class="nav-item dropdown crypto-has-dropdown">
                <a
                  class="nav-link"
                  href="#!"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Landing Page
                  <svg
                    class="fright mt-1"
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
                <ul class="dropdown-menu dropdown-menu-dark g-2">
                  <li>
                    <a
                      class="dropdown-item d-flex justify-content-between align-content-center"
                      href="./template-1.html"
                    >
                      Template 1
                      <span
                        class="verified alert align-items-center d-flex mb-0"
                      >
                        NEW
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      class="dropdown-item d-flex justify-content-between align-content-center"
                      href="./template-2.html"
                    >
                      Template 2
                      <span
                        class="verified alert align-items-center d-flex mb-0"
                      >
                        NEW
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      class="dropdown-item d-flex justify-content-between align-content-center"
                      href="./template-3.html"
                    >
                      Template 3
                      <span
                        class="verified alert align-items-center d-flex mb-0"
                      >
                        NEW
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      class="dropdown-item d-flex justify-content-between align-content-center"
                      href="./template-4.html"
                    >
                      Template 4
                      <span
                        class="verified alert align-items-center d-flex mb-0"
                      >
                        NEW
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      class="dropdown-item d-flex justify-content-between align-content-center"
                      href="./template-5.html"
                    >
                      Template 5
                      <span
                        class="verified alert align-items-center d-flex mb-0"
                      >
                        NEW
                      </span>
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="./template-6.html"
                      >Template 6</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" href="./template-7.html"
                      >Template 7</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" href="./template-8.html"
                      >Template 8</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" href="./template-9.html"
                      >Template 9</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" href="./template-10.html"
                      >Template 10</a
                    >
                  </li>
                </ul>
              </li>

              <!-- Dropdown (Exchange) -->
              <li class="nav-item dropdown crypto-has-dropdown">
                <a
                  class="nav-link"
                  href="#!"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Exchange
                  <svg
                    class="fright mt-1"
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
                <ul class="dropdown-menu dropdown-menu-dark">
                  <li>
                    <a class="dropdown-item" href="./exchange-1.html"
                      >Exchange 1</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" href="./exchange-2.html"
                      >Exchange 2</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" href="./exchange-3.html"
                      >Exchange 3</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" href="./exchange-4.html"
                      >Exchange 4</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" href="./exchange-5.html"
                      >Exchange 5</a
                    >
                  </li>
                </ul>
              </li>

              <!-- Dropdown (Markets) -->
              <li class="nav-item dropdown crypto-has-dropdown">
                <a
                  class="nav-link"
                  href="#!"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Markets
                  <svg
                    class="fright mt-1"
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
                <ul class="dropdown-menu dropdown-menu-dark">
                  <li>
                    <a class="dropdown-item" href="./market.html">All Market</a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="./price.html"
                      >Coin Overview</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" href="./highlights.html"
                      >Crypto Highlights</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" href="./marketcap.html"
                      >Market Cap</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" href="./symbols.html">Symbols</a>
                  </li>
                </ul>
              </li>

              <!-- Dropdown (Blog) -->
              <li class="nav-item dropdown crypto-has-dropdown">
                <a
                  class="nav-link"
                  href="#!"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Blog
                  <svg
                    class="fright mt-1"
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
                <ul class="dropdown-menu dropdown-menu-dark">
                  <li>
                    <a class="nav-link" href="./blog.html">Blog Classic</a>
                  </li>
                  <li>
                    <a class="nav-link" href="./blog-single.html"
                      >Blog Single</a
                    >
                  </li>
                </ul>
              </li>
            </ul>

            <!-- Dropdown (Assets) -->
            <div class="dropdown-menu-dark card-bs gd-bg p-2 pb-2">
              <div class="d-flex flex-column card-bs-tabs p-2 mb-3">
                <div class="d-flex gap-1">
                  <p class="text-sm fw-bold crypt-grayscale-600 mb-0">
                    Total Assets
                  </p>
                </div>
                <div class="d-flex flex-row gap-2 align-items-center">
                  <div class="flex">
                    <h4 class="fw-bold mb-0 encrypted">4.55</h4>
                  </div>
                  <div class="flex">
                    <select class="form-select text-bg-bs2 crypt-grayscale-600">
                      <option selected>BTC</option>
                      <option value="1">ETH</option>
                      <option value="2">BNB</option>
                      <option value="3">USDT</option>
                    </select>
                  </div>
                </div>
                <div class="flex">
                  <h6 class="text-sm crypt-grayscale-600 encrypted">
                    ≈ $99,738.50 USDT
                  </h6>
                </div>
              </div>
              <!-- Menu Item -->
              <ul class="d-flex flex-column profile_menu gap-2">
                <li class="nav-item">
                  <a class="nav-link" href="./my-dashboard.html">
                    <svg
                      class="me-1"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.4"
                        d="M18.6699 2H16.7699C14.5899 2 13.4399 3.15 13.4399 5.33V7.23C13.4399 9.41 14.5899 10.56 16.7699 10.56H18.6699C20.8499 10.56 21.9999 9.41 21.9999 7.23V5.33C21.9999 3.15 20.8499 2 18.6699 2Z"
                        fill="currentColor"
                      />
                      <path
                        opacity="0.4"
                        d="M7.24 13.4301H5.34C3.15 13.4301 2 14.5801 2 16.7601V18.6601C2 20.8501 3.15 22.0001 5.33 22.0001H7.23C9.41 22.0001 10.56 20.8501 10.56 18.6701V16.7701C10.57 14.5801 9.42 13.4301 7.24 13.4301Z"
                        fill="currentColor"
                      />
                      <path
                        d="M6.29 10.58C8.6593 10.58 10.58 8.6593 10.58 6.29C10.58 3.9207 8.6593 2 6.29 2C3.9207 2 2 3.9207 2 6.29C2 8.6593 3.9207 10.58 6.29 10.58Z"
                        fill="currentColor"
                      />
                      <path
                        d="M17.7099 22C20.0792 22 21.9999 20.0793 21.9999 17.71C21.9999 15.3407 20.0792 13.42 17.7099 13.42C15.3406 13.42 13.4199 15.3407 13.4199 17.71C13.4199 20.0793 15.3406 22 17.7099 22Z"
                        fill="currentColor"
                      />
                    </svg>
                    Dashboard
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="./marketplace.html">
                    <svg
                      class="me-1"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.9597 17.84L19.3297 18.39C18.8797 18.54 18.5197 18.89 18.3697 19.35L17.8197 20.98C17.3497 22.39 15.3697 22.36 14.9297 20.95L13.0797 15C12.7197 13.82 13.8097 12.72 14.9797 13.09L20.9397 14.94C22.3397 15.38 22.3597 17.37 20.9597 17.84Z"
                        fill="currentColor"
                      />
                      <path
                        opacity="0.4"
                        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                        fill="currentColor"
                      />
                    </svg>
                    Marketplace
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="./my-asset.html">
                    <svg
                      class="me-1"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21.0602 11.8201L20.9002 11.6001C20.6202 11.2601 20.2902 10.9901 19.9102 10.7901C19.4002 10.5001 18.8202 10.3501 18.2202 10.3501H5.7702C5.1702 10.3501 4.6002 10.5001 4.0802 10.7901C3.6902 11.0001 3.3402 11.2901 3.0502 11.6501C2.4802 12.3801 2.2102 13.2801 2.3002 14.1801L2.6702 18.8501C2.8002 20.2601 2.9702 22.0001 6.1402 22.0001H17.8602C21.0302 22.0001 21.1902 20.2601 21.3302 18.8401L21.7002 14.1901C21.7902 13.3501 21.5702 12.5101 21.0602 11.8201ZM14.3902 17.3401H9.6002C9.2102 17.3401 8.9002 17.0201 8.9002 16.6401C8.9002 16.2601 9.2102 15.9401 9.6002 15.9401H14.3902C14.7802 15.9401 15.0902 16.2601 15.0902 16.6401C15.0902 17.0301 14.7802 17.3401 14.3902 17.3401Z"
                        fill="currentColor"
                      />
                      <path
                        opacity="0.4"
                        d="M3.37988 11.31C3.59988 11.11 3.81988 10.93 4.07988 10.79C4.58988 10.5 5.16988 10.35 5.76988 10.35H18.2299C18.8299 10.35 19.3999 10.5 19.9199 10.79C20.1799 10.93 20.4099 11.11 20.6199 11.32V10.79V9.82C20.6199 6.25 19.5299 5.16 15.9599 5.16H13.5799C13.1399 5.16 13.1299 5.15 12.8699 4.81L11.6699 3.2C11.0999 2.46 10.6499 2 9.21988 2H8.03988C4.46988 2 3.37988 3.09 3.37988 6.66V10.8V11.31Z"
                        fill="currentColor"
                      />
                    </svg>
                    My Asset
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="./order-history.html">
                    <svg
                      class="me-1"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.4"
                        d="M6.73049 19.7C7.55049 18.82 8.80049 18.89 9.52049 19.85L10.5305 21.2C11.3405 22.27 12.6505 22.27 13.4605 21.2L14.4705 19.85C15.1905 18.89 16.4405 18.82 17.2605 19.7C19.0405 21.6 20.4905 20.97 20.4905 18.31V7.04C20.5005 3.01 19.5605 2 15.7805 2H8.22049C4.44049 2 3.50049 3.01 3.50049 7.04V18.3C3.50049 20.97 4.96049 21.59 6.73049 19.7Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M16.2305 11.75H10.7305C10.3205 11.75 9.98047 11.41 9.98047 11C9.98047 10.59 10.3205 10.25 10.7305 10.25H16.2305C16.6405 10.25 16.9805 10.59 16.9805 11C16.9805 11.41 16.6405 11.75 16.2305 11.75Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M16.2305 7.75H10.7305C10.3205 7.75 9.98047 7.41 9.98047 7C9.98047 6.59 10.3205 6.25 10.7305 6.25H16.2305C16.6405 6.25 16.9805 6.59 16.9805 7C16.9805 7.41 16.6405 7.75 16.2305 7.75Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M7.78027 8C7.23027 8 6.78027 7.55 6.78027 7C6.78027 6.45 7.23027 6 7.78027 6C8.33027 6 8.78027 6.45 8.78027 7C8.78027 7.55 8.33027 8 7.78027 8Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M7.78027 12C7.23027 12 6.78027 11.55 6.78027 11C6.78027 10.45 7.23027 10 7.78027 10C8.33027 10 8.78027 10.45 8.78027 11C8.78027 11.55 8.33027 12 7.78027 12Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    Order History
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="./exchange.html">
                    <svg
                      class="me-1"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 15.5C15 19.09 12.09 22 8.5 22C4.91 22 2 19.09 2 15.5C2 11.91 4.91 9 8.5 9C8.67 9 8.84999 9.01 9.01999 9.02C12.19 9.27 14.73 11.81 14.98 14.98C14.99 15.15 15 15.33 15 15.5Z"
                        fill="currentColor"
                      ></path>
                      <path
                        opacity="0.4"
                        d="M22 8.5C22 12.09 19.09 15 15.5 15C15.33 15 15.15 14.99 14.98 14.98C14.73 11.81 12.19 9.27 9.01999 9.02C9.00999 8.85 9 8.67 9 8.5C9 4.91 11.91 2 15.5 2C19.09 2 22 4.91 22 8.5Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M5.59 2H3C2.45 2 2 2.45 2 3V5.59C2 6.48 3.07999 6.93 3.70999 6.3L6.29999 3.71001C6.91999 3.08001 6.48 2 5.59 2Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M18.41 22H21C21.55 22 22 21.55 22 21V18.41C22 17.52 20.92 17.07 20.29 17.7L17.7 20.29C17.08 20.92 17.52 22 18.41 22Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    Exchange
                  </a>
                </li>
              </ul>
            </div>
            <!-- Call to Action -->
            <span class="d-grid">
              <a
                class="btn btn-editor btn-primary"
                href="#!"
                data-bs-toggle="modal"
                data-bs-target="#buyCrypto"
                >Add Funds</a
              >
            </span>
            <!-- Carousel Slider -->
            <div
              id="RewardCarousel"
              class="carousel slide card-bs mt-4"
              data-bs-ride="carousel"
            >
              <div class="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#RewardCarousel"
                  data-bs-slide-to="0"
                  class="active"
                  aria-current="true"
                  aria-label=""
                ></button>
                <button
                  type="button"
                  data-bs-target="#RewardCarousel"
                  data-bs-slide-to="1"
                  aria-label=""
                ></button>
              </div>
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <div class="col-12 p-3 reward-bg2 pb-5">
                    <h4 class="fw-medium text-white mb-1">
                      Invite Friends for Rewards
                    </h4>
                    <p class="text-white mb-3">
                      Invite friends and get 20% commissions.
                    </p>
                    <a
                      class="btn btn-editor btn-info mt-2"
                      href="#!"
                      data-bs-toggle="modal"
                      data-bs-target="#RewardCrypto"
                      >Invite friends</a
                    >
                  </div>
                </div>
                <div class="carousel-item">
                  <div class="col-12 p-3 reward-bg3 pb-5">
                    <h4 class="fw-medium text-white text-white mb-1">
                      Crypt Affiliate Programs
                    </h4>
                    <p class="text-white mb-3">
                      Apply and earn up to 60% commission!
                    </p>
                    <a
                      class="btn btn-editor btn-success mt-2"
                      href="#!"
                      data-bs-toggle="modal"
                      data-bs-target="#RewardCrypto"
                      >Apply now</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero -->
    <!-- <canvas id="particleCanvas"></canvas> -->


            <slot />
   


    <!-- Footer -->
    <footer
      class="container-fluid text-left text-lg-start crypt-footer mt-5"
    >
      <div class="container mt-5 in-view">
        <div class="row mt-5 pt-3">
          <div class="col-12 col-sm-12 col-lg-4 pb-5">
            <!-- Content -->
            <div class="mb-4">
              <!-- Logo -->
              <div class="crypt-logo dark">
                <a href="template-1.html">
                  <img
                    src="https://crypt.tophivetheme.com/demo/images/logo-dark.svg"
                    alt=""
                  />
                </a>
              </div>
              
              <p class="card-text mt-2">
                Cryptocurrency Will Make You Feel Better.<br />- It's Like
                Heaven!
              </p>
            </div>
            <div class="text-left social-icons mt-4">
              <a href="" rel="nofollow" target="_blank">
                <img
                  src="https://crypt.tophivetheme.com/demo/images/social/x.svg"
                  alt=""
                  width="24"
                />
              </a>
              <a href="" rel="nofollow" target="_blank">
                <img
                  src="https://crypt.tophivetheme.com/demo/images/social/facebook.svg"
                  alt=""
                  width="24"
                />
              </a>
              <a href="" rel="nofollow" target="_blank">
                <img
                  src="https://crypt.tophivetheme.com/demo/images/social/instagram.svg"
                  alt=""
                  width="24"
                />
              </a>
              <a href="" rel="nofollow" target="_blank">
                <img
                  src="https://crypt.tophivetheme.com/demo/images/social/tiktok.svg"
                  alt=""
                  width="24"
                />
              </a>
            </div>
          </div>
          <div class="col-12 col-sm-12 col-lg-8">
            <div class="row">
              <div class="col-6 col-md-3 col-sm-6 col-lg-3 text-link mb-3">
                <!-- Links -->
                <h6 class="mb-3 crypt-grayscale-300">Products</h6>
                <p><a href="#!" class="text-reset">Supercharts</a></p>
                <p><a href="#!" class="text-reset">Stock market</a></p>
                <p><a href="#!" class="text-reset">Forex screener</a></p>
                <p><a href="#!" class="text-reset">Crypto market</a></p>
              </div>
              <div class="col-6 col-md-3 col-sm-6 col-lg-3 text-link mb-3">
                <!-- Links -->
                <h6 class="mb-3 crypt-grayscale-300">For Business</h6>
                <p><a href="#!" class="text-reset">Widgets</a></p>
                <p><a href="#!" class="text-reset">Advertising</a></p>
                <p><a href="#!" class="text-reset">Script libraries</a></p>
                <p><a href="#!" class="text-reset">Lightweight Charts™</a></p>
              </div>
              <div class="col-6 col-md-3 col-sm-6 col-lg-3 text-link mb-3">
                <!-- Links -->
                <h6 class="mb-3 crypt-grayscale-300">Buy</h6>
                <p><a href="#!" class="text-reset">Buy Bitcoin</a></p>
                <p><a href="#!" class="text-reset">Buy Ethereum</a></p>
                <p><a href="#!" class="text-reset">Buy USDT</a></p>
                <p><a href="#!" class="text-reset">Buy Cardano</a></p>
              </div>
              <div class="col-6 col-md-3 col-sm-6 col-lg-3 text-link mb-3">
                <!-- Links -->
                <h6 class="mb-3 crypt-grayscale-300">Community</h6>
                <p><a href="#!" class="text-reset">Refer a friend</a></p>
                <p><a href="#!" class="text-reset">Scripts</a></p>
                <p><a href="#!" class="text-reset">Moderators</a></p>
              </div>
            </div>
          </div>
        </div>
        <!-- Copyright -->
        <div class="text-center p-4 mt-4 crypt-footer-copyright">
          Copyright © 2024 - Made by
          <a
            class="fw-bold link"
            href="https://tophivetheme.com"
            rel="nofollow"
            target="_blank"
            >Tophive</a
          >
        </div>
      </div>
    </footer>






       <!-- Modal (Connect Wallet) -->
    <div class="modal fade" id="staticBackdrop" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header d-flex">
                    <div>
                        <h5 class="crypt-grayscale-100 fw-bold mb-0">Connect a wallet</h5>
                        <p class="crypt-grayscale-500 mb-0">Choose your favourite wallet to log in.</p>
                    </div>
                    <button type="button" class="btn-close text-reset close-notify align-items-center justify-content-center" data-bs-dismiss="modal" aria-label="Close">
                        <svg class="close-notify" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.5 4.5L4.5 13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M4.5 4.5L13.5 13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
                <div class="modal-body">
                    <small class="crypt-grayscale-500">Popular wallet</small>
                    <div class="flex mt-2">
                        <a @click.prevent="connectWallet()" class="btn btn-dark d-flex justify-content-between align-items-center mb-2" >
                            Metamask 
                            <img src="https://crypt.tophivetheme.com/demo/images/icon/metamask.svg" alt="" width="32">
                        </a>
                        <a class="btn btn-dark d-flex justify-content-between align-items-center mb-2" href="#!">
                            WalletConnect 
                            <img src="https://crypt.tophivetheme.com/demo/images/icon/walletconnect.svg" alt="" width="32">
                        </a>
                        <a class="btn btn-dark d-flex justify-content-between align-items-center mb-2" href="#!">
                            Phantom 
                            <img src="https://crypt.tophivetheme.com/demo/images/icon/phantom.svg" alt="" width="32">
                        </a>
                        <a class="btn btn-dark d-flex justify-content-between align-items-center mb-2" href="#!">
                            Coinbase Wallet 
                            <img src="https://crypt.tophivetheme.com/demo/images/icon/coinbase.svg" alt="" width="32">
                        </a>
                        <a class="btn btn-dark d-flex justify-content-between align-items-center mb-2" href="#!">
                            Rainbow 
                            <img src="https://crypt.tophivetheme.com/demo/images/icon/rainbow.svg" alt="" width="32">
                        </a>
                    </div>
                
                </div>
                <div class="modal-footer d-flex flex-column justify-content-center">
                    <p class="text-sm crypt-grayscale-400">By connecting your wallet you agree to the</p>
                    <a href="#" class="text-sm">Terms of Service</a>
                </div>
            </div>
      </div>
    </div>

  </body>
</template>
