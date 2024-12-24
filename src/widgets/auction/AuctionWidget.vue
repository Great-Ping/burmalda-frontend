<script lang="ts" setup>
const props = defineProps<{auction: any}>()
const link = `/auctions/${props.auction.id}`
</script>

<template>
  <RouterLink :to="link" class="auction">
    <p>id:{{auction.id}} {{auction.title}}</p>
    <p>{{auction.startDate}}</p>
    <p v-if="auction.isCompleted">Завершён</p>
    <p v-else>Продолжается</p> 
  </RouterLink>
</template>

<style>
.auction{
  padding: 15px;
  border: solid var(--input-outline) 1.2px;
  border-radius: 10px;
}

.auction:hover{
  background-color: var(--bg-color-secondary);
}

</style>