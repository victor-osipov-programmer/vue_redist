interface IOrder {
    id: number;
    coin_id: number;
    user_id: number;
    type: "buy" | "sell";
    number_coins: number;
    initial_number_coins: number;
    price_coin: number;
    status: null | 'completed';
    created_at: null | string;
    updated_at: null | string;
    deleted_at: null | string;
}