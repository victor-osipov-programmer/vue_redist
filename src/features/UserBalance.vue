<template>
    <div class="user-balance" @click="">
        
    </div>
    <router-link :to="{name: 'profile'}" class="user-balance">
        <Chip>100</Chip>
    </router-link>
</template>

<script setup>
import Chip from '@/shared/ui/Chip.vue';
import { useRouter } from 'vue-router';


</script>

<style scoped>

</style>