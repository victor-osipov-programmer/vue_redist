export interface ICoin {
    name: string;
    id: number;
    total_coins: number;
    buy_to_bank_coins: number;
    sale_to_bank_coins: number;
    current_cycle: number;
    one_cycle: number;
    total_cycles: number;
    price_sale_coin: number;
    price_buy_coin: number;
    max_buy_coins_cycle: number;
    max_buy_coins_game: number;
    price_buy_additional_coin: number;
    max_buy_additional_coins_cycle: number;
    max_buy_additional_coins_game: number;
    expenses: number;
    income: number;
    min_number_coins_sale: number;
    commission: number;
    creator_id: number;
    created_at: string;
    updated_at: string;
    user_coins: number;
}
