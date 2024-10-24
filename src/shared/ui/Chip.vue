<template>
    <div class="chip">
        <slot></slot>
    </div>
</template>

<script setup>

</script>

<style scoped>
.chip {
    padding: 0.5rem 1rem;
    border: 1px solid grey;
    color: var(--color-text-grey);
    border-radius: 15px;
}
</style>