<template>
    <div class="app-header">
        <div class="app-header__container container">
            <div class="app-header__left">
                <router-link class="app-logo" :to="{name: 'login'}">header</router-link>

                <AppNav></AppNav>
            </div>
            

            <AppNavProfile></AppNavProfile>
        </div>
    </div>
</template>

<script setup>
import AppNav from './AppNav.vue';
import AppNavProfile from './AppNavProfile.vue';



</script>

<style scoped>
.app-header {
    background-color: var(--color-bg-primary);
    color: var(--color-text-primary);
    margin-bottom: 3rem;
    padding: 1rem;
}
.app-logo {
    text-transform: uppercase;
    font-weight: bold;
}
.app-header__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.app-header__left {
    display: flex;
    gap: 2rem;
    align-items: center;
}
</style>