<template>
    <Toast />
    <AppHeader></AppHeader>
    <router-view></router-view>
</template>

<script setup lang="ts">
import AppHeader from "@/widgets/AppHeader.vue";
import type Echo from "laravel-echo";
import type Pusher from "pusher-js";
import { useRouter, type Router } from "vue-router";

const router = useRouter();
window.router = router;

declare global {
    interface Window {
        router: Router;
        Echo: Echo;
        Pusher: typeof Pusher;
    }
}

</script>
