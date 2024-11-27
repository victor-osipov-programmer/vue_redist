<template>
    <div class="register-page page">
        <div class="form">
            <h3 class="form__header">Регистрация</h3>
            <AppInput placeholder="Email" v-model="form.email" email required></AppInput>

            <AppInput placeholder="Пароль" v-model="form.password" min="3" required></AppInput>
            <AppInput placeholder="Повтор пароля" v-model="form.password_confirmation" min="3" required></AppInput>

            <AppButton class="register-button" @click="register">Зарегаться</AppButton>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useForm } from '@/shared/libs/form';
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';

const toast = useToast()
const form = ref({
    email: {text: ''},
    password: {text: ''},
    password_confirmation: {text: ''},
})

const { isError, data, enableValidation } = useForm(form)


async function register() {
    await enableValidation()
    if (isError.value) {
        return toast.add({
            severity: "error",
            summary: "Ошибка",
            detail: "Заполните правильно поля",
            life: 3000,
        });
    }
}
</script>

<style scoped>
.register-page {
    display: flex;
    justify-content: center;
    flex-grow: 1;
    align-items: center;
}

.register-button {
    margin-top: 0.5rem;
}
.app-input :deep(.error) {
    color: white;
}
</style>