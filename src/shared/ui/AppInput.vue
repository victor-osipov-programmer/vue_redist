<template>
    <div class="app-input">
        <input :disabled :name :placeholder :type class="input" v-model="model.text" max="100">
        <p v-if="model.error" class="error">{{ model.error }}</p>
    </div>
</template>

<script setup>
import { nextTick, watch, watchEffect } from 'vue';

const model = defineModel()
const props = defineProps(['email', 'min', 'placeholder', 'disabled', 'type', 'max', 'required', 'validation', 'password_value', 'confirmation', 'name'])

watchEffect(() => {
    if (!model.value.validation) {
        return model.value.error = null
    }
    if (props.required !== undefined) {
        if (!model.value.text) {
            return model.value.error = 'Это обязательное поле'
        }
    }
    if (props.email !== undefined) {
        if (!/\w+@\w+\.\w+/i.test(model.value.text)) {
            return model.value.error = 'Не валидный email'
        }
    }
    if (props.min !== undefined) {
        if (model.value.text.length < props.min) {
            return model.value.error = `Мин. длина ${props.min}`
        }
    }
    if (props.confirmation !== undefined) {
        if (model.value.text !== props.password_value) {
            return model.value.error = `Пароли не совподают`
        }
    }
    
    model.value.error = null
})
</script>

<style scoped>
.app-input {
    width: 100%;
}
.input {
    width: 100%;
    min-height: 40px;
    border: none;
    outline: none;
    padding: 0.5rem 1rem;
    background-color: rgb(230, 230, 230);
    border-radius: 5px;
    color: v-bind("props.disabled ? 'grey' : 'black'");
}
.error {
    font-size: 0.8rem;
    color: red;
}
</style>