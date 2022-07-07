<template>
    <a-modal 
        :visible="true" 
        :maskClosable="false"
        :keyboard="false"
        :width="1000"
        :centered="true"
        dialogClass="fieldSetting_dialog"
        @ok="saveFieldSetting"
        @cancel="toClose">

        <a-form-model :model="fieldModel" ref="formRef" :labelCol="{span: 24}" :wrapperCol="{span: 24}" >
            <a-row :gutter="8">
                <a-col :span="24">
                    <a-form-model-item label="Label name">
                        <a-input v-model="fieldModel.label" @blur="labelChange" @input="watchLabelChange" />
                    </a-form-model-item>
                </a-col>
            </a-row>
            <a-row :gutter="8">
                <a-col :span="6">
                    <a-form-model-item label="Field name">
                        <a-input v-model="fieldModel.fieldName" />
                    </a-form-model-item>
                    <span v-show="showError" class="error_msg">Duplicate file name</span>
                </a-col>
                <a-col :span="6">
                    <a-form-model-item label="Control type">
                        <a-select v-model="fieldModel.fieldType">
                            <a-select-option v-for="item in fieldTypeSelectList" :key="item.value" :value="item.value">
                                {{item.value}}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                </a-col>
                <a-col :span="6">
                    <a-form-model-item label="Default value">
                        <a-button v-if="showOptions" type="primary" @click="toShowOptions">
                             Options
                        </a-button>
                        <a-select v-if="showOptions" v-model="fieldModel.defaultValue" class="defaultSelect">
                            <a-select-option v-for="item in fieldModel.options" :key="item.value" :value="item.value">
                                {{item.label}}
                            </a-select-option>
                        </a-select>
                        <a-input v-else v-model="fieldModel.defaultValue" />
                    </a-form-model-item>
                </a-col>
                <a-col :span="6">
                    <a-form-model-item label="Width">
                        <a-input-number class="w_100" v-model="fieldModel.colSpan" />
                    </a-form-model-item>
                </a-col>
            </a-row>
            <a-row :gutter="8">
                <a-col v-if="showMaxLength" :span="6">
                    <a-form-model-item label="Max Length">
                        <a-input-number class="w_100" v-model="fieldModel.maxLength" />
                    </a-form-model-item>
                </a-col>
                <a-col v-if="showMinAndMax" :span="6">
                    <a-form-model-item label="Min">
                        <a-input-number class="w_100" v-model="fieldModel.min" />
                    </a-form-model-item>
                </a-col>
                <a-col v-if="showMinAndMax" :span="6">
                    <a-form-model-item label="Max">
                        <a-input-number class="w_100" v-model="fieldModel.max" />
                    </a-form-model-item>
                </a-col>
                <a-col v-if="showPrecision" :span="6">
                    <a-form-model-item label="Precision">
                        <a-input-number class="w_100" v-model="fieldModel.precision" />
                    </a-form-model-item>
                </a-col>
                <a-col v-if="showSourceUrl" :span="6">
                    <a-form-model-item label="Source URL">
                        <a-input v-model="fieldModel.sourceUrl" />
                    </a-form-model-item>
                </a-col>
            </a-row>
            <label>Validations</label>
            <div class="validations_box">
                <draggable
                    :list="fieldModel.validations"
                    :group="{ name: 'validationDrag' }"
                    draggable=".draggable_validation">
                    
                    <div v-for="(validation, validationIdx) in fieldModel.validations" :key="validation.index" class="validation_box draggable_validation pointer">
                        <a-row :gutter="8">
                            <a-col :span="12">
                                <a-form-model-item label="Name">
                                    <a-radio-group v-model="fieldModel.validations[validationIdx].name">
                                        <a-radio v-for="option in validationNameOptions" :key="option.value" :value="option.value">
                                            {{option.label}}
                                        </a-radio>
                                    </a-radio-group>
                                </a-form-model-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-model-item label="Error message">
                                    <a-input v-model="fieldModel.validations[validationIdx].errorMessage" />
                                </a-form-model-item>
                            </a-col>
                        </a-row>
                        <a-row v-if="fieldModel.validations[validationIdx].name === 'pattern'" :gutter="8">
                            <a-col :span="24">
                                <a-form-model-item label="Pattern">
                                    <a-input v-model="fieldModel.validations[validationIdx].pattern" />
                                </a-form-model-item>
                            </a-col>
                        </a-row>
                        <a-row v-else-if="fieldModel.validations[validationIdx].name === 'validator'" :gutter="8">
                            <a-col :span="24">
                                <a-form-model-item label="Customize validator">
                                    <a-input @input="validationChange(fieldModel.validations[validationIdx])" row="1" v-model="fieldModel.validations[validationIdx].customizeValidator" />
                                </a-form-model-item>
                            </a-col>
                        </a-row>
                        <a-icon
                            type="close"
                            class="delete_validation"
                            @click="toDeleteValidation(validationIdx)"
                        />
                    </div>
                </draggable>
                
                <a-button class="addValidation" @click="toAddValidation" type="link">
                    <a-icon class="mr_10" type="plus" />
                    Add validation
                </a-button>
            </div>
            <a-row :gutter="8">
                <a-col :span="24">
                    <a-form-model-item label="Display">
                        <a-input row="3" v-model="fieldModel.display" @input="displayChange" />
                    </a-form-model-item>
                </a-col>
            </a-row>
            <a-row :gutter="8">
                <a-col :span="24">
                    <a-form-model-item label="Disabled">
                        <a-input row="3" v-model="fieldModel.disabled" @input="disabledChange" />
                    </a-form-model-item>
                </a-col>
            </a-row>
            <a-row :gutter="8">
                <a-col :span="24">
                    <a-form-model-item label="Calculated value">
                        <a-input row="3" v-model="fieldModel.calculatedValue" @input="calculatedValueChange" @blur="calculatedValueBlue" />
                    </a-form-model-item>
                </a-col>
            </a-row>
        </a-form-model>

        <a-modal 
            :visible="showVariableModal" 
            :mask="false"
            :centered="true"
            dialogClass="variable_dialog"
            :destroyOnClose="true"
            :footer="null"
            @cancel="toCloseVariableModal">
            
            <a-tree
                :tree-data="variableTreeData"
                :replaceFields="{key: 'value', title: 'label'}"
                @select="selectField">
            
            </a-tree>
        </a-modal>
        <a-modal 
            :visible="showOptionsModal" 
            :centered="true"
            dialogClass="option_dialog"
            :destroyOnClose="true"
            :closable="false">
            <div>
                <a-row :gutter="8">
                    <a-col :span="12" class="t_center">Label</a-col>
                    <a-col :span="12" class="t_center">Value</a-col>
                </a-row>
                <draggable
                    :list="fieldModel.options"
                    :group="{ name: 'optionDrag' }"
                    draggable=".draggable_option">

                    <a-row :gutter="8" v-for="(item, idx) in fieldModel.options" :key="item.index" class="draggable_option mb_3 pointer">
                        <a-col :span="12"><a-input v-model="fieldModel.options[idx].label" @blur="labelChangeOption(item)" /></a-col>
                        <a-col :span="12"><a-input v-model="fieldModel.options[idx].value" /></a-col>
                        <a-icon
                            type="close"
                            class="delete_option"
                            @click="toDeleteOption(idx)"
                        />
                    </a-row>
                </draggable>
                
                <a-button class="addValidation" @click="toAddOptions" type="link">
                    <a-icon class="mr_10" type="plus" />
                    Add Option
                </a-button>
            </div>
            <template slot="footer">
                <a-button type="primary" key="back" @click="toCloseOptionsModal">Close</a-button>
            </template>
        </a-modal>
    </a-modal>
</template>
<script src="./EditSimpleFieldSetting.ts" lang="ts"></script>
<style lang="scss" scoped>
::v-deep .fieldSetting_dialog .ant-modal-body{
    max-height: 400px;
    overflow-y: auto;
}
::v-deep .variable_dialog .ant-modal-body{
    min-height: 300px;
}
::v-deep .option_dialog .ant-modal-body{
    min-height: 100px;
    max-height: 400px;
}
::v-deep .ant-form-item{
    margin-bottom: 5px;
    .ant-form-item-label{
        padding-bottom: 0;
    }
}
.validations_box{
    border: 1px solid #ddd;
    padding: 5px;
    border-radius: 5px;
    margin-bottom: 10px;
}
.validation_box{
    position: relative;
    border: 1px dashed #ddd;
    padding: 3px;
    border-radius: 2px;
    margin-bottom: 15px;
}
.delete_validation {
    position:absolute;
    right: 3px;
    top: 3px;
    font-size: 16px;
    color: red !important;
}
.delete_option{
    position:absolute;
    right: -13px;
    top: 5px;
    font-size: 16px;
    color: red !important;
}
.addValidation{
    display: block;
    width: 140px;
    margin: auto;
}
.defaultSelect{
    width: 148px;
}
</style>