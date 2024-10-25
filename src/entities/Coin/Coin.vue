<template>
    <div class="coin">
        <div class="buy"><span>Покупка</span> {{ coin.price_buy_coin }}</div>
        <div class="sell"><span>Продажа</span> {{ coin.price_sale_coin }}</div>
        
       <hr>

        <div class="total-coins"><span>Всего монет</span> {{ coin.total_coins }}</div>
        <div class="commission"><span>Комиссия</span> {{ coin.commission }}</div>

        <div class="actions">
            <AppButton @click="buyCoin" class="buy-button">Купить</AppButton>
            <AppButton class="sell-button">Продать</AppButton>
            
        </div>

        <Modal ref="buy_modal">
            <div><span>id</span><span>{{ coin.id }}</span></div>
            <div><span>Всего монет</span><span>{{ coin.total_coins }}</span></div>
            <div><span>Можно купить</span><span>{{ coin.buy_to_bank_coins }}</span></div>
            <div><span>Можно продать</span><span>{{ coin.sale_to_bank_coins }}</span></div>
            <div><span>Текущий цикл</span><span>{{ coin.current_cycle }}</span></div>
            <div><span>Цикл</span><span>{{ coin.one_cycle }}</span></div>
            <div><span>Продажа</span><span>{{ coin.price_sale_coin }}</span></div>
            <div><span>Покупка</span><span>{{ coin.price_buy_coin }}</span></div>
            <div><span>Макс. покупка за цикл</span><span>{{ coin.max_buy_coins_cycle }}</span></div>
            <div><span>Макс. покупка за игру</span><span>{{ coin.max_buy_coins_game }}</span></div>
            <div><span>Цена покупки доп. монеты</span><span>{{ coin.price_buy_additional_coin }}</span></div>
            <div><span>Максимальная покупка доп. монет за цикл</span><span>{{ coin.max_buy_additional_coins_cycle }}</span></div>
            <div><span>Максимальная покупка доп. монет за игру</span><span>{{ coin.max_buy_additional_coins_game }}</span></div>
            <div><span>Расход банка</span><span>{{ coin.expenses }}</span></div>
            <div><span>Доход банка</span><span>{{ coin.income }}</span></div>
            <div><span>Мин. кол-во для продажи</span><span>{{ coin.min_number_coins_sale }}</span></div>
            <div><span>Коммисия</span><span>{{ coin.commission }}</span></div>
            <div><span>creator_id</span><span>{{ coin.creator_id }}</span></div>
            <div><span>created_at</span><span>{{ coin.created_at }}</span></div>
            <div><span>updated_at</span><span>{{ coin.updated_at }}</span></div>
        </Modal>
    </div>
</template>

<script lang="ts" setup>
import AppButton from '@/shared/ui/AppButton.vue';
import type { ICoin } from './types';
import { onMounted, ref, useTemplateRef } from 'vue';
import Modal from '@/features/Modal.vue';

const buy_model = useTemplateRef('buy_modal')

function buyCoin() {
    buy_model.value.open()
}

defineProps<{
    coin: ICoin
}>()
</script>

<style scoped>
.coin {
    display: grid;
    gap: 0.2rem;
    background-color: white;
    border-radius: 5px;
    padding: 0.5rem;
    box-shadow: 0 1px 1px black, 
}
.total-coins, .buy, .sell, .commission {
    display: flex;
    justify-content: space-between;
    gap: 2rem;
}
.buy-button, .sell-button {
    width: 100%;
}
.actions {
    display: flex;
    margin-top: 0.5rem;
    gap: 0.5rem;
}

</style>