<template>
  <a-layout>
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
      <BaseMenu :collapsed="collapsed"
                :menus="menus" />
    </a-layout-sider>
    <a-layout :style="{ minHeight: '100vh' }">
      <a-layout-header :style="{ background: '#fff', padding: 0 }">
        <slot name="header"></slot>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
        <div :style="{ padding: '24px', background: '#fff' }">
          <router-view></router-view>
        </div>
      </a-layout-content>
      <a-layout-footer :style="{ textAlign: 'center' }">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import BaseMenu from "@/components/BaseMenu.vue";
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
    BaseMenu,
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
.layout-sider .title {
  color: #fff;
  font-size: 20px;
  line-height: 64px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 24px;
}
</style>