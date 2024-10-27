import '@/shared/styles/main.css'
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import AppInput from '@/shared/ui/AppInput.vue';
import AppButton from '@/shared/ui/AppButton.vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import ToastService from 'primevue/toastservice';
import { createI18n } from 'vue-i18n'

const app = createApp(App)
app.component('AppInput', AppInput)
app.component('AppButton', AppButton)
app.use(createI18n({}))
app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.use(ToastService);
app.mount('#app')