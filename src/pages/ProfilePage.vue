<template>
    <div class="profile-page page">
        <div class="container profile__container">
            <v-card class="profile__content" elevation="0">
                <div class="profile__header">
                    <h1 class="profile__title">Профиль</h1>

                    <table class="profile__table">
                        <tbody>
                            <tr>
                                <td>Имя</td>
                                <td class="profile__value">
                                    <input
                                        ref="input_ref"
                                        class="input"
                                        :class="{ 'input-edit': is_edit }"
                                        :disabled="!is_edit"
                                        type="text"
                                        v-model="user_model.user.name"
                                        @input="is_change_name = true"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td class="profile__value">
                                    <input
                                        ref="input_ref"
                                        class="input"
                                        :class="{ 'input-edit': is_edit }"
                                        :disabled="!is_edit"
                                        type="text"
                                        v-model="user_model.user.email"
                                        @input="is_change_email = true"
                                    />

                                    <button v-if="!user_model.user?.email_verified_at && !user_model.isFetching && !is_edit" class="confirm-button" @click="sendCofirmMail">подтвердить</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Телефон</td>
                                <td class="profile__value">
                                    <router-link
                                        class="link"
                                        v-if="is_edit"
                                        :to="{ name: 'about' }"
                                        >{{ user_model.user.phone }}</router-link
                                    >
                                    <p v-else>{{ user_model.user.phone }}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>Дата регистрации</td>
                                <td class="profile__value">
                                    {{ user_model.user.created_at }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="profile__footer">
                    <button v-if="!is_edit" @click="edit" class="profile__edit">
                        Редактировать
                    </button>
                    <button v-else @click="save" class="profile__edit">Сохранить</button>

                    <AppButton
                        class="logout-btn"
                        color="primary"
                        @click="logout"
                        >Выйти</AppButton
                    >
                </div>
            </v-card>

            <Dialog
                v-model:visible="confirm_email_dialog"
                modal
                header="Введите код"
                :style="{ width: '25rem' }"
            >
                <p>Отправили на вашу старую почту</p>
                <v-otp-input v-model="code"></v-otp-input>
                <AppButton @click="confirmEmail">Отправить</AppButton>
            </Dialog>
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
const is_edit = ref(false);
const input_ref = useTemplateRef("input_ref");
const confirm_email_dialog = ref(false);
const code = ref(null);
const is_change_name = ref(false)
const is_change_email = ref(false)

function edit() {
    is_edit.value = true;
    setTimeout(() => {
        input_ref.value.focus();
    }, 0);
}
async function save() {
    is_edit.value = false;

    if (is_change_name.value) {
        is_change_name.value = false

        http.patch("/api/user/name", {
            name: user_model.user.name,
        }).then(() => {
            toast.add({
                severity: "success",
                summary: "Вы изменили имя",
                life: 3000,
            });
        });
    }
    if (is_change_email.value) {
        is_change_email.value = false

        http.get("/api/user/code");
        code.value = null;
        confirm_email_dialog.value = true;
    }
}

async function logout() {
    user_model.logout();
    toast.add({
        severity: "info",
        summary: "Вы вышли из аккаунта",
        life: 3000,
    });
}

function confirmEmail() {
    if (!code.value) {
        return toast.add({
            severity: "error",
            summary: "Введите код",
            life: 3000,
        });
    }
    http.patch("/api/user/email", {
        email: user_model.user.email,
        code: code.value,
    }).then(() => {
        user_model.getUser();
        confirm_email_dialog.value = false;
        toast.add({
            severity: "info",
            summary: "Подтвердите новую почту",
            life: 5000,
        });
    })
    .catch((err) => {
        toast.add({
            severity: "error",
            summary: "Ошибка",
            detail: err.response?.data?.message,
            life: 5000,
        });
    })
}

function sendCofirmMail() {
    http.post('/api/email/verification-notification').then(() => {
        toast.add({
            severity: "info",
            summary: "Ссылка для подтверждения почты оправлена",
            life: 5000,
        });
    })
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
    min-width: 500px;
}
.profile__table {
    width: 100%;
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
    width: 100%;
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
.v-otp-input {
    margin-block: 1rem;
}
.confirm-button {
    text-decoration: underline;
    color: grey;
}
</style>
