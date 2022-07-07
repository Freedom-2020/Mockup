import { Component, Vue } from 'vue-property-decorator';
import FormItemBox from './toolComponents/FormItemBox.vue'
import BuildForm from './buildPage/BuildForm.vue'

@Component({
  components: {
    FormItemBox,
    BuildForm,
  },
})
export default class Home extends Vue { 
  
}