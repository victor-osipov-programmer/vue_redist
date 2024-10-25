<template>
    <dialog class="dialog" ref="dialog">
        <div class="container dialog__container" @click.stop>
            <img @click="dialog.close()" class="close" src="@/shared/img/close.png" alt="">

            <slot></slot>
        </div>
    </dialog>
</template>

<script lang="ts" setup>
import { onMounted, useTemplateRef } from 'vue';

const dialog = useTemplateRef('dialog')

onMounted(() => {
    dialog.value.addEventListener('click', (e) => {
        dialog.value.close()
    })
})

function open() {
    dialog.value.showModal()
}
function close() {
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
}
.dialog__container {
    padding-block: 2rem;
}
</style>