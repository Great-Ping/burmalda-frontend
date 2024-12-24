<script lang="ts" setup>
import FormInputField from '@/shared/ui/form-input-field/FormInputField.vue';
import FlatButton from '@/shared/ui/flat-button/FlatButton.vue';
import { inject, ref } from 'vue';
import type BurmaldaApiClient from '@/entities/api/api-client';
import { useRouter } from 'vue-router';

let nickname = ref<string>("");
let email = ref<string>("")
let password = ref<string>("")
let api = inject<BurmaldaApiClient>("BurmaldaApi")
let router = useRouter()

function onSubmit(){
  api?.signupAsync(
    nickname.value,
    email.value,
    password.value
  )?.then((result) => {
    if (result) 
      router.push({path: "/home"})
  })
}

</script>

<template>
  <form @submit.prevent="onSubmit" class="reg-form">
    <label for="email">Email</label>
    <FormInputField v-model="email" aria-placeholder="password" id="email"/>
    <label for="nickname">Nickname</label>
    <FormInputField v-model="nickname" aria-placeholder="nickname" id="nickname"/>
    <label for="password">Password</label>
    <FormInputField v-model="password" aria-placeholder="password" id="password" type="password"/>
    <FlatButton type="submit">Зарегистрироваться</FlatButton>
    <RouterLink class="link" to="/login">Уже есть аккаунт?</RouterLink>
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