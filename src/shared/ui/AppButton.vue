<template>
    <button class="app-button">
        <slot></slot>
    </button>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import type { IStyles } from "../types/styles";
import { Styles } from "../libs/styles";

interface IProps {
    color?: string | 'primary';
}
const props = defineProps<IProps>();

function useStyles(props: IProps): IStyles {
    const styles = new Styles();

    switch (props.color) {
        default:
            styles.add("app_button", {
                "background-color": "rgb(240, 240, 240)",
                color: "grey",
            });
            break;
        case "primary":
            styles.add("app_button", {
                "background-color": "var(--color-bg-primary)",
                color: "var(--color-text-primary)",
            });
            break;
    }

    return styles.get();
}

const styles: IStyles = useStyles(props);
</script>

<style scoped>
.app-button {
    width: 100%;
    min-height: 40px;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    text-transform: uppercase;
    font-weight: bold;
    color: v-bind("styles.app_button['color']");
    background-color: v-bind("styles.app_button['background-color']");
    transition: opacity 0.05s;
}
.app-button:active {
    opacity: 0.8;
}
</style>
