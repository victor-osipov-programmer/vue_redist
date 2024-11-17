<template>
    <div class="play-page page">
        <div class="container">
            

            <div class="coins">
                <div class="coins__actions">
                    <AppButton
                        class="create-coin-button"
                        @click="modal.open()"
                        color="primary"
                        >Создать монету</AppButton
                    >
                </div>
                
                <Coin v-for="coin in coin_model.coins" :coin></Coin>
                <p class="coins__not" v-if="coin_model.coins.length === 0">
                    Монеты не найдены
                </p>
            </div>
        </div>

        <Modal ref="modal" @close="disableValidation">
            <div class="modal_content">
                <FloatLabel variant="on">
                    <InputText
                        :invalid="Boolean(form.name.error)"
                        v-model="form.name.text"
                        inputId="name"
                        :min="100"
                        :max="1000000"
                    />
                    <label for="name">*Название</label>
                </FloatLabel>

                <FloatLabel variant="on">
                    <InputNumber
                        :invalid="Boolean(form.total_coins.error)"
                        v-model="form.total_coins.text"
                        inputId="total_coins"
                        :min="100"
                        :max="1000000"
                    />
                    <label for="total_coins">*Всего монет</label>
                </FloatLabel>

                <FloatLabel variant="on">
                    <InputNumber
                        v-model="form.one_cycle.text"
                        inputId="one_cycle"
                        :min="1"
                        :max="1000000"
                    />
                    <label for="one_cycle">Секунд в цикле</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <InputNumber
                        v-model="form.commission.text"
                        inputId="commission"
                        :min="1"
                        :max="100"
                    />
                    <label for="commission">Комиссия</label>
                </FloatLabel>

            
                <FloatLabel variant="on">
                    <InputNumber
                        :invalid="Boolean(form.price_buy_coin.error)"
                        v-model="form.price_buy_coin.text"
                        inputId="price_buy_coin"
                        :min="0.01"
                        :max="1000000"
                    />
                    <label for="price_buy_coin">*Цена покупки монеты</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <InputNumber
                        v-model="form.max_buy_coins_cycle.text"
                        inputId="max_buy_coins_cycle"
                        :min="0"
                        :max="1000000"
                    />
                    <label for="max_buy_coins_cycle"
                        >Макс. покупка монет за цикл</label
                    >
                </FloatLabel>
                <FloatLabel variant="on">
                    <InputNumber
                        v-model="form.max_buy_coins_game.text"
                        inputId="max_buy_coins_game"
                        :min="0"
                        :max="1000000"
                    />
                    <label for="max_buy_coins_game"
                        >Макс. покупка монет за игру</label
                    >
                </FloatLabel>

                <FloatLabel variant="on">
                    <InputNumber
                        v-model="form.price_buy_additional_coin.text"
                        inputId="price_buy_additional_coin"
                        :min="0.01"
                        :max="1000000"
                    />
                    <label for="price_buy_additional_coin"
                        >Цена покупки доп. монеты</label
                    >
                </FloatLabel>
                <FloatLabel variant="on">
                    <InputNumber
                        v-model="form.max_buy_additional_coins_cycle.text"
                        inputId="max_buy_additional_coins_cycle"
                        :min="0"
                        :max="1000000"
                    />
                    <label for="max_buy_additional_coins_cycle"
                        >Макс. покупка доп. монет за цикл</label
                    >
                </FloatLabel>
                <FloatLabel variant="on">
                    <InputNumber
                        v-model="form.max_buy_additional_coins_game.text"
                        inputId="max_buy_additional_coins_game"
                        :min="0"
                        :max="1000000"
                    />
                    <label for="max_buy_additional_coins_game"
                        >Макс. покупка доп. монет за игру</label
                    >
                </FloatLabel>

                <FloatLabel variant="on">
                    <InputNumber
                        :invalid="Boolean(form.price_sale_coin.error)"
                        v-model="form.price_sale_coin.text"
                        inputId="price_sale_coin"
                        :min="0.01"
                        :max="1000000"
                    />
                    <label for="price_sale_coin">*Цена продажи монеты</label>
                </FloatLabel>

                <FloatLabel variant="on">
                    <InputNumber
                        v-model="form.min_number_coins_sale.text"
                        inputId="min_number_coins_sale"
                        :min="0"
                        :max="1000000"
                    />
                    <label for="min_number_coins_sale"
                        >Мин. кол-во для продажи</label
                    >
                </FloatLabel>
                

                <AppButton
                    class="create-coin"
                    @click="createCoin"
                    color="primary"
                    >Создать</AppButton
                >
            </div>
        </Modal>
    </div>
</template>

<script lang="ts" setup>
import { Coin, useCoinModel } from "@/entities/Coin";
import { useUserModel } from "@/entities/User/model";
import Modal from "@/features/Modal.vue";
import { http } from "@/shared/api";
import { useForm } from "@/shared/libs/form";
import AppInput from "@/shared/ui/AppInput.vue";
import { useToast } from "primevue/usetoast";
import { nextTick, ref, toValue, useTemplateRef, watchEffect } from "vue";
import { useId } from "vue";

const toast = useToast();
const user_model = useUserModel();
const coin_model = useCoinModel();
coin_model.getCoins();

const form = ref({
    name: { text: null, required: true, error: null },
    total_coins: { text: 1000, required: true, error: null },
    one_cycle: { text: 3600, error: null },
    price_sale_coin: { text: null, required: true, error: null },
    price_buy_coin: { text: null, required: true, error: null },
    max_buy_coins_cycle: { text: null, error: null },
    max_buy_coins_game: { text: null, error: null },
    price_buy_additional_coin: { text: null, error: null },
    max_buy_additional_coins_cycle: { text: null, error: null },
    max_buy_additional_coins_game: { text: null, error: null },
    min_number_coins_sale: { text: null, error: null },
    commission: { text: 1, error: null },
});

const { data, isError, enableValidation, disableValidation } = useForm(
    form,
    true
);

const modal = useTemplateRef("modal");

async function createCoin() {
    await enableValidation();

    if (isError.value) {
        return toast.add({
            severity: "error",
            summary: "Ошибка",
            detail: "Заполните обязательные поля",
            life: 3000,
        });
    }

    http.post("/api/coin", data.value)
        .then(() => {
            coin_model.getCoins();
            toast.add({
                severity: "success",
                summary: "Монета создана",
                life: 3000,
            });
            modal.value.close()
        })
        .catch((err) => {
            toast.add({
                severity: "error",
                summary: "Ошибка, монета не создана",
                detail: "Попробуйте снова",
                life: 3000,
            });
        });
}
</script>

<style scoped>
.coins {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    /* margin-top: 3rem; */
}

.coins__not {
    color: grey;
    text-transform: uppercase;
}
.create-coin-button {
    grid-column: span 1;
}
.coins__actions {
    display: grid;
    grid-template-columns: subgrid;
    grid-column: span 4;
}
.modal_content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}
.create-coin {
    min-height: 20px;
}
.p-floatlabel:first-child {
    grid-column: span 3;
}
</style>
