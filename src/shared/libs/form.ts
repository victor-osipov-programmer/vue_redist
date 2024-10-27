import { computed, toValue } from "vue";

export function useForm(form) {
    form = toValue(form);

    const data = computed(() => {
        const data = {}

        for (let key in form) {
            data[key] = form[key].text
        }

        return data;
    })
    const isError = computed(() => {
        for (let key in form) {
            if (form[key].error) {
                return true
            }
        }

        return false;
    })
    const enableValidation = () => {
        for (let key in form) {
            form[key].validation = true;
        }
    }
    const disableValidation = () => {
        for (let key in form) {
            form[key].validation = false;
        }
    }

    return {
        isError,
        data,
        enableValidation,
        disableValidation
    }
}