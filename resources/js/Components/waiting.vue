<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="modal fade show d-block"
      tabindex="-1"
      role="dialog"
      style="background: rgba(0, 0, 0, 0.5)"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content bg-dark text-white rounded-3">
          <div class="modal-header border-0 mt-2 d-flex">
            <button
              type="button"
              class="btn-close text-reset close-notify align-items-center justify-content-center"
              @click="closeModal"
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
                <span class="crypt-grayscale-300">{{ title }}</span>
              </h2>
              <p class="crypt-grayscale-500">
                {{ message }}
              </p>
            </div>
            <div
              v-if="type === 'load'"
              class="mt-3 mb-4 p-3 row justify-content-center"
            >
              <div class="spinner-wrapper" role="status" aria-label="Loading">
                <div class="spinner"></div>
                <img class="circle-img" src="/img/circle-logo.png" alt="Logo" />
              </div>
            </div>
            <div
              v-if="type === 'error'"
              class="mt-3 mb-4 p-3 row justify-content-center"
            >
              <div class="error-wrapper">
                <div class="error-circle">
                  <svg class="cross" viewBox="0 0 24 24">
                    <line x1="6" y1="6" x2="18" y2="18" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                  </svg>
                </div>
              </div>
            </div>

            <div
              v-if="type === 'success'"
              class="mt-3 mb-4 p-3 row justify-content-center"
            >
              <div class="success-wrapper">
                <div class="success-circle">
                  <svg class="check" viewBox="0 0 24 24">
                    <polyline points="6 12 10 16 18 8" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script setup>
import { reactive, computed, onMounted } from "vue";
import { eventBus } from "@/eventBus";

const state = reactive({
  visible: false,
  title: "",
  type: "success",
  message: "",
});

function openModal(title, message ,type) {
  state.title = title;
  state.message = message;
  state.type = type;
  state.visible = true;
}
function closeModal() {
  state.visible = false;
}

onMounted(() => {
  eventBus.on("modal:open", ({ title, message,type}) => openModal(title, message,type));
  eventBus.on("modal:close", closeModal);
});

const visible = computed(() => state.visible);
const title = computed(() => state.title);
const message = computed(() => state.message);
const type = computed(() => state.type);
</script>

<style scoped>
.spinner-wrapper {
  position: relative;
  width: 100px;
  height: 100px;
}
.spinner {
  position: absolute;
  inset: 0;
  border: 6px solid rgba(255, 255, 255, 0.15);
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
.circle-img {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60px;
  height: 60px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.error-wrapper {
  position: relative;
  width: 70px;
  height: 70px;
}

.error-circle {
  width: 100%;
  height: 100%;
  border: 5px solid #f87171; /* red-400 */
  border-radius: 50%;
  position: relative;
  animation: draw-circle 0.6s ease forwards;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cross {
  width: 40px;
  height: 40px;
  stroke: #f87171;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: draw-cross 0.4s ease forwards;
  animation-delay: 0.6s; /* starts after circle */
}

@keyframes draw-circle {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes draw-cross {
  to {
    stroke-dashoffset: 0;
  }
}

.success-wrapper {
  position: relative;
  width: 70px;
  height: 70px;
}

.success-circle {
  width: 100%;
  height: 100%;
  border: 5px solid #4ade80; /* green-400 */
  border-radius: 50%;
  position: relative;
  animation: draw-circle 0.6s ease forwards;
  display: flex;
  align-items: center;
  justify-content: center;
}

.check {
  background: none !important;
  width: 40px;
  height: 40px;
  stroke: #4ade80;
  stroke-width: 3;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 30;
  stroke-dashoffset: 30;
  animation: draw-check 0.4s ease forwards;
  animation-delay: 0.6s; /* starts after circle */
}

@keyframes draw-check {
  to {
    stroke-dashoffset: 0;
  }
}

.check {
  width: 50px;
  height: 50px;
}
.check polyline {
  stroke-dasharray: 60;
  stroke-dashoffset: 60;
  animation: draw 1s ease forwards;
}
@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
