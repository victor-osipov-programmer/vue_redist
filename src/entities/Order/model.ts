import { defineStore } from "pinia";
import { ref } from "vue";
import { OrderApi } from ".";

export const useOrderModel = defineStore('order', () => {
    const orders = ref<IOrder[]>([]);
    async function getOrders() {
        const response = await OrderApi.fetchOrders();
        orders.value = response.data;
    }

    async function cancelOrder(id: number) {
        await OrderApi.cancelOrder(id)
    }

    return {
        orders,
        getOrders,
        cancelOrder,
    };
})