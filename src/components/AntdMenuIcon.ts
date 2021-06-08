import { h } from 'vue';
import * as Icon from "@ant-design/icons-vue";

export default {
  props: {
    type: {
      type: String,
      default: "",
    },
  },
  render() {
    const Comp = Icon?.[this.type];
    return h(Comp);
  },
}