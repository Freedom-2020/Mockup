import { Component, Vue } from 'vue-property-decorator';
import draggable from 'vuedraggable';
import { fieldTool, FieldSettingModel } from '@/commons/type/CommType';
import { FieldTypeEnum } from '@/commons/enums/FieldTypeEnum';
const list: fieldTool[] = [
  { fieldType: FieldTypeEnum.inputText },
  { fieldType: FieldTypeEnum.number },
  // { fieldType: FieldTypeEnum.select },
  // { fieldType: FieldTypeEnum.datePicker },
  // { fieldType: FieldTypeEnum.dateRange },
]

@Component({
  components: {
    draggable
  },
})
export default class FormItem extends Vue {
  toolList: fieldTool[] = [...list]

  cloneItem(data: fieldTool) {
    const random = (Math.random()*100).toFixed()
    const field: FieldSettingModel = {
      uid: new Date().getTime().toString() + Math.random(),
      fieldType: data.fieldType,
      fieldDataType: 'string',
      width: '25%',
      label: data.fieldType + random,
      fieldName: data.fieldType.charAt(0).toLowerCase() + data.fieldType.slice(1) + random,
      colSpan: 12,
    }

    if(field.fieldType === FieldTypeEnum.number){
      field.precision = 0
      field.fieldDataType = 'number'
    }

    return field
  }
}