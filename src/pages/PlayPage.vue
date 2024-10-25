<template>
    <div class="play-page page">
        <div class="container">
            <div class="coins">
                <Coin v-for="coin in coin_model.coins" :coin></Coin>

            </div>
        </div>
    </div>
</template>

<script setup>
import { Coin, useCoinModel } from '@/entities/Coin';

const coin_model = useCoinModel()
coin_model.getCoins()
</script>

<style scoped>
.coins {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
}
</style>