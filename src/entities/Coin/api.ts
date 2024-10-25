import { http } from "@/shared/api";

export function fetchCoins() {
    return http.get('/api/coin');
}