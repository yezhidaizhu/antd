<template>
  <a-sub-menu :key="menuInfo.path"
              v-bind="$attrs">
    <template #title>
      <span>
        <AntdMenuIcon :type="menuInfo.meta && menuInfo.meta.icon" />
        <span>{{ menuInfo.name }}</span>
      </span>
    </template>
    <template v-for="item in menuInfo.children"
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
  </a-sub-menu>
</template>

<script lang="ts">
import AntdMenuIcon from "./AntdMenuIcon";
import { defineComponent } from "vue";

export default defineComponent({
  name: "SubMenu",
  props: {
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    AntdMenuIcon,
  },
});
</script>