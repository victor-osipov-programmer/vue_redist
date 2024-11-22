import { http } from "@/shared/api";

export function fetchCoins(url: string) {
    return http.get(url);
}