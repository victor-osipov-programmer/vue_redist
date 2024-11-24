import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { fetchCoins as fetchUser } from "./api";
import { http } from "@/shared/api";
import { useToast } from "primevue/usetoast";
import { useCoinModel } from "../Coin";
import { useOrderModel } from "../Order/model";


export const useUserModel = defineStore("user", () => {
    const toast = useToast()
    const coin_model = useCoinModel()
    const order_model = useOrderModel();
    const user = ref(null);
    watch(user, (value, old_value) => {
        if (!old_value && user.value) {
            console.log('connected', `users.${user.value.id}`)
            window.Echo.private(`users.${user.value.id}`)
            .listen("Buy", (e) => {
                console.log('Buy', e);
                toast.add({ severity: 'success', summary: `Покупка "${e.order.coin.name}"`, detail: `Вы купили ${e.data.number_coins} шт.`, life: 3000})
                if (e.order.status == 'completed') {
                    toast.add({ severity: 'success', summary: `Ордер на покупку "${e.order.coin.name}" исполнен`, life: 3000 })
                }
                getUser()
                coin_model.getCoins()
            })
            .listen("Sell", (e) => {
                console.log('Sell', e);
                toast.add({ severity: 'success', summary: `Продажа "${e.order.coin.name}"`, detail: `Вы продали ${e.data.number_coins} шт. за ${e.data.price_coins} руб. (коммисия ${e.data.commission} руб.)`, life: 3000 })
                if (e.order.status == 'completed') {
                    toast.add({ severity: 'success', summary: `Ордер на продажу "${e.order.coin.name}" исполнен`, life: 3000 })
                }
                getUser()
                coin_model.getCoins()
            });
        }
    })
    
    const is_login = ref(localStorage.getItem("is_login") == 'true' ? true : false);
    watch(is_login, () => {
        localStorage.setItem("is_login", String(is_login.value));
    });

    async function login() {
        const response = await fetchUser();
        is_login.value = true;
        user.value = response.data;
    }
    async function getUser() {
        if (is_login.value) {
            const response = await fetchUser();
            user.value = response.data;
        }
    }
    async function logout() {
        is_login.value = false;
        window.Echo.leave(`users.${user.value.id}`)
        user.value = null;
        window.router.push({ name: "login" });
        await http.get("/logout");
    }

    return {
        user,
        getUser,
        logout,
        is_login,
        login
    };
});
