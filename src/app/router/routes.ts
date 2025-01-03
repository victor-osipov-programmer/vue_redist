import AboutPage from "@/pages/AboutPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import PlayPage from "@/pages/PlayPage.vue";
import ProfilePage from "@/pages/ProfilePage.vue";
import RegisterPage from "@/pages/RegisterPage.vue";
import ReplenishmentPage from "@/pages/ReplenishmentPage.vue";
import WithdrawalPage from "@/pages/WithdrawalPage.vue";
import type { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "home",
        redirect: { name: "play" },
    },
    {
        path: "/login",
        name: "login",
        component: LoginPage,
    },
    {
        path: "/register",
        name: "register",
        component: RegisterPage,
    },
    {
        path: "/replenishment",
        name: "replenishment",
        component: ReplenishmentPage,
    },
    {
        path: "/withdrawal",
        name: "withdrawal",
        component: WithdrawalPage,
    },
    {
        path: "/play",
        name: "play",
        component: PlayPage,
    },
    {
        path: "/about",
        name: "about",
        component: AboutPage,
    },
    {
        path: "/profile",
        name: "profile",
        component: ProfilePage,
    },
];