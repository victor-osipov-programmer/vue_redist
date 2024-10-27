<template>
    <div class="profile-page page">
        <div class="container">
            <AppButton @click="user_model.logout">Выйти</AppButton>
        </div>
    </div>
</template>

<script setup>
import AppButton from '@/shared/ui/AppButton.vue';
import { useUserModel } from '@/entities/User/model';

const user_model = useUserModel()
</script>

<style lang="scss" scoped>

</style>