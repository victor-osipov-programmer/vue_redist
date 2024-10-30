import axios from 'axios'

export const http = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 5000,
    withCredentials: true,
    withXSRFToken: true,
});

http.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    error.response.data.message = error.response.data.message
        .replace("Your balance is", "Ваш баланс")
        .replace("but you need", "а вам нужно")
        .replace(
            "number_coins must be less than",
            "Кол-во монет должно быть не больше"
        )
        .replace("max_buy_coins_cycle", "макс. покупка монет за цикл")
        .replace("max_buy_coins_game", "макс. покупка монет за игру")
        .replace(
            "max_buy_additional_coins_cycle",
            "макс. покупка доп. монет за цикл"
        )
        .replace(
            "max_buy_additional_coins_game",
            "макс. покупка доп. монет за игру"
        )
        .replace(/ \(and \d+ more error\)/, "")
        .replace(
            "The number coins field must be at least",
            "Минимальное кол-во монет"
        )
        .replace(
            "number_coins must not be less than",
            "Кол-во монет должно быть не меньше"
        )
        .replace("min_number_coins_sale", "мин. кол-во монет для продажи")
        .replace(
            "Bank income should be more than expenses",
            "Доход банка должен быть больше расходов"
        )
        .replace("Your coins balance is", "Ваш баланс монет")
        .replace("Unauthenticated.", "Вы не авторизованы");
    return Promise.reject(error);
});