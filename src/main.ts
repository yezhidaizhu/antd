import Vue, { createApp } from 'vue'
import App from './App.vue'

import installAntd from './core/antd_use'
import router from '@/router/index'
import PageHeaderWrapper from '@/components/PageHeaderWrapper.vue'

const app = createApp(App).use(router);

installAntd(app);
app.component('page-header-wrapper', PageHeaderWrapper);

app.mount('#app');

