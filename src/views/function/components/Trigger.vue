<template>
  <a-drawer :visible="visible"
            :width="460"
            @close="onClose">
    <a-form layout="vertical">
      <a-form-item label="Function Name"
                   v-if="modelRef.functionName">
        <a-select v-model:value="modelRef.functionName">
          <a-select-option v-for="item in data"
                           :key="item.key"
                           :value="item.name">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="data">
        <a-textarea v-model:value="modelRef.data"
                    :autoSize="{ minRows: 2, maxRows: 5 }"
                    allowClear />
      </a-form-item>
    </a-form>
    <a-row type="flex"
           justify="end"
           :style="{ marginBottom: '24px' }">
      <a-button type="primary"
                :loading="triggering"
                @click="onSub"> Trigger </a-button>
    </a-row>
    <a-card title="Result"
            :extra="triggerResultType"
            size="small">
      <div :style="{ minHeight: '64px' }">
        {{ triggerResult }}
      </div>
    </a-card>
  </a-drawer>
</template>

<script>
import { triggerFunc } from '@/api/func'
import { reactive } from 'vue'
import { useForm } from '@ant-design-vue/use';

export default {
  setup(props) {
    const { currentFunction: { name } } = props;
    const modelRef = reactive({
      functionName: name,
      data: '',
    })

    const resultRef = reactive({
      functionName: [{ required: true, message: 'Please select function!' }],
      data: [{ required: false }]
    })

    const { validateInfos, validate } = useForm(modelRef, resultRef);

    return {
      modelRef,
      validate
    }
  },
  data() {
    return {
      triggerResult: '',
      triggerResultType: '',
      triggering: false,
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      default: [],
    },
    currentFunction: {
      type: Object,
      default: {},
    },
  },
  methods: {
    onClose() {
      this.$parent.closeTrigger()
    },
    onSub() {
      this.triggering = true
      this.triggerResult = ''
      this.triggerResultType = ''
      this.validate().then((values) => {
        console.log('Received values of form: ', values)
        triggerFunc(values.functionName, values)
          .then((res) => {
            this.triggerResult = JSON.stringify(res)
            this.triggerResultType = typeof res
          })
          .finally(() => {
            setTimeout(() => {
              this.triggering = false
            }, 500)
          })
      })
    },
  },
  watch: {
    currentFunction() {
      this.modelRef.functionName = this.currentFunction.name;
    },
  },
}
</script>