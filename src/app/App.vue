<template>
    <Toast />
    <AppHeader></AppHeader>
    <router-view></router-view>
</template>

<script setup lang="ts">
import AppHeader from "@/widgets/AppHeader.vue";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { useRouter, type Router } from "vue-router";

const router = useRouter();
window.router = router;

declare global {
    interface Window {
        router: Router;
        Echo: Echo<any>;
        Pusher: typeof Pusher;
    }
}

</script>
