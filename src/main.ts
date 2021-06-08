import Vue, { createApp } from 'vue'
import App from './App.vue'

import installAntd from './core/antd_use'
import router from '@/router/index'

const app = createApp(App).use(router);

installAntd(app);

app.mount('#app');

