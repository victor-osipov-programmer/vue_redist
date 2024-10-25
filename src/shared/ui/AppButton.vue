<template>
    <button class="app-button">
        <slot></slot>
    </button>
</template>

<script setup>

</script>

<style scoped>
.app-button {
    min-height: 40px;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    text-transform: uppercase;
    font-weight: bold;
    color: grey;
}
</style>