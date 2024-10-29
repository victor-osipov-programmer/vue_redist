import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { fetchCoins as fetchUser } from "./api";
import { http } from "@/shared/api";

export const useUserModel = defineStore("user", () => {
    const user = ref(null);
    async function getUser() {
        const response = await fetchUser();
        is_login.value = true;
        user.value = response.data;
    }
    const is_login = ref(Boolean(localStorage.getItem("is_login")));
    watch(is_login, () => {
        localStorage.setItem("is_login", String(is_login.value));
    });

    async function logout() {
        is_login.value = false;
        user.value = null;
        window.router.push({ name: "login" });
        await http.get("/logout");
    }

    return {
        user,
        getUser,
        logout,
        is_login,
    };
});
