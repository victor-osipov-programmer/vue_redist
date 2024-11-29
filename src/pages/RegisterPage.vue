<template>
    <div class="register-page page">
        <v-stepper
            elevation="0"
            v-model="step"
            :items="['Общее', 'Пароль']"
            alt-labels
        >
            <template #item.1>
                <div class="inputs">
                    <AppInput
                        placeholder="Имя"
                        v-model="form.name"
                        required
                    ></AppInput>
                    <AppInput
                        placeholder="Email"
                        v-model="form.email"
                        email
                        required
                        name="email"
                    ></AppInput>
                </div>
            </template>

            <template #item.2>
                <div class="inputs">
                    <AppInput
                        placeholder="Пароль"
                        v-model="form.password"
                        min="8"
                        required
                        name="password"
                    ></AppInput>
                    <AppInput
                        placeholder="Повтор пароля"
                        :password_value="form.password.text"
                        v-model="form.password_confirmation"
                        min="8"
                        required
                        confirmation
                    ></AppInput>
                </div>
            </template>

            <template v-slot:prev>
                <v-btn @click="prevStep">Назад</v-btn>
            </template>
            <template v-slot:next>
                <v-btn v-if="step == 1" @click="nextStep">Дальше</v-btn>
                <v-btn :disabled="false" v-if="step == 2" @click="register"
                    >Зарегаться</v-btn
                >
            </template>
        </v-stepper>
        <!-- {{ form }} -->
    </div>
</template>

<script lang="ts" setup>
import { useUserModel } from "@/entities/User/model";
import { http } from "@/shared/api";
import { useForm } from "@/shared/libs/form";
import { useToast } from "primevue/usetoast";
import { ref } from "vue";
import { useRouter } from "vue-router";

const user_model = useUserModel()
const toast = useToast();
const router = useRouter();
const form = ref({
    name: { text: "" },
    email: { text: "" },
    password: { text: "" },
    password_confirmation: { text: "" },
});
const step = ref(1);

const { isError, data, enableValidation, disableValidation } = useForm(form);

async function prevStep() {
    step.value--;
    disableValidation();
}

async function nextStep() {
    await enableValidation(["name", "email"]);
    if (isError.value) {
        return toast.add({
            severity: "error",
            summary: "Ошибка",
            detail: "Заполните правильно поля",
            life: 3000,
        });
    }

    step.value++;
}

async function register() {
    await enableValidation(["password", "password_confirmation"]);
    if (isError.value) {
        return toast.add({
            severity: "error",
            summary: "Ошибка",
            detail: "Заполните правильно поля",
            life: 3000,
        });
    }
    await http.get('/sanctum/csrf-cookie')
    
    http.post("/register", data.value)
        .then(() => {
            toast.add({
                severity: "success",
                summary: "Аккаунт создан!",
                detail: "Осталось только подтвердить почту",
                life: 5000,
            });
            http.post("/login", data.value).then(async () => {
                await user_model.login()
                router.push({ name: "profile" });

            })
        })
        .catch((err) => {
            toast.add({
                severity: "error",
                summary: "Ошибка регистрации",
                detail: err.response.data?.message,
                life: 3000,
            });
        });
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
/* .app-input :deep(.error) {
    color: white;
} */
.email-input {
    margin-block: 1rem;
}
.v-stepper {
    min-width: 300px;
}
.inputs {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-block: 1rem;
}
</style>
