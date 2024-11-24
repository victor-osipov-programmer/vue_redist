import { defineStore } from "pinia";
import { OrderApi } from ".";

export const useOrderModel = defineStore("order", () => {
    async function cancelOrder(id: number) {
        await OrderApi.cancelOrder(id);
    }

    return {
        cancelOrder,
    };
});
