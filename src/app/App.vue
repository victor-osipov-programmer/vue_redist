<template>
    <Toast />
    <AppHeader></AppHeader>
    <router-view></router-view>
</template>

<script setup lang="ts">
import AppHeader from "@/widgets/AppHeader.vue";
import { useRouter, type Router } from "vue-router";

const router = useRouter();
window.router = router;

declare global {
    interface Window {
        router: Router;
    }
}
</script>
