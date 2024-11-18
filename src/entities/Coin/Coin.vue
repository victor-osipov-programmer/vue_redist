<template>
    <div class="coin info">
        <div class="buy"><span>Покупка</span> {{ coin.price_buy_coin }}</div>
        <div class="sell"><span>Продажа</span> {{ coin.price_sale_coin }}</div>

        <hr />

        <div class="coin-text">
            <span>Название</span> {{ coin.name }}
        </div>
        <div class="total-coins">
            <span>Баланс</span> {{ coin.user_coins ?? 0 }}
        </div>

        <div class="actions">
            <AppButton
                @click="emit('open:buy_panel')"
                class="buy-button"
                >Купить</AppButton
            >
            <AppButton
                @click="emit('open:sell_panel')"
                class="sell-button"
                >Продать</AppButton
            >
        </div>
    </div>
</template>

<script lang="ts" setup>
import AppButton from "@/shared/ui/AppButton.vue";
import type { ICoin } from "./types";

defineProps<{
    coin: ICoin;
}>();

const emit = defineEmits(['open:buy_panel', 'open:sell_panel'])
</script>

<style scoped>
.coin {
    background-color: white;
    border-radius: 5px;
    padding: 0.5rem;
    box-shadow: 0px 10px 80px 0 rgba(34, 60, 80, 0.2);
}

.total-coins,
.buy,
.sell,
.commission,
.coin-text {
    display: flex;
    justify-content: space-between;
    gap: 2rem;
}
.actions {
    display: flex;
    margin-top: 0.5rem;
    gap: 0.5rem;
}
</style>
