 import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { 
  Button, 
  message, 
  Row, Col, 
  Checkbox, 
  Radio, 
  Select, 
  DatePicker, 
  Input, 
  InputNumber, 
  Icon, 
  Drawer, 
  FormModel, 
  Modal, 
  Tree, 
  Switch,
  TreeSelect
} from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.config.productionTip = false
Vue.use(Button);
Vue.use(Row);
Vue.use(Col);
Vue.use(Checkbox);
Vue.use(Radio);
Vue.use(Select);
Vue.use(DatePicker);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(FormModel);
Vue.use(Modal);
Vue.use(Tree);
Vue.use(Switch);
Vue.use(TreeSelect);

Vue.prototype.$message = message;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
