<template>
  <ReloadOutlined @click="reload" />
  <div class="header-right">
    <GithubOutlined /> Github
  </div>
</template>

<script>
import { ReloadOutlined, GithubOutlined } from "@ant-design/icons-vue";

export default {
  props: {
    reload: Function,
  },
  components: {
    ReloadOutlined,
    GithubOutlined,
  }
}
</script>