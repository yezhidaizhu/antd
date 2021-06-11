<template>
  <a-table :columns="columns"
           :loading="loadingList"
           :data-source="data">
    <template #status="{text}">
      <a-badge v-if="text === true"
               status="processing"
               text="Running" />
      <a-badge v-else-if="text === false"
               status="default"
               text="Down" />
      <a-spin v-else
              size="small" />
    </template>

    <template #action="{text}">
      <a @click="onSelFunction(text)">Trigger</a>
      <a-divider type="vertical" />
      <a @click="onShowDetail(text)">Detail</a>
      <a-divider type="vertical" />
      <a @click="onDelete(text)">Delete</a>
    </template>
  </a-table>
</template>

<script lang="ts">
// import moment from 'moment';
import { deleteFunc } from "@/api/func";
import { ref, defineComponent, PropType } from "vue";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    slots: { customRender: "status" },
  },
  {
    title: "Options",
    key: "action",
    slots: { customRender: "action" },
  },
];

export default defineComponent({
  data() {
    return {
      columns,
    };
  },
  props: {
    data: {
      type: Array,
      default: [],
    },
    onSelFunction: {
      type: Function as PropType<() => void>,
    },
    onShowDetail: {
      type: Function as PropType<() => void>,
      default: () => {},
    },
    loadingList: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onDelete(func) {
      const { name = "" } = func;
      const _this = this;
      this.$confirm({
        title: "Are you sure delete this function?",
        content: "Some descriptions",
        okType: "danger",
        async onOk() {
          try {
            const res = await deleteFunc(name);
            _this.$notification.success({
              message: `"${name}" function deleted successfully`,
            });
          } catch (error) {
            _this.$notification.error({
              message: `"${name}" funciton deletion failed`,
            });
          }
        },
      });
    },
  },
});
</script>