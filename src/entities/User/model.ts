import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { fetchCoins as fetchUser } from "./api";
import { http } from "@/shared/api";

export const useUserModel = defineStore('user', () => {
    const user = ref(null)
    async function getUser() {
        const response = await fetchUser()
        user.value = response.data
    }
    const is_login = computed(() => {
        return user.value
    })
    async function logout() {
        await http.get('/logout')
        window.router.push({name: 'login'})
        user.value = null
    }

    return {
        user,
        getUser,
        logout,
        is_login
    }
})