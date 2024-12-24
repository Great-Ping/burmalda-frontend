<script lang="ts" setup>
  import type BurmaldaApiClient from '@/entities/api/api-client';
  import { FlatButton } from '@/shared/ui';
  import WidthWrapper from '@/shared/ui/width-wrapper/WidthWrapper.vue';
  import HeaderWidget from '@/widgets/header/HeaderWidget.vue';
  import AuctionWidget from '@/widgets/auction/AuctionWidget.vue';
  import { inject, onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';

  const apiClient = inject<BurmaldaApiClient>("BurmaldaApi")
  let auctions = ref<Array<any>>([])
  let router = useRouter()

  onMounted(async () => {
    auctions.value = await apiClient?.getMyAuctionsAsync() ?? []
  })

  function moveToCreteAuctionPage(){
    router.push({path: '/auction-create'})
  }
</script>

<template>
  <HeaderWidget/>
  <WidthWrapper>
    <div class="auctions-container">
      <FlatButton @click="moveToCreteAuctionPage">Создать новый</FlatButton>
      <AuctionWidget v-for="auction in auctions" :auction="auction"/>
    </div>
  </WidthWrapper>   
</template>

<style>
.auctions-container{
  flex-direction: column;
  align-items: stretch;
  padding: 15px;
  display: flex;
  gap: 15px
}
</style>