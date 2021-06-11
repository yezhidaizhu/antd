<template>
  <div class="page-header-wrapper">
    <!-- wrapper -->
    <a-page-header class="wrapper"
                   :title="title"
                   :breadcrumb="{ routes,itemRender }"
                   :sub-title="subTitle">
      <template #extra>
        <slot name="extra"></slot>
      </template>
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
  setup(props) {
    let title = props.title;
    const route = useRoute();
    const routes = route?.matched?.map((item) => {
      const { name: breadcrumbName, path } = item;
      return { path, breadcrumbName };
    })

    const itemRender = ({ route, routes }) => {
      const props = {
        to: route.path
      }
      return h(RouterLink, props, [h('a', {}, route.breadcrumbName)]);
    }

    title = title || routes?.pop()?.breadcrumbName;

    return {
      routes,
      itemRender,
      title,
    }
  },
  created() {
    const _this = this;
    this.$watch("$route", function () {
      _this.upBreadcrumb();
    });
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
