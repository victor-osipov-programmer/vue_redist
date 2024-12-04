<template>
    <div class="withdrawal-page page">
        <div class="container">
            <div class="withdrawal__header">
                <div class="withdrawal__form">
                    <h2 class="withdrawal__title">Заявка на вывод</h2>

                    <div class="inputs">
                        <FloatLabel variant="on">
                            <InputNumber
                                v-model="number_currency"
                                inputId="currency"
                            />
                            <label for="currency">Кол-во руб.</label>
                        </FloatLabel>
                        <InputMask
                            id="phone"
                            v-model="user_model.user.phone"
                            mask="+9 999 999 99 99"
                            placeholder="+7 999 999 99 99"
                            fluid
                            disabled
                        />
                    </div>

                    <div class="method">
                        <p class="method__title">Куда:</p>

                        <v-tabs v-model="method" color="green" grow>
                            <v-tab value="telephone">
                                <img class="method__icon" src="@/shared/img/telephone.png" alt="telephone">
                            </v-tab>
                            <v-tab value="sberbank">
                                <img class="method__icon sber" src="@/shared/img/sber.png" alt="sberbank">
                            </v-tab>
                            <v-tab value="t-bank">
                                <img class="method__icon" src="@/shared/img/t-bank.png" alt="t-bank">
                            </v-tab>
                            <v-tab value="telegram-wallet">
                                <img class="method__icon" src="@/shared/img/telegram-wallet.png" alt="telegram-wallet">
                            </v-tab>
                        </v-tabs>
                    </div>

                    <AppButton @click="withdrawal" class="withdrawal__btn">Вывести</AppButton>
                </div>

                <div class="info-plate">
                    <p>Минимальный вывод 19 руб.</p>
                    <p>Комиссия при выводе 20%</p>
                    <p>Вывод в течение 24 часов</p>
                </div>
            </div>

            <h3 class="withdrawal__requests-title">Ваши заявки:</h3>
            <p v-if="request_model.requests.length === 0" class="not_requests">—</p>

            <div class="requests">
                <Request v-for="request in request_model.requests" :request></Request>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import AppButton from "@/shared/ui/AppButton.vue";
import { ref } from "vue";
import { Request } from "@/entities/Request";
import { useRequestModel } from "@/entities/Request/model";
import { useUserModel } from "@/entities/User/model";

const number_currency = ref(0);
const telephone = ref("");
const method = ref(null);
const request_model = useRequestModel()
const user_model = useUserModel()



function withdrawal() {

}
</script>

<style scoped>
.withdrawal__header {
    display: flex;
    gap: 1rem;
    margin-bottom: 3rem;
}

.withdrawal__form {
    width: 100%;
}
.withdrawal__title {
    margin-bottom: 2rem;
    color: grey;
    font-size: 1.25rem;
}
.inputs {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
}
.method__title {
    color: grey;
}
.method__icon {
    height: 30px;
    border-radius: 5px;
}
.sber {
    height: 40px;
}
.withdrawal__requests-title {
    margin-bottom: 1rem;
    font-size: 1.25rem;
    color: var(--color-grey);
}
.requests {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    /* display: flex; */
    gap: 1rem;
}
.not_requests {
    font-size: 1.5rem;
    color: var(--color-grey);
}
</style>
