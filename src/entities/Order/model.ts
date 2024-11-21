import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { OrderApi } from ".";
import { useDebouncedRefHistory } from "@vueuse/core";

export const useOrderModel = defineStore("order", () => {
    const orders = ref<IOrder[]>([]);
    const { history } = useDebouncedRefHistory(orders, {
        deep: true,
        debounce: 1000,
    });
    watch(history, () => {
        if (
            JSON.stringify(history.value[0].snapshot) !=
            JSON.stringify(history.value[1].snapshot)
        ) {
            console.log("update orders");
            getOrders();
        }
    });
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

    function useCoinOrders(coin_id: number) {
        // console.log(orders.value.filter((order) => order.coin_id == coin_id));
        const coin_orders = computed(() => {
            return orders.value.filter((order) => order.coin_id == coin_id);
        });
        // const message = computed(() => {
        //     return isFetching.value
        //         ? "Загрузка ордеров..."
        //         : orders.value.length == 0
        //         ? "Ордеры не найдены"
        //         : null;
        // });

        return {
            orders,
            message,
            coin_orders,
        };
    }

    return {
        orders,
        message,
        isFetching,
        getOrders,
        cancelOrder,
        deleteOrder,
        getCoinOrders,
        useCoinOrders,
    };
});
