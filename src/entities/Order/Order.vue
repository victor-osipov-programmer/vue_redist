<template>
    <div class="order">
        <div class="order_content">
            <v-chip
                class="ma-2"
                label
            >
                {{ order.price_coin }}

                <v-tooltip
                    activator="parent"
                    location="top"
                >Курс</v-tooltip>
            </v-chip>
            <v-chip
                class="ma-2"
                label
                :color="order.type == 'buy' ? 'green' : 'red'"
            >
                {{ order.initial_number_coins - order.number_coins }} /
                {{ order.initial_number_coins }}

                <v-tooltip
                    activator="parent"
                    location="top"
                >{{order.type == 'buy' ? 'Куплено' : 'Продано'}}</v-tooltip>
            </v-chip>

            <!-- <div class="price-coin">
                {{ order.price_coin }}
            </div> -->

            
        </div>

        <AppButton @click="emit('cancel_order')" class="order__cancel-btn">Отменить</AppButton>
    </div>
</template>

<script lang="ts" setup>
import AppButton from "@/shared/ui/AppButton.vue";

defineProps<{
    order: IOrder;
}>();

const emit = defineEmits(['cancel_order'])
</script>

<style scoped>
.order {
    background-color: rgb(230, 230, 230);
    border-radius: 5px;
    /* background-color: red; */
    overflow: hidden;
    /* min-height: 40px; */
    display: flex;
    justify-content: space-between;
}
.order__cancel-btn {
    width: max-content;
}
.order_content {
    display: flex;
    padding: 0.5rem;
    gap: 0.5rem;
    align-items: center;
}
.v-chip {
    margin: 0 !important;
}
</style>
