<template>
  <a-layout class="global-layout">
    <a-layout-sider :width="width"
                    collapsible
                    :collapsed="collapsed"
                    :trigger="null" />
    <a-layout-sider :width="width"
                    class="layout-sider"
                    collapsible
                    :collapsed="collapsed"
                    @collapse="collapse">
      <a-row type="flex"
             justify="center"
             align="center">
        <div class="title">
          <slot name="title">
            {{title}}
          </slot>
        </div>
      </a-row>
      <Menu :collapsed="collapsed"
            :menus="menus" />
    </a-layout-sider>
    <a-layout :style="{ minHeight: '100vh' }">

      <!-- header -->
      <a-layout-header class="header">
        <slot name="header"></slot>
      </a-layout-header>

      <!-- content -->
      <a-layout-content>
        <div>
          <slot name="content">
            <router-view></router-view>
          </slot>
        </div>
      </a-layout-content>

      <!-- footer -->
      <a-layout-footer>
        <a-row type="flex"
               justify="center"
               align="middle">
          <slot name="footer">
            Ant Design ©2018 Created by Ant UED
          </slot>
        </a-row>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import Menu from "@/components/Menu.vue";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      collapsed: false,
    };
  },
  props: {
    width: {
      type: Number,
      default: 256,
    },
    menus: {
      type: Array,
      default: [],
    },
    title: {
      type: String,
      default: "",
    },
  },
  components: {
    Menu,
  },
  computed: {},
  methods: {
    collapse(collapsed) {
      this.collapsed = collapsed;
    },
  },
});
</script>
<style>
.global-layout .layout-sider {
  box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
  z-index: 3;
}
.global-layout .layout-sider > * {
  user-select: none;
}
.global-layout .layout-sider .title {
  color: #fff;
  font-size: 20px;
  line-height: 64px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 24px;
}
.global-layout .header {
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  background: #fff;
  padding: 0 16px;
  z-index: 2;
}
.global-layout .header .header-right {
  float: right;
  user-select: none;
}
</style>