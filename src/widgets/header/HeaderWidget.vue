<script lang="ts" setup>
import type BurmaldaApiClient from '@/entities/api/api-client';
import WidthWrapper from '@/shared/ui/width-wrapper/WidthWrapper.vue';
import { onMounted, ref, inject } from 'vue';

const apiClient = inject<BurmaldaApiClient>("BurmaldaApi")
let nickname = ref<string>("unknown")

onMounted(() => {
  apiClient?.getMeAsync()
    .then(me => {
      nickname.value = me?.nickname ?? nickname
    });
})

</script>

<template>
  <header>
    <WidthWrapper class="header-content">
      <span class="logo">
        Burmalda
      </span>
      <span class="username">
        user: {{nickname}}
      </span>
    </WidthWrapper>
  </header>
</template>

<style scoped>
  header{
    padding: 15px;
    background-color: var(--bg-color-secondary);
  }
  
  .header-content{
    display: flex;
    justify-content: space-between;
  }
  
  .logo{
    font-weight: 800;
    font-size: 1.2em;
  }

  .username{
    opacity: 0.7;
  }

</style>