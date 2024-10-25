import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchCoins } from "./api";

export const useCoinModel = defineStore('coin', () => {
    const coins = ref([])
    async function getCoins() {
        const response = await fetchCoins()
        coins.value = response.data
    }

    return {
        coins,
        getCoins
    }
})