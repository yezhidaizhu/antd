<template>
  <a-drawer :width="720"
            :visible="visible"
            :body-style="{ paddingBottom: '40px' }"
            @close="onClose">
    <a-form layout="vertical">
      <a-form-item label="Inputs"
                   v-bind="validateInfos.inputs">
        <a-input v-model:value="modelRef.inputs"
                 placeholder="Please enter inputs"
                 allowClear />
      </a-form-item>
      <a-form-item label="Output"
                   v-bind="validateInfos.output">
        <a-input v-model:value="modelRef.output"
                 placeholder="Please enter output"
                 allowClear />
      </a-form-item>
      <a-form-item label="Log-topic"
                   v-bind="validateInfos.logTopic">
        <a-input v-model:value="modelRef.logTopic"
                 placeholder="Please enter log-topic"
                 allowClear />
      </a-form-item>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="ClassName"
                       v-bind="validateInfos.className">
            <a-input v-model:value="modelRef.className"
                     placeholder="Please enter className"
                     allowClear />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Runtime">
            <a-select v-model:value="modelRef.runtime"
                      @change="onRuntimeChg">
              <a-select-option value="JAVA">
                JAVA
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>

      <a-form-item label="Dragger"
                   v-bind="validateInfos.data">
        <div class="dropbox">
          <a-upload-dragger v-model:file-list="modelRef.data"
                            @change="normFile"
                            :before-upload="fbeforeUpload">
            <p class="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p class="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p class="ant-upload-hint">
              Only jar files are supported
            </p>
          </a-upload-dragger>
        </div>
      </a-form-item>
    </a-form>
    <div class="bottom-btn">
      <a-button :style="{ marginRight: '24px' }"
                @click="onReset">
        reset
      </a-button>
      <a-button type="primary"
                @click="onSub">
        Add
      </a-button>
    </div>
  </a-drawer>
</template>

<script>
import { InboxOutlined } from '@ant-design/icons-vue';
import { useForm } from '@ant-design-vue/use';
import { reactive } from 'vue';

export default {
  setup() {
    const modelRef = reactive({
      inputs: '',
      output: '',
      logTopic: '',
      className: '',
      runtime: 'JAVA',
      data: [],
    });

    const resultRef = reactive({
      inputs: [{ required: true, message: 'Please enter inputs', }],
      output: [{ required: true, message: 'Please enter output' }],
      logTopic: [{ required: true, message: 'Please enter log-topic' }],
      className: [{ required: true, message: 'Please enter className' }],
      runtime: [{ required: true, message: 'Please enter runtime' }],
      data: [{ required: true, message: 'Please upload file', type: 'array' }],
    })

    const { resetFields, validateInfos, validate } = useForm(modelRef, resultRef);

    return {
      modelRef,
      validate,
      validateInfos,
      resetFields,
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    }
  },
  components: {
    InboxOutlined
  },
  methods: {
    showDrawer() {
      this.$parent.showDrawer();
    },
    onClose() {
      this.$parent.closeDrawer();
    },
    onReset() {
      this.resetFields();
    },
    onSub() {
      this.validate().then((res) => {
        console.log('Received values of form: ', res);
      });
    },
    onRuntimeChg(value) {
      this.modelRef.runtime = value;
    },
    normFile(e) {
      if (Array.isArray(e)) {
        return [e[e.length - 1]];
      }
      if (e && e.fileList.length > 0) return [e.fileList[e.fileList.length - 1]];
      return [];
    },
    fbeforeUpload() {
      return false;
    }
  },
}
</script>

<style >
.bottom-btn {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #e9e9e9;
  padding: 10px 16px;
  background: #fff;
  text-align: right;
  z-index: 1;
}
</style>