<template>
    <div class="request">
        <div class="request__header">
            <v-chip :color="status_color" class="request__status">
                {{ status_translation }}
            </v-chip>
            <v-chip :color="status_color" class="request__status">
                {{ request.updated_at }}
            </v-chip>
        </div>

        <div class="request__footer">
            <div>
                <div class="request__currency">
                    {{ request.number_currency }} руб.
                </div>
                <div class="request__method">
                    На {{ withdrawal_method_translation }}
                </div>
            </div>

            <p v-if="request.status == 'waiting'" class="cancel">Отменить</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import type { IRequest } from "./types";

const props = defineProps<{
    request: IRequest;
}>();

const status_color = computed(() =>
    props.request.status == "waiting"
        ? "secondary"
        : props.request.status == "canceled"
        ? "error"
        : "success"
);

const withdrawal_method_translation = computed(() =>
    props.request.withdrawal_method
        .replace("sberbank", "Сбербанк")
        .replace("telephone", "Телефон")
        .replace("telegram-wallet", "Телеграм кошелёк")
        .replace("t-bank", "Тинькофф")
);

const status_translation = computed(() =>
    props.request.status
        .replace("waiting", "На рассмотрении")
        .replace("success", "Выведено")
        .replace("canceled", "Отклонено")
);
</script>

<style scoped>
.request {
    box-shadow: 0px 10px 40px 0 rgba(34, 60, 80, 0.05);
    padding: 1rem;
    border-radius: 5px;
}
.request__header {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
}
.request__currency {
    font-size: 1.5rem;
    margin-bottom: 0.25rem;
}
.request__footer {
    display: flex;
    justify-content: space-between;
    align-items: end;
}
.cancel {
    color: rgba(255, 0, 0, 0.8);
    cursor: pointer;
}
</style>
