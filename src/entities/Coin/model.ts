import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { fetchCoins } from "./api";
import type { ICoin } from "./types";

export const useCoinModel = defineStore('coin', () => {
    const coins = ref<ICoin[]>([])
    async function getCoins() {
        const response = await fetchCoins()
        coins.value = response.data as ICoin[]
    }

    return {
        coins: coins,
        getCoins,
    };
})