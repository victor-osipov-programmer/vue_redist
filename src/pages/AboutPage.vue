<template>
    <div class="about-page page">
        <div class="container">
            <p class="about__header">Добро пожаловать!</p>

            <ul class="about__list">
                <p class="about__title">
                    Мы работаем просто, <br />
                    отдаём деньги:
                </p>
                <li><v-chip variant="flat" color="green"> Либо хитрому </v-chip></li>
                <li><v-chip variant="flat" color="green"> Либо умному </v-chip></li>
                <li><v-chip variant="flat" color="green"> Либо терпеливому </v-chip></li>

                <li class="tg"><v-chip href="https://web.telegram.org/" target="_blank" variant="flat" color="green"> Telegram чтобы стать терпеливым </v-chip></li>
            </ul>

            <footer class="footer">
                <nav class="footer__nav footer-nav">
                    <p class="footer-nav__title">Разное</p>

                    <a href="#" class="footer-nav__item">Помощь</a>
                    <a href="#" class="footer-nav__item">Политика конфиденциальности</a>
                    <a href="#" class="footer-nav__item">Условия использования</a>
                </nav>

                <nav class="footer__nav footer-nav">
                    <p class="footer-nav__title">Контакты</p>

                    <a href="https://web.telegram.org/" target="_blank" class="footer-nav__item">Telegram: @redist_tg</a>
                    <a href="mailto:victorosipovprogrammer@gmail.com" class="footer-nav__item">victorosipovprogrammer@gmail.com</a>
                </nav>

                
            </footer>
        </div>
    </div>
</template>

<script setup></script>

<style scoped>
.about__header {
    font-size: 2rem;
    margin-bottom: 2rem;
    text-align: center;
}

.about__title {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
}
.about__list {
    text-align: center;
    margin-bottom: 3rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    text-transform: uppercase;
}

.footer {
    background-color: var(--color-bg-primary);
    color: var(--color-text-primary);
    border-radius: 5px;
    display: flex;
    justify-content: center;
    padding: 1rem;
    gap: 3rem;
}
.footer-nav__title {
    margin-bottom: 0.25rem;
}
.footer-nav {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}
</style>
