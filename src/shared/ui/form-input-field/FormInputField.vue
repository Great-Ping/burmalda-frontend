<script setup>
const model = defineModel()
</script>

<template>
<input v-model="model" class="form-input" v-bind="$attrs">
  <slot></slot>
</input>
</template>

<style>
.form-input{
  background-color: var(--input-bg-color);
  border: solid var(--input-outline) 1.2px;
  border-radius: 10px;
  padding: 10px;
}
</style>