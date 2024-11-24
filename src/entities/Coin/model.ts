import { defineStore } from "pinia";
import { computed, ref, watch, watchEffect, type Ref } from "vue";
import { fetchCoins } from "./api";
import type { ICoin } from "./types";
import { useDebouncedRefHistory } from "@vueuse/core";

interface ILink {
    url: null | string
    label: string
    active: boolean
}

export const useCoinModel = defineStore('coin', () => {
    const coins = ref<ICoin[]>([])
    const pages = ref<number>(0);
    const current_page = ref<number>(1);
    const url = computed(() => `/api/coin?page=${current_page.value}&per_page=${4}`);
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
        const response = await fetchCoins(url.value);
        isFetching.value = false;

        coins.value = response.data.data as ICoin[]
        pages.value = Math.ceil(response.data.total / response.data.per_page)
    }

    watchEffect(() => {
        getCoins()
    })

    return {
        coins,
        isFetching,
        message,
        getCoins,
        pages,
        current_page,
    };
})