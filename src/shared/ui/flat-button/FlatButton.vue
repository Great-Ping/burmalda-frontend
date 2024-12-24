<template>
    <button class="flat-button" v-bind="$attrs">
        <slot></slot>
    </button>
</template>

<style>
@import url("./styles.css");

.flat-button{
    color: #000
}
</style>