<template>
    <div class="login-page page">
        <div class="form">
            <AppInput placeholder="Email" v-model="form.email" email></AppInput>
            <AppInput placeholder="Пароль" v-model="form.password" min="3"></AppInput>

            <AppButton class="login-button" @click="clickLogin">Войти</AppButton>
        </div>
    </div>
</template>

<script setup>
import { http } from '@/shared/api';
import { useForm } from '@/shared/libs/form';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const form = ref({
    email: {text: 'test@gmail.com'},
    password: {text: 'testtest'},
})
const { isError, data } = useForm(form)

async function clickLogin() {
    if (isError.value) return;

    await http.get('/sanctum/csrf-cookie')
    await http.post('/login', data.value)
    router.push({name: 'play'})
}
</script>

<style scoped>
.login-page {
    display: flex;
    justify-content: center;
    flex-grow: 1;
    align-items: center;
}
.login-button {
    margin-top: 0.5rem;
}
</style>