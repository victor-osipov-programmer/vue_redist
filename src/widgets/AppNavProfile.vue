<template>
    <div class="app-nav-profile">
        <template v-if="user_model.is_login">
            <router-link :to="{name: 'replenishment'}">Пополнить</router-link>
            <router-link :to="{name: 'withdrawal'}">Вывести</router-link>

            <UserBalance></UserBalance>
        </template>
        <template v-else>
            <router-link :to="{name: 'login'}">Войти</router-link>
            <router-link :to="{name: 'login'}">Зарегаться</router-link>
        </template>
        
    </div>
</template>

<script setup>
import { useUserModel } from '@/entities/User/model';
import UserBalance from '@/features/UserBalance.vue';

const user_model = useUserModel()

</script>

<style scoped>
.app-nav-profile {
    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
}
.user-balance {
    margin-left: 1rem;
}
</style>