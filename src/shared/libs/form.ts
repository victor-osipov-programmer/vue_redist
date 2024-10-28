import { computed, toValue, watchEffect } from "vue";

export function useForm(form, internal_validation = false) {
    form = toValue(form);

    const data = computed(() => {
        const data = {};

        for (let key in form) {
            data[key] = form[key].text;
        }

        return data;
    });
    const isError = computed(() => {
        for (let key in form) {
            if (form[key].error) {
                return true;
            }
        }

        return false;
    });
    const enableValidation = () => {
        for (let key in form) {
            form[key].validation = true;
        }
    };
    const disableValidation = () => {
        for (let key in form) {
            form[key].validation = false;
        }
    };

    if (internal_validation) {
        watchEffect(function () {
            for (let key in form) {
                if (!form[key].validation) {
                    form[key].error = null;
                    continue;
                }
                if (form[key].required !== undefined) {
                    if (!form[key].text) {
                        form[key].error = "Это обязательное поле";
                        continue;
                    }
                }
                if (form[key].email !== undefined) {
                    if (!/\w+@\w+\.\w+/i.test(form[key].value.text)) {
                        form[key].error = "Не валидный email";
                        continue;
                    }
                }
                if (form[key].min !== undefined) {
                    if (form[key].text.length < form[key].min) {
                        form[key].error = `Мин. длина ${form[key].min}`;
                        continue;
                    }
                }

                form[key].error = null;
            }
        });
    }

    return {
        isError,
        data,
        enableValidation,
        disableValidation,
    };
}
