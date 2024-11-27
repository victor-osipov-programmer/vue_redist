import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";
import { useUserModel } from "@/entities/User/model";

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes
})

router.beforeEach((to, from) => {
    const user_model = useUserModel()

    if (
        !user_model.is_login &&
        !["login", "register", "play", "about"].includes(String(to.name))
    ) {
        return { name: "login" };
    }
})