<template>
  <BaseLayout :menus="menus"
              :title="title">
  </BaseLayout>
</template>
<script lang="ts">
import BaseLayout from "@/components/BaseLayout.vue";
import defaultSettings from "@/config/dev.config";
import { defineComponent, ref } from "vue";
import { asyncRouterMap } from "@/config/router.config";

export default defineComponent({
  data() {
    return {
      title: defaultSettings.title,
      menus: [],
    };
  },
  created() {
    // 菜单
    const routes: any = asyncRouterMap.find((item) => item.path === "/");
    this.menus = (routes && routes?.children) || [];
  },
  components: {
    BaseLayout,
  },
});
</script>
