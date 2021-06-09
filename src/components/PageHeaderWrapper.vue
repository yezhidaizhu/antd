<template>
  <div class="page-header-wrapper">
    <!-- wrapper -->
    <a-page-header class="wrapper"
                   title="Title"
                   :breadcrumb="{ routes,itemRender }"
                   :sub-title="subTitle">
      <template>
        <slot name="extra"></slot>
      </template>
      <!-- <template #itemRender="{}">
        itemRender
      </template> -->
      <slot name="wrapper"></slot>
    </a-page-header>

    <!-- content -->
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { RouterLink, useRoute } from 'vue-router';
import { h } from 'vue';

export default {
  props: {
    subTitle: {
      type: String,
      default: "",
    }
  },
  created() {
    const _this = this;
    this.$watch("$route", function () {
      _this.upBreadcrumb();
    });
  },
  setup() {
    const route = useRoute();
    const routes = route?.matched?.map((item) => {
      const { name: breadcrumbName, path } = item;
      return { path, breadcrumbName };
    })

    const itemRender = ({ route, routes }) => {
      const props = {
        to: "/function/function1"
      }
      return h('router-link', props, [h('a', {}, route.breadcrumbName)]);
    }
    console.log(route.matched);
    return {
      routes,
      itemRender,
    }
  },
  methods: {
    upBreadcrumb() {
      const route = this.$route;
    }
  },
}
</script>

<style scoped>
.page-header-wrapper {
  overflow: initial;
}
.wrapper {
  padding: 16px;
  background: #fff;
}
.content {
  /* padding: 24px; */
  padding: 16px;
  margin: 24px;
  background: #fff;
}
</style>
