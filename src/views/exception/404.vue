<template>
  <a-result status="404"
            title="404"
            sub-title="Sorry, the page you visited does not exist.">
    <template #extra>
      <a-button type="primary"
                @click="backHome">Back Home</a-button>
    </template>
  </a-result>
</template>
<script>
export default {
  methods: {
    backHome() {
      this.$router.back();
    }
  },
}
</script>
