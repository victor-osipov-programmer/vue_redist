import { defineStore } from "pinia";
import type { IRequest } from "./types";
import { ref } from "vue";

export const useRequestModel = defineStore('request', () => {
    const requests = ref<IRequest[]>([
        {
            id: 1,
            number_currency: 100,
            status: "waiting",
            updated_at: new Date().toLocaleDateString(),
            withdrawal_method: "sberbank",
        },
        {
            id: 2,
            number_currency: 250,
            status: "success",
            updated_at: new Date().toLocaleDateString(),
            withdrawal_method: "telephone",
        },
        {
            id: 3,
            number_currency: 10000,
            status: "canceled",
            updated_at: new Date().toLocaleDateString(),
            withdrawal_method: "telegram-wallet",
        },
        {
            id: 4,
            number_currency: 50,
            status: "success",
            updated_at: new Date().toLocaleDateString(),
            withdrawal_method: "t-bank",
        },
    ]);


    return {
        requests,
    };
})