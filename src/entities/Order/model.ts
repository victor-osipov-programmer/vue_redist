import { defineStore } from "pinia";
import { computed, ref, watch, watchEffect, type Ref } from "vue";
import { OrderApi } from ".";
import { useDebouncedRefHistory } from "@vueuse/core";

export const useOrderModel = defineStore("order", () => {
    const orders = ref<IOrder[]>([]);
    const isFetching = ref<boolean>(false);
    const message = computed(() => {
        return isFetching.value
            ? "Загрузка ордеров..."
            : orders.value.length == 0
            ? "Ордеры не найдены"
            : null;
    });

    async function getOrders() {
        isFetching.value = true;
        const response = await OrderApi.fetchOrders();
        isFetching.value = false;
        orders.value = response.data;
    }

    async function cancelOrder(id: number) {
        await OrderApi.cancelOrder(id);
    }

    function deleteOrder(id) {
        orders.value = orders.value.filter((order) => order.id !== id);
    }

    function getCoinOrders(coin_id: number) {
        return orders.value.filter((order) => order.coin_id == coin_id);
    }

    function useCoinOrders(coin_id: Ref<number>) {
        const coin_orders = computed(() => {
            return orders.value.filter((order) => order.coin_id == coin_id.value);
        });
        const coin_message = computed(() => {
            return isFetching.value
                ? "Загрузка ордеров..."
                : coin_orders.value.length == 0
                ? "Ордеры не найдены"
                : null;
        });

        return {
            orders: coin_orders,
            message: coin_message,
        };
    }

    return {
        // orders,
        // message,
        isFetching,
        getOrders,
        cancelOrder,
        deleteOrder,
        getCoinOrders,
        useCoinOrders,
    };
});
