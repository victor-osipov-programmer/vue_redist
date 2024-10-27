<template>
    <div class="play-page page">
        <div class="container">
            <AppButton @click="modal.open()" color="primary">Создать коин</AppButton>

            <div class="coins">
                <Coin v-for="coin in coin_model.coins" :coin></Coin>
                <p class="coins__not" v-if="coin_model.coins.length === 0">Коины не найдены</p>
            </div>
        </div>

        <Modal ref="modal">
            <div>
                <FloatLabel>
                    <InputNumber v-model="value1" inputId="over_label" mode="currency" currency="USD" locale="en-US" />
                    <label for="over_label">Всего коинов</label>
                </FloatLabel>
                <AppInput placeholder="Всего клиноа" type="number"/>
                'total_coins' => 'required|integer|min:100|max:1000000',

                'one_cycle' => 'nullable|integer|min:1|max:' . config('global.year_in_seconds'),
                'total_cycles' => 'nullable|integer|min:1|max:1000000',

                'price_sale_coin' => 'required|decimal:0,2|min:0.01|max:1000000',

                'price_buy_coin' => 'required|decimal:0,2|min:0.01|max:1000000',
                'max_buy_coins_cycle' => 'nullable|integer|min:0|max:1000000',
                'max_buy_coins_game' => 'nullable|integer|min:0|max:1000000',


                'price_buy_additional_coin' => 'nullable|decimal:0,2|min:0.01|max:1000000',
                'max_buy_additional_coins_cycle' => 'nullable|integer|min:0|max:1000000',
                'max_buy_additional_coins_game' => 'nullable|integer|min:0|max:1000000',

                'min_number_coins_sale' => 'nullable|integer|min:0|max:1000000',
                'commission' => 'nullable|integer|min:1|max:100',
            </div>
        </Modal>
    </div>
</template>

<script lang="ts" setup>
import { Coin, useCoinModel } from '@/entities/Coin';
import { useUserModel } from '@/entities/User/model';
import Modal from '@/features/Modal.vue';
import AppInput from '@/shared/ui/AppInput.vue';
import { useTemplateRef } from 'vue';
import { useId } from 'vue';

const user_model = useUserModel()
const coin_model = useCoinModel()
coin_model.getCoins()


const modal = useTemplateRef('modal')
</script>

<style scoped>
.coins {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin-top: 3rem;
}

.coins__not {
    color: grey;
    text-transform: uppercase;
}
.app-button {
    width: 200px;
}
</style>