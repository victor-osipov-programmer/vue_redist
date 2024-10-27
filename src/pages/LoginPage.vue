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
import { useToast } from 'primevue/usetoast';
import { useUserModel } from '@/entities/User/model';

const router = useRouter()
const toast = useToast()
const user_model = useUserModel()

const form = ref({
    email: {text: 'test@gmail.com'},
    password: {text: 'testtest'},
})
const { isError, data } = useForm(form)

async function clickLogin() {
    if (isError.value) return;

    toast.add({severity: 'info', summary: 'Попытка входа...', life: 3000})
    

    await Promise.allSettled([
        http.get('/sanctum/csrf-cookie'),
        http.get('/logout')
    ])
    
    .catch(() => {})
    http.post('/login', data.value)
    .then(() => {
        user_model.getUser()
        toast.add({severity: 'success', summary: 'Вы вошли', life: 3000})
        router.push({name: 'play'})
    })
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