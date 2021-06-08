<template>
  <a-layout>
    <a-layout-sider :width="256"
                    collapsible
                    :collapsed="collapsed"
                    :trigger="null" />
    <a-layout-sider :width="256"
                    class="layout-sider"
                    collapsible
                    :collapsed="collapsed"
                    @collapse="collapse">
      <a-row type="flex"
             justify="center"
             align="center">
        <div class="title">{{ title }}</div>
      </a-row>
      <BaseMenu :collapsed="collapsed"/>
    </a-layout-sider>
    <a-layout :style="{ minHeight: '100vh' }">
      <a-layout-header :style="{ background: '#fff', padding: 0 }" />
      <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
        <div :style="{ padding: '24px', background: '#fff', textAlign: 'center' }">

          content
          ...
          <br />
          Really
          <br />
          content
          content
          ...
          <br />
          Really
          <br />
          content
          content
          ...
          <br />
          Really
          <br />
          content
          content
          ...
          <br />
          Really
          <br />
          content
          content
          ...
          <br />
          Really
          <br />
          content
          content
          ...
          <br />
          Really
          <br />
          content
          content
          ...
          <br />
          Really
          <br />
          content
          content
          ...
          <br />
          Really
          <br />
          ...
          <br />
          Really
          <br />
          content
          content
          ...
          <br />
          Really
          <br />
          ...
          <br />
          Really
          <br />
          content
          content
          ...
          <br />
          Really
          <br />
          ...
          <br />
          Really
          <br />
          content
          content
          ...
          <br />
          Really
          <br />
          content
          content
          ...
          <br />
          Really
          <br />
          content
        </div>
      </a-layout-content>
      <a-layout-footer :style="{ textAlign: 'center' }">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import ELayout from "@/components/ELayout.vue";
import BaseMenu from "@/components/BaseMenu.vue";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
} from "@ant-design/icons-vue";
import defaultSettings from "@/config/dev.config";
import { defineComponent, ref } from "vue";
import { asyncRouterMap } from "@/config/router.config";
import { AnyRecordWithTtl } from "dns";

export default defineComponent({
  data() {
    return {
      title: defaultSettings.title,
      collapsed: false,
      menus: [],
    };
  },
  created() {
    const routes: any = asyncRouterMap.find((item) => item.path === "/");
    this.menus = (routes && routes?.children) || [];
  },
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    BarChartOutlined,
    CloudOutlined,
    AppstoreOutlined,
    TeamOutlined,
    ShopOutlined,
    ELayout,
    BaseMenu,
  },
  computed: {},
  methods: {
    collapse(collapsed) {
      console.log(collapsed);
      this.collapsed = collapsed;
    },
  },
});
</script>
<style>
.layout-sider {
  box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
}
.layout-sider > * {
  user-select: none;
}
.title {
  color: #fff;
  font-size: 20px;
  line-height: 64px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 24px;
}
</style>