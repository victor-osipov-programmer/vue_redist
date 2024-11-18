import { http } from "@/shared/api";

export function fetchOrders() {
    return http.get("/api/order");
}

export function cancelOrder(id: number) {
    return http.get("/api/order/" + id + "/cancel");
}

