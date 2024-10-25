<template>
    <div class="app-nav-profile">
        <router-link :to="{name: 'replenishment'}">Пополнить</router-link>
        <router-link :to="{name: 'withdrawal'}">Вывести</router-link>

        <UserBalance></UserBalance>
    </div>
</template>

<script setup>
import UserBalance from '@/features/UserBalance.vue';



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