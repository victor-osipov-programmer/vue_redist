<template>
    <div class="app-nav">
        <router-link :to="{name: 'play'}">Играть</router-link>
        <router-link :to="{name: 'about'}">О нас</router-link>
    </div>
</template>

<script setup>

</script>

<style scoped>
.app-nav {
    display: flex;
    align-items: center;
    gap: 1rem;
}
</style>