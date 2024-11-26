<template>
    <div class="replenishment-page page">
        <div class="container">
            <div class="replenishment__header">
                <table class="replenishment__table">
                    <thead>
                        <tr>
                            <th class="text-left">Номер пополнения или кол-во рефералов</th>
                            <th class="text-left">Бонус</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr :class="{'current-bonus': current_bonus.number == item.number}" v-for="item in bonuses" :key="item.number">
                            <td class="number">{{ item.number }} или {{ item.referrals }} реф.</td>
                            <td class="bonus">+{{ item.bonus }}%</td>
                        </tr>
                    </tbody>
                </table>

                <div class="info-plate">
                    <p>Минимальное пополнение 19 руб.</p>
                    <p>Минимальный вывод 19 руб.</p>
                    <p>Комиссия при выводе 20%</p>
                </div>
            </div>
            
            <div class="replenishment">
                <h3 class="replenishment__title">Способы пополнения:</h3>

                <div class="replenishment__items">
                    <img class="replenishment__item yookassa" src="@/shared/img/yookassa.png" alt="yookassa">
                    <img class="replenishment__item telegram-wallet" src="@/shared/img/telegram-wallet.png" alt="telegram-wallet">
                </div>
            </div>
            
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const bonuses = ref([
    {
        number: 1,
        referrals: 1,
        bonus: 25
    },
    {
        number: 2,
        referrals: 0,
        bonus: 20
    },
])

const replenishment_number = ref(3)
const referrals_number = ref(1)

const current_bonus = computed(() => bonuses.value.find(item => item.number == replenishment_number.value || referrals_number.value == item.referrals))
</script>

<style scoped>

.number {
    font-size: 1.5rem;
}
.bonus {
    color: green;
    font-size: 1.5rem;
}
.replenishment__header {
    display: flex;
    gap: 1rem;
    margin-bottom: 3rem;
    
}
.current-bonus {
    background-color: rgba(143, 250, 116, 0.315);
}
.replenishment__title {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: grey;
    color: var(--color-grey);
}
.replenishment__items {
    display: flex;
    align-items: center;
    gap: 2rem;
}
.replenishment__item {
    height: 60px;
    cursor: pointer;
}
.yookassa {
    height: 40px;
}
.telegram-wallet {
    border-radius: 5px;
}
</style>
