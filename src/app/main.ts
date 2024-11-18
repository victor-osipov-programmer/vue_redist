import '@/shared/styles/main.css'
import './echo'
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import AppInput from '@/shared/ui/AppInput.vue';
import AppButton from '@/shared/ui/AppButton.vue';
import { createPinia } from 'pinia';

import { createI18n } from 'vue-i18n'

import { registerPlugins } from './plugins';

const app = createApp(App)
app.component('AppInput', AppInput)
app.component('AppButton', AppButton)
app.use(createI18n({}))
app.use(createPinia())
app.use(router)
registerPlugins(app)

app.mount('#app')