import { createApp } from "vue"

import App from "./App.vue"
import router from "./router"

import '@fortawesome/fontawesome-free/css/all.css' 
import '@fortawesome/fontawesome-free/js/all.js'



import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import "sweetalert2"
import "axios"


createApp(App).use(router).mount("#app")