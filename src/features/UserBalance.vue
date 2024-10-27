<template>
    <div class="user-balance" @click="">
        
    </div>
    <router-link :to="{name: 'profile'}" class="user-balance">
        <Chip>{{ user_model.user?.balance ? user_model.user?.balance : 0 }}</Chip>
    </router-link>
</template>

<script setup>
import { useUserModel } from '@/entities/User/model';
import Chip from '@/shared/ui/Chip.vue';
import { useRouter } from 'vue-router';

const user_model = useUserModel()


</script>

<style scoped>

</style>