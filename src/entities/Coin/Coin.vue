<template>
    <div class="coin info">
        <div class="buy"><span>Покупка</span> {{ coin.price_buy_coin }}</div>
        <div class="sell"><span>Продажа</span> {{ coin.price_sale_coin }}</div>

        <hr />

        <div class="total-coins">
            <span>Всего монет</span> {{ coin.total_coins }}
        </div>
        <div class="commission">
            <span>Комиссия</span> {{ coin.commission }}
        </div>

        <div class="actions">
            <AppButton
                @click="openBuyPanel"
                class="buy-button"
                >Купить</AppButton
            >
            <AppButton
                @click="openSellPanel"
                class="sell-button"
                >Продать</AppButton
            >
        </div>

        <Modal ref="modal" @close="disableValidation">
            <div class="modal_content">
                <CoinInfo :coin />

                <Tabs :value="tab">
                    <TabList>
                        <Tab @click="openBuyPanel" value="buy">Купить</Tab>
                        <Tab @click="openSellPanel" value="sell">Продать</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel class="panel" value="buy">
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
                        </TabPanel>
                        <TabPanel class="panel" value="sell">
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
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
        </Modal>
    </div>
</template>

<script lang="ts" setup>
import AppButton from "@/shared/ui/AppButton.vue";
import type { ICoin } from "./types";
import { nextTick, onMounted, ref, useTemplateRef, watchEffect } from "vue";
import Modal from "@/features/Modal.vue";
import { http } from "@/shared/api";
import CoinInfo from "./ui/CoinInfo.vue";
import { useToast } from "primevue/usetoast";
import { useForm } from "@/shared/libs/form";
import { useUserModel } from "../User/model";
import { useCoinModel } from "./model";

const props = defineProps<{
    coin: ICoin;
}>();

const user_model = useUserModel()
const coin_model = useCoinModel()
const tab = ref('buy');
const modal = useTemplateRef("modal");
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

function openBuyPanel() {
    modal.value.open();
    tab.value = 'buy';
}
function openSellPanel() {
    modal.value.open();
    tab.value = 'sell';
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
                toast.add({
                    severity: "success",
                    summary: "Коины проданы",
                    detail: `Вы продали ${number_coins.value.text} коинов за ${response.data.received_currency} рублей`,
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

async function buyCoins() {
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
        http.post(`/api/coin/${props.coin.id}/buy/bank`, {
            number_coins: number_coins.value.text,
            additional_coins: additional_coins.value,
        })
            .then((response) => {
                console.log(response.data);
                updateModels()
                
                toast.add({
                    severity: "success",
                    summary: "Коины куплены",
                    detail: `Вы купили ${number_coins.value.text} коинов за ${response.data.spent_currency} рублей`,
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
                console.log(response.data);
                updateModels()
                
                toast.add({
                    severity: "success",
                    summary: "Ордер на покупку создан",
                    life: 3000,
                });
                if (response.data.received_coins && response.data.received_coins !== 0) {
                    toast.add({
                        severity: "success",
                        summary: `Покупка монет с ID ${props.coin.id}`,
                        detail: `Вы купили ${response.data.received_coins} монет`,
                        life: 3000,
                    });
                }
            })
            .catch((err) => {
                toast.add({
                    severity: "error",
                    summary: "Ошибка покупки",
                    detail: err.response.data?.message,
                    life: 3000,
                });
            });
    }
}

function updateModels() {
    user_model.getUser()
    coin_model.getCoins()
}
</script>

<style scoped>
.coin {
    background-color: white;
    border-radius: 5px;
    padding: 0.5rem;
    box-shadow: 0px 10px 80px 0 rgba(34, 60, 80, 0.2);
}

.total-coins,
.buy,
.sell,
.commission {
    display: flex;
    justify-content: space-between;
    gap: 2rem;
}
.actions {
    display: flex;
    margin-top: 0.5rem;
    gap: 0.5rem;
}

.modal_content {
    display: flex;
    gap: 3rem;
}
:deep(.panel) {
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
/* .v-tabs {
    margin-bottom: 2rem;
    border-radius: 5px;
} */
.p-tab {
    flex-grow: 1;
}
</style>
