import { FieldSettingModel, ItemSource, TreeItemSource, validation } from '@/commons/type/CommType';
import { Component, Vue, Emit, Prop, Watch } from 'vue-property-decorator';
import draggable from 'vuedraggable';
import * as _ from "lodash";
import { FieldTypeEnum } from '@/commons/enums/FieldTypeEnum';


@Component({
    components: {
      draggable,
    },
  })
export default class EditSimpleFieldSetting extends Vue {
    @Prop() field!: FieldSettingModel;
    @Prop() variableNameTreeData!: TreeItemSource[];
    @Prop() moduleName!: string;
    
    variableTreeData = _.cloneDeep(this.variableNameTreeData)
    currentVariableTreeNode?: TreeItemSource
    
    fieldModel: FieldSettingModel = {
        fieldType: this.field.fieldType,
        fieldDataType: '',
        display: undefined,
        fieldName: '',
        required: false,
        validations: [],
        options: [],
        disabled: '',
    }

    fieldTypeSelectList: ItemSource[] = []
    validationNameOptions: ItemSource[] = [
        {
            value: 'required',
            label: 'required'
        },
        {
            value: 'pattern',
            label: 'pattern'
        },
        {
            value: 'validator',
            label: 'Customize validator'
        },
    ]

    showVariableModal = false
    currentSelectVariableFieldName = ''
    validationsIndex = 0
    currentValidation?: validation = undefined

    showOptionsModal = false
    showError = false
    created(){
        this.fieldModel = {...this.fieldModel, ... this.field }
        this.setCurrentVariableTreeNode(this.variableTreeData)
        Object.entries(FieldTypeEnum).forEach(([key, value]) => {
            this.fieldTypeSelectList.push({value: value, label: value, index: new Date().getTime() + Math.random()})
        })
    }

    saveFieldSetting(){
        const fieldTree = this.variableTreeData.find(x => x.value === this.moduleName)
        if(fieldTree?.children?.filter(x => x.value === `${this.moduleName}.${this.fieldModel.fieldName}`).length < 2){
            this.toSave(this.fieldModel)
        }else{
            this.showError = true
        }
    }

    setCurrentVariableTreeNode(treeNodes: TreeItemSource[]){
        treeNodes.forEach(x => {
            if(x.value === `${this.moduleName}.${this.field.fieldName}`){
                this.currentVariableTreeNode = x
                return
            } else {
                if(x.children && x.children.length > 0){
                    this.setCurrentVariableTreeNode(x.children)
                }
            }
        })
    }

    getFieldDataType(fieldType: FieldTypeEnum){
        let type = ''
        switch (fieldType) {
            case FieldTypeEnum.inputText:
            case FieldTypeEnum.select:
            case FieldTypeEnum.treeSelect:
            case FieldTypeEnum.radio:
            case FieldTypeEnum.datePicker:
            case FieldTypeEnum.textarea:
                type = 'string'
                break;
            case FieldTypeEnum.number:
                type = 'number'
                break;   
            default:
                type = null
        }
    
        return type
    }

    labelChange(){
        if(this.fieldModel.label){
            this.fieldModel.fieldName = this.getVariableName(this.fieldModel.label)
        } else {
            this.fieldModel.fieldName = ''
        }
    }

    getVariableName(eng: string){
        if(!eng){
            return ''
        }

        const arr = eng.split(' ').map((x, wordIdx) => {
            let str = ''
            for (let index = 0; index < x.length; index++) {
                const element = x[index]
                if(index === 0){
                    str += wordIdx === 0 ? element.toLowerCase() : element.toUpperCase()
                } else {
                    str += element
                }
            }
            return str;
        })

        return arr.join('')
    }

    toAddValidation(){
        this.validationsIndex++
        this.fieldModel.validations?.push(
            {
                name: 'required',
                index: this.validationsIndex,
            }
        )
    }

    toDeleteValidation(index: number){
        (this.fieldModel.validations as validation[]).splice(index, 1)
    }

    validationChange(validation: validation){
        this.checkVariableFlag('validation')
        if(validation.customizeValidator && validation.customizeValidator.indexOf('{}') > -1){
            this.currentValidation = validation
            this.showVariableModal = true;
        } 
    }

    displayChange(){
        this.checkVariableFlag('display')
    }

    disabledChange(){
        this.checkVariableFlag('disabled')
    }

    calculatedValueChange(){
        this.checkVariableFlag('calculatedValue')
    }

    watchLabelChange(){
        this.checkVariableFlag('label')
    }

    checkVariableFlag(fieldName: string){
        if(fieldName === 'display' || fieldName === 'disabled' || fieldName === 'calculatedValue'){
            this.currentVariableTreeNode.class = 'hide'
        }else{
            this.currentVariableTreeNode.class = undefined
        }
        
        if((this.fieldModel as any)[fieldName] && (this.fieldModel as any)[fieldName].indexOf('{}') > -1){
            this.currentSelectVariableFieldName = fieldName
            this.showVariableModal = true;
        } 
    }

    selectField(selectedFieldName: string[]){
        if(this.currentValidation){
            this.currentValidation.customizeValidator = this.currentValidation.customizeValidator?.replace('{}', `{${selectedFieldName[0]}}`)
            this.currentValidation = undefined
        }else{
            (this.fieldModel as any)[this.currentSelectVariableFieldName] = (this.fieldModel as any)[this.currentSelectVariableFieldName]?.replace('{}', `{${selectedFieldName[0]}}`)
        }

        this.closeVariableModal()
    }

    toCloseVariableModal(){
        if(this.currentValidation){
            this.currentValidation.customizeValidator = this.currentValidation.customizeValidator?.replace('{}', '')
            this.currentValidation = undefined
        }else{
            (this.fieldModel as any)[this.currentSelectVariableFieldName] = (this.fieldModel as any)[this.currentSelectVariableFieldName]?.replace('{}', '')
        }
        
        this.closeVariableModal()
    }

    closeVariableModal(){
        this.showVariableModal = false
    }


    toShowOptions(){
        this.showOptionsModal = true
    }

    toCloseOptionsModal(){
        this.showOptionsModal = false
    }

    labelChangeOption(option: ItemSource){
        option.value = this.getVariableName(option.label)
    }

    toDeleteOption(index: number){
        (this.fieldModel.options as ItemSource[]).splice(index, 1)
    }

    toAddOptions(){
        this.fieldModel.options?.push({
            label: '',
            value: '',
            index: new Date().getTime() + Math.random(),
        })
    }

    calculatedValueBlue(){
        if(this.fieldModel.calculatedValue){
            this.fieldModel.disabled = 'true'
        }
    }

    get showOptions(){
        const fieldTypes = [FieldTypeEnum.select, FieldTypeEnum.radio]
        return fieldTypes.includes(this.fieldModel.fieldType)
    }

    get showMaxLength(){
        const fieldTypes = [FieldTypeEnum.inputText, FieldTypeEnum.textarea]
        return fieldTypes.includes(this.fieldModel.fieldType)
    }

    get showMinAndMax(){
        const fieldTypes = [FieldTypeEnum.number, FieldTypeEnum.datePicker, FieldTypeEnum.dateRange]
        return fieldTypes.includes(this.fieldModel.fieldType)
    }

    get showPrecision(){
        return this.fieldModel.fieldType === FieldTypeEnum.number
    }

    get showSourceUrl(){
        return this.fieldModel.fieldType === FieldTypeEnum.treeSelect
    }


    @Watch('fieldModel.fieldName')
    onFieldNameChanged(fieldName: string) {
        if(this.currentVariableTreeNode){
            this.currentVariableTreeNode.label = fieldName
            this.currentVariableTreeNode.value = `${this.currentVariableTreeNode.value.split('.')[0]}.${fieldName}`
        }
    }
    @Watch('fieldModel.fieldType')
    onFieldTypeChanged(fieldType: FieldTypeEnum) {
        this.fieldModel.fieldDataType = this.getFieldDataType(fieldType)
    }

    @Emit('toClose') toClose() {/**/}
    @Emit('toSave') toSave(field: FieldSettingModel) {/**/}
}