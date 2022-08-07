/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, Vue } from 'vue-property-decorator';
import draggable from 'vuedraggable';
import { FieldSettingModel, FormPage, isRowModel, TreeItemSource } from '@/commons/type/CommType';
import { FieldTypeEnum } from '@/commons/enums/FieldTypeEnum';
import RenderField from './RenderField';
import EditSimpleFieldSetting from './EditSimpleFieldSetting.vue'

@Component({
  components: {
    draggable,
    RenderField,
    EditSimpleFieldSetting,
  },
})
export default class buildForm extends Vue {
  showEditSimpleFieldSetting = false
  currentField?: FieldSettingModel = undefined
  formPage: FormPage = {
    moduleName: 'formEdit',
    filePath: '/Users/hong.wang/Documents/project/my-curise/src/page/Form/',
    cards: []
  }

  async created() {
    //this.toAddCard(-1)
    const response = await fetch('/api/get', {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    this.formPage.cards = data
  }

  async toSave() {
    await fetch('/api/save', {
      method: 'Post', // or 'PUT'
      body: JSON.stringify(this.formPage),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  getDefaultField() {
    const random = (Math.random() * 100).toFixed()
    const field: FieldSettingModel = {
      uid: new Date().getTime().toString() + Math.random(),
      fieldType: FieldTypeEnum.inputText,
      fieldDataType: 'string',
      width: '25%',
      label: FieldTypeEnum.inputText + random,
      fieldName: FieldTypeEnum.inputText.charAt(0).toLowerCase() + FieldTypeEnum.inputText.slice(1) + random,
      colSpan: 12,
    }

    if (field.fieldType === FieldTypeEnum.number) {
      field.precision = 0
    }

    this.toEditFieldSetting(field)
    return field
  }

  toAddCard(cardIdx: number) {
    const card = {
      cardId: new Date().getTime().toString() + Math.random(),
      cardTitle: 'new card',
      rows: [
        {
          rowId: new Date().getTime().toString() + Math.random(),
          gutter: 16,
          fields: [this.getDefaultField()]
        },
      ]
    }
    this.formPage.cards.splice(cardIdx + 1, 0, card)
  }

  toDeleteCard(cardIdx: number) {
    this.formPage.cards.splice(cardIdx, 1)
  }

  toAddRow(cardIdx: number, rowIdx: number) {
    const row = {
      rowId: new Date().getTime().toString() + Math.random(),
      gutter: 16,
      fields: [this.getDefaultField()]
    }

    this.formPage.cards[cardIdx].rows.splice(rowIdx + 1, 0, row)
  }

  toDeleteRow(cardIdx: number, rowIdx: number) {
    this.formPage.cards[cardIdx].rows.splice(rowIdx, 1)
  }

  toAddField(cardIdx: number, rowIdx: number, fieldIdx: number) {
    const row = this.formPage.cards[cardIdx].rows[rowIdx]
    if (!isRowModel(row)) return

    const fields = row.fields
    fields.splice(fieldIdx + 1, 0, this.getDefaultField())
    this.setFieldWidth(fields)
  }

  toDeleteField(cardIdx: number, rowIdx: number, fieldIdx: number) {
    const row = this.formPage.cards[cardIdx].rows[rowIdx]
    if (!isRowModel(row)) return

    const fields = row.fields
    fields.splice(fieldIdx, 1)
    this.setFieldWidth(fields)
  }

  add() {
    //this.toEditFieldSetting(field)
  }

  setFieldWidth(fields: FieldSettingModel[]) {
    if (fields.length >= 4) {
      const width = 100 / fields.length + '%'
      fields.forEach(x => {
        x.width = width
      })
    }
  }

  getLabelClass(field: FieldSettingModel) {
    return field.validations && field.validations.some(x => x.name === 'required') ? 'requiredSign' : ''
  }

  toEditFieldSetting(field: FieldSettingModel) {
    this.currentField = field
    this.showEditSimpleFieldSetting = true
  }

  updateFieldSetting(field: FieldSettingModel) {
    Object.keys(field).forEach(key => {
      (this.currentField as unknown)[key] = (field as unknown)[key]
    })
    this.formPage.cards = [...this.formPage.cards]
    this.closeEditSimpleFieldSetting()
  }

  get variableNameTreeData() {
    const variableNames: TreeItemSource[] = [
      {
        value: this.formPage.moduleName,
        label: this.formPage.moduleName,
        children: [],
        selectable: false
      }
    ]

    this.formPage.cards.forEach(card => {
      card.rows.forEach(row => {
        if (isRowModel(row)) {
          row.fields.forEach(field => {
            if (field.fieldName) {
              variableNames[0].children?.push({
                value: `${this.formPage.moduleName}.${field.fieldName}`,
                label: field.fieldName || '',
              })
            }
          })
        }
      })
    })

    return variableNames;
  }

  closeEditSimpleFieldSetting() {
    this.showEditSimpleFieldSetting = false
  }
}