import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { fetchCoins as fetchUser } from "./api";
import { http } from "@/shared/api";

export const useUserModel = defineStore('user', () => {
    const user = ref(null)
    async function getUser() {
        const response = await fetchUser()
        is_login.value = true;
        user.value = response.data
    }
    const is_login = ref(false)
    watch(is_login, () => {
        localStorage.setItem("is_login", String(is_login.value));
    });

    async function logout() {
        await http.get('/logout')
        window.router.push({name: 'login'})
        user.value = null
        is_login.value = false;
    }

    return {
        user,
        getUser,
        logout,
        is_login
    }
})