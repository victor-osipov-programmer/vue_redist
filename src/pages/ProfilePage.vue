<template>
    <div class="profile-page page">
        <div class="container">
            <AppButton color="primary" @click="logout">Выйти</AppButton>
        </div>
    </div>
</template>

<script lang="ts" setup>
import AppButton from '@/shared/ui/AppButton.vue';
import { useUserModel } from '@/entities/User/model';
import { useToast } from 'primevue/usetoast';

const user_model = useUserModel()
const toast = useToast()

async function logout() {
    await user_model.logout()
    toast.add({severity: 'info', summary: 'Вы вышли из аккаунта', life: 3000})
}
</script>

<style lang="scss" scoped>

</style>