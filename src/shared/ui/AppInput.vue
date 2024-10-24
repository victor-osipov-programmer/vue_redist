<template>
    <div class="app-input">
        <input v-bind="$attrs" class="input" v-model="model.text">
        <p v-if="model.error" class="error">{{ model.error }}</p>
    </div>
</template>

<script setup>
import { watchEffect } from 'vue';

const model = defineModel()
const props = defineProps(['email', 'min'])
defineOptions({
    inheritAttrs: false
})

watchEffect(() => {
    if (props.email !== undefined) {
        if (!/\w+@\w+\.\w+/i.test(model.value.text)) {
            return model.value.error = 'Is invalid email'
        }
    }
    if (props.min !== undefined) {
        if (model.value.text.length < props.min) {
            return model.value.error = `Min length ${props.min}`
        }
    }
    
        model.value.error = null
   

})
</script>

<style scoped>
.input {
    min-height: 40px;
    border: none;
    outline: none;
    padding: 0.5rem 1rem;
    background-color: rgb(230, 230, 230);
    border-radius: 5px;
}
.error {
    font-size: 0.8rem;
    color: red;
}
</style>