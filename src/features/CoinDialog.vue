<template>
    <Dialog
        @hide="disableValidation"
        v-model:visible="coin_dialog"
        modal
        header=" "
        :style="{ height: '450px' }"
    >
        <div class="modal_content">
            <CoinInfo :coin />

            <v-card elevation="0">
                <v-tabs v-model="tab" bg-color="transparent" color="green" grow>
                    <v-tab value="buy">Купить</v-tab>
                    <v-tab value="sell">Продать</v-tab>
                    <v-tab value="orders">Ордера</v-tab>
                </v-tabs>

                <v-tabs-window v-model="tab">
                    <v-tabs-window-item class="panel" value="buy">
                        <AppInput
                            :disabled="is_bank"
                            type="number"
                            class="panel__input"
                            placeholder="Цена покупки"
                            v-model="price_coin"
                            required
                        ></AppInput>
                        <AppInput
                            type="number"
                            class="panel__input"
                            placeholder="Кол-во монет"
                            v-model="number_coins"
                            required
                        ></AppInput>

                        <label class="panel__label panel__label1">
                            <input
                                v-model="is_bank"
                                class="panel__checkbox"
                                type="checkbox"
                            />
                            Купить у банка
                        </label>
                        <label v-if="is_bank" class="panel__label">
                            <input
                                v-model="additional_coins"
                                class="panel__checkbox"
                                type="checkbox"
                            />
                            Доп. монеты
                        </label>
                        <AppButton @click="buyCoins" class="panel__button"
                            >Купить</AppButton
                        >
                    </v-tabs-window-item>

                    <v-tabs-window-item class="panel" value="sell">
                        <AppInput
                            :disabled="is_bank"
                            type="number"
                            class="panel__input"
                            placeholder="Цена продажи"
                            v-model="price_coin"
                            required
                        ></AppInput>
                        <AppInput
                            type="number"
                            class="panel__input"
                            placeholder="Кол-во монет"
                            v-model="number_coins"
                            required
                        ></AppInput>

                        <label class="panel__label panel__label1">
                            <input
                                v-model="is_bank"
                                class="panel__checkbox"
                                type="checkbox"
                            />
                            Продать банку
                        </label>
                        <AppButton @click="sellCoins" class="panel__button"
                            >Продать</AppButton
                        >
                    </v-tabs-window-item>

                    <v-tabs-window-item class="panel" value="orders">
                        <div class="orders-wrap">
                            <div class="orders">
                                <!-- <Order
                                    v-for="order in coin_orders.coin_orders"
                                    :order
                                    @cancel_order="cancelOrder(order.id)"
                                ></Order> -->
                                <div>
                                    {{ coin_orders.coin_orders }}
                                    <!-- {{ coin_orders.message }} -->
                                </div>
                            </div>
                        </div>
                    </v-tabs-window-item>
                </v-tabs-window>
            </v-card>
        </div>
    </Dialog>
</template>

<script lang="ts" setup>
import { CoinInfo, useCoinModel, type ICoin } from "@/entities/Coin";
import { Order } from "@/entities/Order";
import { useOrderModel } from "@/entities/Order/model";
import { useUserModel } from "@/entities/User/model";
import { http } from "@/shared/api";
import { useForm } from "@/shared/libs/form";
import { useToast } from "primevue/usetoast";
import { ref, watchEffect } from "vue";

const props = defineProps<{
    coin: ICoin;
}>();


const coin_dialog = defineModel<boolean>();
const tab = defineModel<string>("tab");
const user_model = useUserModel();
const coin_model = useCoinModel();
const order_model = useOrderModel();
// const tab = ref('buy');
const price_coin = ref({ text: props.coin.price_buy_coin });
const number_coins = ref({ text: null });
const is_bank = ref(false);
const additional_coins = ref(false);
const toast = useToast();
const form = ref({
    price_coin,
    number_coins,
});
const { isError, data, enableValidation, disableValidation } = useForm(form);
const coin_orders = order_model.useCoinOrders(props.coin.id)
console.log(coin_orders.coin_orders.value)

function openBuyPanel() {
    coin_dialog.value = true;
    tab.value = "buy";
}
function openSellPanel() {
    coin_dialog.value = true;
    tab.value = "sell";
}
// function openOrdersPanel() {
//     coin_dialog.value = true;
//     tab.value = "orders";
// }

async function buyCoins() {
    await enableValidation();

    if (isError.value) {
        return toast.add({
            severity: "error",
            summary: "Ошибка",
            detail: "Заполните правильно поля",
            // life: 3000,
        });
    }
    if (is_bank.value) {
        http.post(`/api/coin/${props.coin.id}/buy/bank`, {
            number_coins: number_coins.value.text,
            additional_coins: additional_coins.value,
        })
            .then((response) => {
                console.log(response.data);
                updateModels();

                toast.add({
                    severity: "success",
                    summary: "Монеты куплены",
                    detail: `Вы купили ${number_coins.value.text} монет за ${response.data.spent_currency} рублей`,
                    life: 3000,
                });
            })
            .catch((err) => {
                toast.add({
                    severity: "error",
                    summary: "Ошибка покупки",
                    detail: err.response.data?.message,
                    life: 3000,
                });
            });
    } else {
        http.post(`/api/coin/${props.coin.id}/buy`, {
            number_coins: number_coins.value.text,
            price_coin: price_coin.value.text,
        })
            .then((response) => {
                console.log(response);
                updateModels();

                toast.add({
                    severity: "success",
                    summary: "Ордер на покупку создан",
                    life: 3000,
                });
            })
            .catch((err) => {
                console.log(123, err);
                toast.add({
                    severity: "error",
                    summary: "Ошибка покупки",
                    detail: err.response.data?.message,
                    life: 3000,
                });
            });
    }
}

async function sellCoins() {
    await enableValidation();

    if (isError.value) {
        return toast.add({
            severity: "error",
            summary: "Ошибка",
            detail: "Заполните правильно поля",
            life: 3000,
        });
    }

    if (is_bank.value) {
        http.post(`/api/coin/${props.coin.id}/sell/bank`, {
            number_coins: number_coins.value.text,
        })
            .then((response) => {
                console.log(response.data);
                updateModels();

                toast.add({
                    severity: "success",
                    summary: "Монеты проданы",
                    detail: `Вы продали ${number_coins.value.text} монет за ${response.data.received_currency} рублей`,
                    life: 3000,
                });
            })
            .catch((err) => {
                toast.add({
                    severity: "error",
                    summary: "Ошибка продажи",
                    detail: err.response.data?.message,
                    life: 3000,
                });
            });
    } else {
        http.post(`/api/coin/${props.coin.id}/sell`, {
            number_coins: number_coins.value.text,
            price_coin: price_coin.value.text,
        })
            .then((response) => {
                console.log(response.data);
                updateModels();

                toast.add({
                    severity: "success",
                    summary: "Ордер на продажу создан",
                    life: 3000,
                });
            })
            .catch((err) => {
                toast.add({
                    severity: "error",
                    summary: "Ошибка продажи",
                    detail: err.response.data?.message,
                    life: 3000,
                });
            });
    }
}

async function cancelOrder(id: number) {
    await order_model.cancelOrder(id).then(() => {
        order_model.deleteOrder(id);

        toast.add({
            severity: "success",
            summary: "Ордер отменён",
            life: 3000,
        });
    });
    updateModels();
}

function updateModels() {
    user_model.getUser();
    coin_model.getCoins();
    order_model.getOrders();
}

defineExpose({
    openBuyPanel,
    openSellPanel,
});

watchEffect(() => {
    if (tab.value == "buy") {
        if (is_bank.value) {
            price_coin.value.text = props.coin.price_buy_coin;
        }
        if (additional_coins.value) {
            price_coin.value.text = props.coin.price_buy_additional_coin;
        }
    } else {
        if (is_bank.value) {
            price_coin.value.text = props.coin.price_sale_coin;
        }
    }
});
</script>

<style scoped>
.modal_content {
    display: flex;
    gap: 3rem;
}
.orders-wrap {
    overflow: auto;
    max-height: 280px;
}
.orders-wrap::-webkit-scrollbar {
    width: 0;
}
.orders {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
.panel {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.panel__input {
    grid-column: 1/3;
}
.panel__label1 {
    margin-top: 0.5rem;
}
.panel__label {
    text-wrap: nowrap;
    font-size: 0.8rem;
}
.panel__checkbox {
    vertical-align: middle;
}

.v-tabs {
    margin-bottom: 1rem;
}
</style>
