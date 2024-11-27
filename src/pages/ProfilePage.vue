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
                                    <input ref="input_ref" class="input" :class="{'input-edit': is_edit}" :disabled="!is_edit" type="text" v-model="name">
                                </td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td class="profile__value">
                                    <router-link class="link" v-if="is_edit" :to="{name: 'about'}">{{ email }}</router-link>
                                    <p v-else>{{ email }}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>Телефон</td>
                                <td class="profile__value">
                                    <router-link class="link" v-if="is_edit" :to="{name: 'about'}">{{ phone }}</router-link>
                                    <p v-else>{{ phone }}</p>
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

                <div class="profile__footer">
                    <p v-if="!is_edit" @click="edit" class="profile__edit">Редактировать</p>
                    <p v-else @click="saveName" class="profile__edit">Сохранить</p>

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
import { ref, useTemplateRef, watchEffect } from "vue";
import { http } from "@/shared/api";

const user_model = useUserModel();
const toast = useToast();
const name = ref('Загрузка...')
const email = ref('Загрузка...')
const phone = ref('Загрузка...')
const is_edit = ref(false)
const input_ref = useTemplateRef('input_ref')



function edit() {
    is_edit.value = true
    setTimeout(() => {
        input_ref.value.focus()
    }, 0)
}
function saveName() {
    is_edit.value = false

    if (user_model.user.name !== name.value) {
        http.post('/api/user/name', {
            name: name.value
        })
        .then(() => {
            user_model.getUser()
            toast.add({severity: 'success', summary: 'Вы изменили имя', life: 3000})
        })
    }
}

watchEffect(() => {
    if (user_model.user?.name && user_model.user?.email && user_model.user?.phone) {
        name.value = user_model.user?.name;
        email.value = user_model.user?.email;
        phone.value = user_model.user?.phone;
    }
})

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
.profile-page {
    display: flex;
    align-items: center;
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
.input {
    border: none;
    outline: none;
    width: max-content;
    border-bottom: 1px solid transparent;
}
.input-edit {
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
}
.v-tooltip {
    cursor: pointer;
}
.profile__footer {
    display: flex;
    justify-content: space-between;
    align-items: end;
}
.profile__edit {
    text-decoration: underline;
    cursor: pointer;
}
.link {
    text-decoration: underline;
    color: var(--color-bg-primary);
}
</style>
