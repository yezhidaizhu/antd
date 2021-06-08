<template>
  <div style="width: 256px"
       class='layout-sider'>
    <a-menu mode="inline"
            theme="dark"
            :inline-collapsed="collapsed"
            :selectedKeys="selectedKeys"
            :openKeys="openKeys">
      <template v-for="item in list"
                :key="item.name">
        <template v-if="!item.children">
          <a-menu-item :key="item.name">
            <AntdMenuIcon :type="item.meta && item.meta.icon" />
            <span>{{ item.name }}</span>
          </a-menu-item>
        </template>
        <template v-else>
          <SubMenu :menu-info="item"
                   :key="item.name" />
        </template>
      </template>
    </a-menu>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import SubMenu from "./SubMenu.vue";
import AntdMenuIcon from "./AntdMenuIcon";

const list = [
  {
    path: "/function",
    name: "function",
    meta: { title: "function", icon: "PieChartOutlined" },
    component: () => import("@/views/Function/index.vue"),
    // children: [
    //   {
    //     path: "/xfunction",
    //     name: "xfunction",
    //     meta: { title: "function", icon: "PieChartOutlined" },
    //     component: () => import("@/views/Function/index.vue"),
    //   },
    // ],
  },
];

export default defineComponent({
  data() {
    return {
      selectedKeys: ["function", "xfunction"],
      openKeys: [],
      cachedOpenKeys: [],
    };
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    SubMenu,
    AntdMenuIcon,
  },
  setup() {
    const collapsed = ref<boolean>(false);
    const toggleCollapsed = () => {
      collapsed.value = !collapsed.value;
    };
    return {
      list,
      collapsed,
      toggleCollapsed,
    };
  },
  created() {
    console.log(this.$router);
    const _this = this;
    this.$watch("$route", function () {
      _this.updateMenu();
    });
    this.$watch("collapsed", function (val) {
      if (val) {
        _this.cachedOpenKeys = _this.openKeys.concat();
        _this.openKeys = [];
      } else {
        _this.openKeys = _this.cachedOpenKeys;
      }
    });
  },
  methods: {
    updateMenu() {
      var routes = this.$route.matched.concat();
      var hidden = this.$route.meta.hidden;

      if (routes.length >= 3 && hidden) {
        routes.pop();
        this.selectedKeys = [routes[routes.length - 1].path];
      } else {
        this.selectedKeys = [routes.pop().path];
      }

      var openKeys = [];

      if (this.mode === "inline") {
        routes.forEach(function (item) {
          item.path && openKeys.push(item.path);
        });
      }

      this.collapsed
        ? (this.cachedOpenKeys = openKeys)
        : (this.openKeys = openKeys);
    },
  },
  mounted() {
    this.updateMenu();
  },
});
</script>


