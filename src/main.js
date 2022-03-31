import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Textarea from 'primevue/textarea';
import Message from 'primevue/message';

import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';  
import 'primeflex/primeflex.css'

const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.component('p-button', Button)
app.component('p-card', Card)
app.component('p-textarea', Textarea)
app.component('p-message', Message)

app.mount('#app')
