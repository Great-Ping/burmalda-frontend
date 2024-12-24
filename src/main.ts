import { createApp } from 'vue'
import App from '@/app/App.vue'
import router from '@/app/router'
import BurmaldaApiClient from '@/entities/api/api-client'

const app = createApp(App)
const api = new BurmaldaApiClient("http://localhost:5000")

app.use(router)
app.provide("BurmaldaApi", api)

let authStr = localStorage.getItem("auth")
if (authStr != null){
  let auth = JSON.parse(authStr)
  api.authorize(auth["access"], auth["refresh"])
}


app.mount('#app')
