<template>
  <a-drawer :visible="visible"
            :width="810"
            @close="onClose">
    <a-spin tip="Loading..."
            :spinning="loadingDetail">
      <!-- function Info -->
      <a-form layout='inline'
              hide-required-mark>
        <a-descriptions bordered
                        size="small">
          <a-row slot="title"
                 type="flex"
                 justify="space-between"
                 align="middle"
                 :style="{paddingRight:'32px'}">
            <span>Function Info</span>
            <a-button type="primary"
                      v-if="!editable"
                      @click="onChgEditable"> Edit
            </a-button>
            <span v-else>
              <a-button type="primary"
                        @click="saveEdit"
                        :style="{marginRight:'16px'}"
                        :loading="loadingSave">
                Save
              </a-button>
              <a-button type="dashed"
                        @click="cancelEdit">
                Cancel
              </a-button>

            </span>
          </a-row>

          <a-descriptions-item label="Name">
            <a-form-item>
              <a-input v-model:value="modelRef.name"
                       class="inputDefault"
                       :disabled="!editable"
                       :class="{editable:!editable}" />
            </a-form-item>
          </a-descriptions-item>
          <a-descriptions-item label="Runtime"
                               :span="2">
            {{currentFuncionInfo.runtime}}
          </a-descriptions-item>
          <a-descriptions-item label="Classname"
                               :span="3">
            <a-form-item :wrapper-col="{ span: 24 }"
                         :style="{width:'100%'}">
              <a-input v-model:value="modelRef.className"
                       class="inputDefault"
                       :disabled="!editable"
                       :class="{editable:!editable}" />
            </a-form-item>
          </a-descriptions-item>
          <a-descriptions-item :span="3">
            <span slot="label">
              <span :style="{marginRight:'8px'}">Input</span>
              <a-button icon="plus"
                        shape="circle"
                        type="dashed"
                        size="small"
                        v-show="editable"
                        @click="addInput" />
            </span>
            <a-form-item :wrapper-col="{ span: 24 }"
                         :style="{width:'100%'}"
                         v-for="item in inputFields"
                         :key="item.key">
              <a-row type="flex"
                     :gutter="8">
                <a-col flex="1">
                  <a-input v-model:value="modelRef[item.key]"
                           class="inputDefault"
                           :disabled="!editable"
                           :class="{editable:!editable}" />
                </a-col>
                <a-col>
                  <a-button shape="circle"
                            type="dashed"
                            size="small"
                            v-show="editable && inputs.length!==1"
                            @click="rmInput(item.key)"> - </a-button>
                </a-col>
              </a-row>
            </a-form-item>

          </a-descriptions-item>
          <a-descriptions-item label="Output"
                               :span="3">
            <a-form-item :wrapper-col="{ span: 24 }"
                         :style="{width:'100%'}">
              <a-input v-model:value="modelRef.output"
                       class="inputDefault"
                       :disabled="!editable"
                       :class="{editable:!editable}" />
            </a-form-item>
          </a-descriptions-item>
          <a-descriptions-item label="File"
                               :span="3"
                               v-if="editable">
            <a-form-item :wrapper-col="{ span: 24 }"
                         :style="{width:'100%'}">
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
          </a-descriptions-item>
        </a-descriptions>
      </a-form>
      <a-descriptions title="Stats"
                      bordered
                      size="small"
                      :column="2"
                      :style="{margin:'24px 0'}">
        <a-descriptions-item label="Received">
          {{currentFuncionInfo.receivedTotal || 0}}
        </a-descriptions-item>
        <a-descriptions-item label="Processed Successfully">
          {{currentFuncionInfo.processedSuccessfullyTotal || 0}}
        </a-descriptions-item>
        <a-descriptions-item label="System Exceptions">
          {{currentFuncionInfo.systemExceptionsTotal || 0}}
        </a-descriptions-item>
        <a-descriptions-item label="Avg Process Latency">
          {{currentFuncionInfo.avgProcessLatency || 0}}
        </a-descriptions-item>
      </a-descriptions>
      <a-descriptions title="Status"
                      bordered
                      size="small"
                      :column="2"
                      :style="{margin:'24px 0'}">
        <a-descriptions-item label="Number of instances">
          {{currentFuncionInfo.statusInfo && currentFuncionInfo.statusInfo.numInstances || 0}}
        </a-descriptions-item>
        <a-descriptions-item label="Number of running">
          {{currentFuncionInfo.statusInfo && currentFuncionInfo.statusInfo.numRunning || 0}}
        </a-descriptions-item>
      </a-descriptions>
    </a-spin>
  </a-drawer>
</template>
<script>
import { uid } from 'uid';
import { useForm } from '@ant-design-vue/use';
import { reactive } from 'vue';

export default {
  setup(props) {
    const { currentFuncionInfo: { name, className, input, output } } = props;
    const inputs = {};
    const inputsResult = {};
    const inputFields = input?.map((_input, i) => {
      const key = `input_${i}`;
      Object.assign(inputs, { [key]: _input });
      Object.assign(inputsResult, { [key]: [{ required: true, message: 'Please input your input!' }] });
      return { key, value: _input };
    });

    const modelRef = reactive({
      name,
      className,
      output,
      ...inputs,
    })

    const resultRef = reactive({
      name: [{ required: true, message: 'Please input your Input!' }],
      className: [{ required: true, message: 'Please input your className!' }],
      output: [{ required: true, message: 'Please input your output!' }],
      ...inputsResult,
    })

    const { resetFields, validateInfos, validate } = useForm(modelRef, resultRef);

    return {
      validateInfos,
      validate,
      resetFields,
      modelRef,
    }
  },
  data() {
    return {
      editable: false,
      loadingSave: false,
    };
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    currentFuncionInfo: {
      type: Object,
      default: () => { },
    },
    loadingDetail: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    onClose() {
      this.editable = false;
      this.loadingSave = false;
      this.inputs = [];

      this.$parent.currentFuncionInfo = {};
      this.$parent.closeDetail();
    },
    onReset() {
      this.resetFields();
    },
    onChgEditable() {
      this.editable = true;
      this.onReset();
    },
    cancelEdit() {
      this.onReset();
      this.editable = false;
      setTimeout(() => { // 恢复删除的
        this.onReset();
      });
    },
    addInput() {
      const inputName = `input_${uid(3)}`;
      this.inputs = [...this.inputs, { key: inputName, input: '' }];
    },
    rmInput(key) {
      this.inputs = this.inputs?.filter(input => input.key !== key);
    },
    saveEdit() {
      const _this = this;
      this.loadingSave = true;
      this.validate().then((values) => {
        console.log('Received values of form: ', values);
        setTimeout(() => {
          this.loadingSave = false
          _this.$notification.success({ message: `"${_this.currentFuncionInfo?.name}" function Modified successfully` });
        }, 1000);
      }).catch(() => { this.loadingSave = false })
    },
    normFile(e) {
      console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return [e[e.length - 1]];
      }
      if (e && e.fileList.length > 0) return [e.fileList[e.fileList.length - 1]];
      return [];
    },
    fbeforeUpload() {
      return false;
    },
  },
  computed: {
    listenFuncChange() {
      const { visible, currentFuncionInfo } = this
      return { visible, currentFuncionInfo }
    }
  },
  watch: {
    listenFuncChange() {
      if (this.visible) {
        this.onReset();
      }
    }
  }
}
</script>

<style scoped>
.inputDefault {
  background: #00000000;
  cursor: auto;
  color: #000000a6;
}
.editable {
  border-color: #00000000;
}
.editable:hover {
  border-color: #00000000;
}
</style>
