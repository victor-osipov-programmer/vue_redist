<template>
    <div class="coin">
        <div class="total-coins">{{ coin.total_coins }}</div>
        <div class="buy"><span>Покупка</span> {{ coin.price_buy_coin }}</div>
        <div class="sell"><span>Продажа</span> {{ coin.price_sale_coin }}</div>


        <div class="commission"><span>комиссия</span>{{ coin.commission }}</div>
        <!-- <div>commission {{ coin. }}</div> -->
    </div>
</template>

<script lang="ts" setup>
import type { ICoin } from './types';

defineProps<{
    coin: ICoin
}>()
</script>

<style scoped>
.coin {
    display: grid;
    /* grid-template-columns: 1fr 1fr;
    gap: 0.5rem; */

    width: max-content;
    background-color: white;
    border-radius: 5px;
    padding: 0.5rem;
    cursor: pointer;
    box-shadow: 0 1px 1px black, 
}

.buy, .sell {
    padding: 0.1rem;
    border-radius: 5px;
}
.buy {
    /* background-color: rgb(103, 235, 70); */
}

.sell {
    /* background-color: rgb(235, 183, 70); */
}
</style>