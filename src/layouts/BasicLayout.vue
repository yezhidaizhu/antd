<template>
  <BaseLayout :menus="menus"
              :title="title">

    <template #header>
      <Header :reload="reload" />
    </template>

    <template #content>
      <router-view v-if="isRouterAlive"></router-view>
    </template>

    <template #footer>
      <!-- <Footer /> -->
    </template>
  </BaseLayout>
</template>
<script lang="ts">
import BaseLayout from "@/components/BaseLayout.vue";
import defaultSettings from "@/config/dev.config";
import { defineComponent, ref } from "vue";
import { asyncRouterMap } from "@/config/router.config";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";

export default defineComponent({
  data() {
    return {
      title: defaultSettings.title,
      menus: [],
      isRouterAlive: true, // 控制刷新
    };
  },
  components: {
    BaseLayout,
    Footer,
    Header,
  },
  created() {
    // 菜单
    const routes: any = asyncRouterMap.find((item) => item.path === "/");
    this.menus = (routes && routes?.children) || [];

    // 标签title
    const route = this.$route;
    document.title = route?.meta?.title || this.title;
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true));
    },
  },
});
</script>

