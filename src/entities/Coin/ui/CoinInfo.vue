<template>
    <div class="coin-info info">
        <div class="progress">
            <ProgressBar  @click="op.toggle($event)" :value="percent"> 
                <template v-if="percent >= 20">
                    {{ coin.income }}/{{ coin.expenses }} 
                </template>
            </ProgressBar>
            <Popover ref="op">
                <div class="flex flex-col gap-4 w-[25rem]">
                    test
                </div>
            </Popover>
        </div>
        
        <Accordion value="0">
            <AccordionPanel value="0">
                <AccordionHeader>Общее</AccordionHeader>
                <AccordionContent>
                    <div v-if="coin.user_coins" class="box"><span>Ваши монеты</span><span>{{ coin.user_coins }}</span></div>
                    <div class="box"><span>Всего монет</span><span>{{ coin.total_coins }}</span></div>
                    <div class="box"><span>Комиссия</span><span>{{ coin.commission }}%</span></div>
                    <div class="box"><span>Цикл</span><span>{{ coin.one_cycle }} сек.</span></div>
                </AccordionContent>
            </AccordionPanel>
            <AccordionPanel value="1">
                <AccordionHeader>Курс</AccordionHeader>
                <AccordionContent>
                    <div class="box"><span>Покупка монеты</span><span>{{ coin.price_buy_coin }} ₽</span></div>
                    <div class="box"><span>Покупка доп. монеты</span><span>{{ coin.price_buy_additional_coin }} ₽</span></div>
                    <div class="box"><span>Продажа монеты</span><span>{{ coin.price_sale_coin }} ₽</span></div>
                </AccordionContent>
            </AccordionPanel>
            <AccordionPanel value="2">
                <AccordionHeader>Монеты банка</AccordionHeader>
                <AccordionContent>
                    <div class="box"><span>Для покупки</span><span>{{ coin.buy_to_bank_coins }}</span></div>
                    <div class="box"><span>Для продажи</span><span>{{ coin.sale_to_bank_coins }}</span></div>
                </AccordionContent>
            </AccordionPanel>
            <AccordionPanel value="3">
                <AccordionHeader>Ограничения</AccordionHeader>
                <AccordionContent>
                    <div class="box"><span>Макс. покупка монет за цикл</span><span>{{ coin.max_buy_coins_cycle }}</span></div>
                    <div class="box"><span>Макс. покупка монет за игру</span><span>{{ coin.max_buy_coins_game }}</span></div>
                    <div class="box"><span>Макс. покупка доп. монет за цикл</span><span>{{ coin.max_buy_additional_coins_cycle }}</span></div>
                    <div class="box"><span>Макс. покупка доп. монет за игру</span><span>{{ coin.max_buy_additional_coins_game }}</span></div>
                    <div class="box"><span>Мин. кол-во монет для продажи</span><span>{{ coin.min_number_coins_sale }}</span></div>
                </AccordionContent>
            </AccordionPanel>
        </Accordion>
    </div>
</template>

<script lang="ts" setup>
import { computed, useTemplateRef } from 'vue';
import type { ICoin } from '../types';

const props = defineProps<{
    coin: ICoin
}>()

const op = useTemplateRef('op')

// const show_percent = computed(() => {
//     return ;
// })
const percent = computed(() => {
    return Math.round(Math.min(props.coin.income / props.coin.expenses * 100, 100))
})
</script>

<style scoped>
.box {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
}
.p-accordion {
    width: 400px;
}
.progress {
    padding-inline: 18px;
}
</style>