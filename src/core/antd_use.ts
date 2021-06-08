// base library
import {
  ConfigProvider,
  Layout,
  Input,
  InputNumber,
  Button,
  Switch,
  Radio,
  Checkbox,
  Select,
  Card,
  Form,
  Row,
  Col,
  Modal,
  Table,
  Tabs,
  Icon,
  Badge,
  Popover,
  Dropdown,
  List,
  Avatar,
  Breadcrumb,
  Steps,
  Spin,
  Menu,
  Drawer,
  Tooltip,
  Alert,
  Tag,
  Divider,
  DatePicker,
  TimePicker,
  Upload,
  Progress,
  Skeleton,
  Popconfirm,
  PageHeader,
  Result,
  Statistic,
  Descriptions,
  Space,
  message,
  notification
} from 'ant-design-vue'
import "ant-design-vue/dist/antd.css";
import { App } from 'vue';

const installAntd = (app: App<Element>) => {

  app.use(ConfigProvider)
  app.use(Layout)
  app.use(Input)
  app.use(InputNumber)
  app.use(Button)
  app.use(Switch)
  app.use(Radio)
  app.use(Checkbox)
  app.use(Select)
  app.use(Card)
  app.use(Form)
  app.use(Row)
  app.use(Col)
  app.use(Modal)
  app.use(Table)
  app.use(Tabs)
  app.use(Icon)
  app.use(Badge)
  app.use(Popover)
  app.use(Dropdown)
  app.use(List)
  app.use(Avatar)
  app.use(Breadcrumb)
  app.use(Steps)
  app.use(Spin)
  app.use(Menu)
  app.use(Drawer)
  app.use(Tooltip)
  app.use(Alert)
  app.use(Tag)
  app.use(Divider)
  app.use(DatePicker)
  app.use(TimePicker)
  app.use(Upload)
  app.use(Progress)
  app.use(Skeleton)
  app.use(Popconfirm)
  app.use(PageHeader)
  app.use(Result)
  app.use(Statistic)
  app.use(Descriptions)
  app.use(Space)

  app.config.globalProperties.$confirm = Modal.confirm
  app.config.globalProperties.$message = message
  app.config.globalProperties.$notification = notification
  app.config.globalProperties.$info = Modal.info
  app.config.globalProperties.$success = Modal.success
  app.config.globalProperties.$error = Modal.error
  app.config.globalProperties.$warning = Modal.warning
}

export default installAntd;

// @ts-ignore
process.env.NODE_ENV !== 'production' && console.warn('[antd-pro] NOTICE: Antd use lazy-load.')
