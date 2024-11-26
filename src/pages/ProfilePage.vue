<template>
    <div class="profile-page page">
        <div class="container profile__container">
            <v-card class="profile__content" elevation="0">
                <div class="profile__header">
                    <h1 class="profile__title">Профиль</h1>

                    <table>
                        <tbody>
                            <tr>
                                <td>Имя</td>
                                <td class="profile__value">
                                    <input type="text" v-model="name" @keyup="change($event, changeName)">
                                </td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td class="profile__value">
                                    <input type="text" v-model="email" @keyup="change($event, changeEmail)">
                                </td>
                            </tr>
                            <tr>
                                <td>Телефон</td>
                                <td class="profile__value">
                                    <input type="text" v-model="phone" @keyup="change($event, changePhone)">
                                </td>
                            </tr>
                            <tr>
                                <td>Дата регистрации</td>
                                <td class="profile__value">
                                    {{
                                        user_model.user?.created_at ?
                                        new Date(
                                            user_model.user?.created_at
                                        ).toLocaleDateString() : 'Загрузка...'
                                    }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="end">
                    <AppButton
                        class="logout-btn"
                        color="primary"
                        @click="logout"
                        >Выйти</AppButton
                    >
                </div>
            </v-card>
        </div>
    </div>
</template>

<script lang="ts" setup>
import AppButton from "@/shared/ui/AppButton.vue";
import { useUserModel } from "@/entities/User/model";
import { useToast } from "primevue/usetoast";
import { ref, watchEffect } from "vue";

const user_model = useUserModel();
const toast = useToast();
const name = ref('Загрузка...')
const email = ref('Загрузка...')
const phone = ref('Загрузка...')

watchEffect(() => {
    if (user_model.user?.name && user_model.user?.email && user_model.user?.phone) {
        name.value = user_model.user?.name;
        email.value = user_model.user?.email;
        phone.value = user_model.user?.phone;
    }
})


function change(e, callback) {
    if (e.key == 'Enter')  {
        callback(e)
        e.target.blur()
    }
}
function changeName(e) {
    console.log('name')
}
function changeEmail(e) {
    console.log('email')
}
function changePhone(e) {
    console.log('phone')
}


async function logout() {
    user_model.logout();
    toast.add({
        severity: "info",
        summary: "Вы вышли из аккаунта",
        life: 3000,
    });
}
</script>

<style scoped>
.logout-btn {
    width: max-content;
}
.profile__container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
}
.profile-page {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.profile__content {
    margin-bottom: 1rem;
    padding: 1rem;
    box-shadow: 0px 10px 40px 0 rgba(34, 60, 80, 0.05);
    display: flex;
    flex-direction: column;
}
.profile__header {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    gap: 2rem;
}
.profile__text {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}
.donat {
    cursor: pointer;
}
.profile__title {
    text-align: center;
    font-size: 1.5rem;
}
.profile__value {
    /* cursor: pointer; */
}
.input {
    padding: 0.5rem;
    border: none;
    outline: 1px solid black;
    border-radius: 5px;
}
.v-tooltip {
    cursor: pointer;
}
</style>
