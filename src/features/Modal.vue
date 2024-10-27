<template>
    <dialog class="dialog" ref="dialog">
        <div class="container dialog__container" @click.stop>
            <img @click="close" class="close" src="@/shared/img/close.png" alt="">

            <slot></slot>
        </div>
    </dialog>
</template>

<script lang="ts" setup>
import { onMounted, useTemplateRef } from 'vue';

const dialog = useTemplateRef('dialog')
const emit = defineEmits(['close'])

onMounted(() => {
    dialog.value.addEventListener('click', (e) => {
        close()
    })
})

function open() {
    dialog.value.showModal()
}
function close() {
    emit('close')
    dialog.value.close()
}

defineExpose({
    open,
    close
})
</script>

<style scoped>
.dialog {
    margin: auto;
    border: none;
    border-radius: 5px;
}
.close {
    width: 20px;
    cursor: pointer;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    opacity: 0.8;
}
.dialog__container {
    padding-block: 2.5rem;
}
</style>