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
   <Head title="Createlize monad testnet Token mint page" />
  <AppLayout>


  </AppLayout>
    
</template>