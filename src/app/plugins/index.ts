import "vuetify/styles";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import ToastService from "primevue/toastservice";
import { createVuetify } from "vuetify";
import Tooltip from "primevue/tooltip";

const vuetify = createVuetify();

export function registerPlugins(app) {
    app.use(PrimeVue, {
        theme: {
            preset: Aura,
        },
    });
    // app.directive("tooltip", Tooltip);
    app.use(ToastService);
    app.use(vuetify);
}
