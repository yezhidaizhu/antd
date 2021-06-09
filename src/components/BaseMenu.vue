<template>
  <div>
    <a-menu :mode="mode"
            theme="dark"
            :inline-collapsed="collapsed"
            :selectedKeys="selectedKeys"
            :openKeys="openKeys"
            @openChange="openChange"
            @click="handleClick">
      <template v-for="item in menus"
                :key="item.path">
        <template v-if="!item.children">
          <a-menu-item :key="item.path">
            <AntdMenuIcon :type="item.meta && item.meta.icon" />
            <span>{{ item.name }}</span>
          </a-menu-item>
        </template>
        <template v-else>
          <SubMenu :menu-info="item"
                   :key="item.path" />
        </template>
      </template>
    </a-menu>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import SubMenu from "./SubMenu.vue";
import AntdMenuIcon from "./AntdMenuIcon";

export default defineComponent({
  data() {
    return {
      selectedKeys: [],
      openKeys: [],
      cachedOpenKeys: [],
      mode: "inline",
    };
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
    menus: {
      type: Array,
      default: [],
    },
  },
  components: {
    SubMenu,
    AntdMenuIcon,
  },
  computed: {
    rootSubmenuKeys(vm) {
      var keys = [];
      vm.menus.forEach(function (item) {
        return keys.push(item.path);
      });
      return keys;
    },
  },
  created() {
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
    handleClick(item) {
      this.$router.push(item?.key);
    },
    openChange(openKeys) {
      const _this = this;
      const latestOpenKey = openKeys.find(function (key) {
        return !_this.openKeys.includes(key);
      });

      if (!_this.rootSubmenuKeys.includes(latestOpenKey)) {
        _this.openKeys = openKeys;
      } else {
        _this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
  },
  mounted() {
    this.updateMenu();
  },
});
</script>


