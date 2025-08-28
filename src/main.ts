import './assets/styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { RegisterComponent } from './main.component'

const app = createApp(App)

app.use(createPinia())
app.use(router)

RegisterComponent(app)

// app.component('Form', Form)
// app.component('Field', Field)
// app.component('ErrorMessage', ErrorMessage)

app.mount('#app')
