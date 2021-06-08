<template>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

