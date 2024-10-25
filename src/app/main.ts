import '@/shared/styles/main.css'
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import AppInput from '@/shared/ui/AppInput.vue';
import AppButton from '@/shared/ui/AppButton.vue';
import { createPinia } from 'pinia';

const app = createApp(App)
app.component('AppInput', AppInput)
app.component('AppButton', AppButton)
app.use(createPinia())
app.use(router)
app.mount('#app')