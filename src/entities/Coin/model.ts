import { defineStore } from "pinia";
import { computed, ref, watch, type Ref } from "vue";
import { fetchCoins } from "./api";
import type { ICoin } from "./types";
import { useDebouncedRefHistory } from "@vueuse/core";

export const useCoinModel = defineStore('coin', () => {
    const coins = ref<ICoin[]>([])
    const { history } = useDebouncedRefHistory(coins, {
        deep: true,
        debounce: 1000,
    });
    watch(history, () => {
        if (
            JSON.stringify(history.value[0].snapshot) !=
            JSON.stringify(history.value[1].snapshot)
        ) {
            console.log("update coins");
            getCoins();
        }
    });
    const isFetching = ref<boolean>(false);
    const message = computed(() => {
        return isFetching.value
            ? "Загрузка монет..."
            : coins.value.length == 0
            ? "Монеты не найдены"
            : null;
    });
    async function getCoins() {
        isFetching.value = true;
        const response = await fetchCoins()
        isFetching.value = false;
        coins.value = response.data as ICoin[]
    }

    return {
        coins,
        isFetching,
        message,
        getCoins,
    };
})