<template>
    <div class="coin-info info">
        <div class="box"><span>Ваши монеты</span><span>{{ coin.user_coins }}</span></div>
        <div class="box"><span>Всего монет</span><span>{{ coin.total_coins }}</span></div>
        <div class="box"><span>Комиссия</span><span>{{ coin.commission }}%</span></div>
        <div class="box"><span>Цикл</span><span>{{ coin.one_cycle }} сек.</span></div>
        <hr>
        <div class="box"><span>Монеты банка для покупки</span><span>{{ coin.buy_to_bank_coins }}</span></div>
        <div class="box"><span>Монеты банка для продажи</span><span>{{ coin.sale_to_bank_coins }}</span></div>
        <hr>
        <div class="box"><span>Расход банка</span><span>{{ coin.expenses }} ₽</span></div>
        <div class="box"><span>Доход банка</span><span>{{ coin.income }} ₽</span></div>
        <hr>
        <div class="box"><span>Покупка монеты</span><span>{{ coin.price_buy_coin }} ₽</span></div>
        <div class="box"><span>Покупка доп. монеты</span><span>{{ coin.price_buy_additional_coin }} ₽</span></div>
        <div class="box"><span>Продажа монеты</span><span>{{ coin.price_sale_coin }} ₽</span></div>
        <hr>
        <div class="box"><span>Макс. покупка монет за цикл</span><span>{{ coin.max_buy_coins_cycle }}</span></div>
        <div class="box"><span>Макс. покупка монет за игру</span><span>{{ coin.max_buy_coins_game }}</span></div>
        <div class="box"><span>Макс. покупка доп. монет за цикл</span><span>{{ coin.max_buy_additional_coins_cycle }}</span></div>
        <div class="box"><span>Макс. покупка доп. монет за игру</span><span>{{ coin.max_buy_additional_coins_game }}</span></div>
        <div class="box"><span>Мин. кол-во монет для продажи</span><span>{{ coin.min_number_coins_sale }}</span></div>
    </div>
</template>

<script lang="ts" setup>
import type { ICoin } from '../types';

defineProps<{
    coin: ICoin
}>()
</script>

<style scoped>
.box {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
}
</style>