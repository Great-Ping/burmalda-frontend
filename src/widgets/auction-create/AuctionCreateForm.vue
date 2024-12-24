<script lang="ts" setup>
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import FlatButton from '@/shared/ui/flat-button/FlatButton.vue';
import type BurmaldaApiClient from '@/entities/api/api-client';
import FormInputField from '@/shared/ui/form-input-field/FormInputField.vue';

let title = ref<string>("");
let initialDuration = ref<string>("0.00:10:00")
let strategy = ref<number>(0)
let api = inject<BurmaldaApiClient>("BurmaldaApi")
let router = useRouter()

function onSubmit(){
  api?.createAuctionAsync(
    title.value,
    initialDuration.value,
    strategy.value
  )?.then((result) => { 
      router.push({path: `/auction/${result.id}`})
  })
}

</script>

<template>
  <form @submit.prevent="onSubmit" class="reg-form">
    <label for="title">Заголовок</label>
    <FormInputField v-model="title" id="title"/>
    <label for="initial-duration">Продолжительность</label>
    <FormInputField v-model="initialDuration" type="initial-duration"/>
    <label for="strategy">Стратегия</label>
    <FormInputField v-model="strategy" type="strategy"/>
    <FlatButton type="submit">Создать</FlatButton>
  </form>
</template>

<style scoped>
.reg-form{
  display: flex;
  padding: 20px;
  min-width: 350px;
  gap: 10px;
  flex-direction: column;
  background-color: var(--bg-color-secondary);
}

.link{
  text-align: center;
  font-size: 0.7;
  color: var(--text-color-primary)
}

</style>