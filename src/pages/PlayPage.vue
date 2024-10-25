<template>
    <div class="play-page page">
        <div class="container">
            <Coin v-for="coin in coin_model.coins" :coin>

            </Coin>
        </div>
    </div>
</template>

<script setup>
import { Coin, useCoinModel } from '@/entities/Coin';

const coin_model = useCoinModel()
coin_model.getCoins()
</script>

<style scoped>

</style>