/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/*
 * Copyright (c) QJJS. All rights reserved.
 * ProjectName: Qjps.Configuration.Web
 * FileName : draggleContainer.ts
 * Author : yangxiaomin
 * Date : 2020-06-09 09:42:29
 */

import { Component, Prop, Vue } from "vue-property-decorator";
import { FieldTypeEnum } from '@/commons/enums/FieldTypeEnum';
import { FieldSettingModel, ItemSource } from "@/commons/type/CommType";
import { DATE_FORMAT, INPUT_NUMBER_MAX, INPUT_NUMBER_MIN } from "@/commons/consts/CommConst";


@Component({
    components: {},
})
export default class RenderField extends Vue {
    @Prop() field!: FieldSettingModel;
    updateState = true;

    render() {
        switch (this.field.fieldType) {
            case FieldTypeEnum.inputText:
                return this.renderInputText(this.field);
            case FieldTypeEnum.textarea:
                return this.renderTextarea(this.field);
            case FieldTypeEnum.number:
                return this.renderNumber(this.field);
            case FieldTypeEnum.select:
                return this.renderSelect(this.field);
            case FieldTypeEnum.treeSelect:
                return this.renderTreeSelect();
            case FieldTypeEnum.datePicker:
                return this.renderDate(this.field);
            case FieldTypeEnum.dateRange:
                return this.renderDateRange(this.field);
            case FieldTypeEnum.switch:
                return this.renderSwitch(this.field);
            case FieldTypeEnum.radio:
                return this.renderRadio(this.field);
            case FieldTypeEnum.checkbox:
                return this.renderCheckBox(this.field);
            // case FieldTypeEnum.file:
            //     return this.renderFile(this.field);
            case FieldTypeEnum.staticText:
                return this.renderStaticText(this.field);
            //   case FieldTypeEnum.Custom:
            //     return this.renderCustom(this.field);
            default:
                throw new Error("field type is error");
        }
    }

    renderStaticText(field: FieldSettingModel): JSX.Element {
        return <span>{field.defaultValue}</span>;
    }

    renderInputText(field: FieldSettingModel): JSX.Element {
        return (
            <a-input
                placeholder={field.placeHolder}
                maxLength={field.maxLength}
            />
        );
    }

    renderTextarea(field: FieldSettingModel): JSX.Element | undefined {
        return (
            <a-textarea
                rows={field.textareaRows}
                placeholder={field.placeHolder}
                maxLength={field.maxLength}
            />
        );
    }

    renderNumber(field: FieldSettingModel): JSX.Element | undefined {
        return (
            <a-input-number
                max={field.max || INPUT_NUMBER_MAX}
                min={field.min || INPUT_NUMBER_MIN}
                precision={field.precision || 0}
                placeholder={field.placeHolder}
                class={"w_100"}
            //formatter={(value: number) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            //parser={(value: string) => value.replace(/$s?|(,*)/g, "")}
            />
        );
    }

    renderSelect(field: FieldSettingModel): JSX.Element {
        return (
            <a-select
                placeholder={field.placeHolder}
                mode={field.selectMode || "default"}
                class={"w_100"}
            >
                {field.options?.map((s: ItemSource) => (
                    <a-select-option value={s.value}>{s.label}</a-select-option>
                ))}
            </a-select>
        );
    }

    renderDate(field: FieldSettingModel): JSX.Element {
        return (
            <a-date-picker
                class={"w_100"}
                placeholder={field.placeHolder}
                format={DATE_FORMAT}
            />
        );
    }

    // eslint-disable-next-line
    renderDateRange(field: FieldSettingModel): JSX.Element | undefined {
        return (
            <a-range-picker
                format={DATE_FORMAT}
                class={"w_100"}
            />
        );
    }

    renderTreeSelect(): JSX.Element {
        return <a-tree-select class={"w_100"} show-search />
    }

    // eslint-disable-next-line
    renderSwitch(field: FieldSettingModel): JSX.Element {
        return <a-switch />;
    }

    renderRadio(field: FieldSettingModel): JSX.Element {
        return (
            <a-radio-group class="w_100">
                {field.options?.map((s) => (
                    <a-radio value={s.value}>{s.label}</a-radio>
                ))}
            </a-radio-group>
        );
    }

    renderCheckBox(field: FieldSettingModel): JSX.Element {
        return (
            <a-checkbox-group>
                {field.options?.map((s) => (
                    <a-checkbox value={s.value}>{s.label}</a-checkbox>
                ))}
            </a-checkbox-group>
        );
    }


    // renderFile(field: FieldModel): JSX.Element | undefined {
    //     //@ts-ignore
    //     return <File isJustShow={true} />;
    // }

    // eslint-disable-next-line
    // renderCustom(field: FieldDetailModel): JSX.Element | undefined {
    //     if (field.fieldCode === CustomFieldEnum.CreateMainProjectSalesProject) {
    //         return (
    //             <SalesProjectSelect
    //                 // @ts-ignore
    //                 placeholder={field.placeHolder}
    //                 v-decorator={[`${field.fieldCode}`, { rules: getRules(field), initialValue: field.fieldValue }]}
    //             />
    //         );
    //     } else {
    //         return <span>自定义控件</span>;
    //     }
    // }

    // getSimpleItemSource(field: FieldDetailModel): ItemSourceModel[] {
    //     return field.fieldSetting.options ? field.fieldSetting.options : [];
    // }

    // getItemSourceFilter(value: Array<ItemSourceModel>, includeEmpty = true) {
    //     const obj = {};
    //     const result = value
    //         .filter((x) => includeEmpty || x.value)
    //         .reduce((cur: Array<ItemSourceModel>, next) => {
    //             if (!obj[next.value]) {
    //                 obj[next.value] = true;
    //                 cur.push(next);
    //             }

    //             return cur;
    //         }, []);

    //     return result;
    // }

    // get getRemoteItemSource(): ItemSourceModel[] {
    //     return this.remoteOptions.map(
    //         (s) =>
    //             Object({
    //                 value: s.id,
    //                 text: s.name,
    //             }),
    //         []
    //     );
    // }

    // get getRemoteItemTreeSource(): TreeItemModel[] {
    //     return this.remoteOptions;
    // }

    // get readonly() {
    //     return this.field.isReadonly;
    // }

    // eslint-disable-next-line
    // @Watch("field", { deep: true, immediate: true }) watchFieldChange(val: FieldDetailModel, oldVal: FieldDetailModel) {
    //     this.updateState = false;
    //     if (!val.fieldSetting || !val.fieldSetting.sourceTypeId) {
    //         return [];
    //     }

    //     apiGetCodeSourceByCodeType(val.fieldSetting.sourceTypeId).then((data: TreeItemModel[]) => {
    //         this.remoteOptions = data;
    //         setTreeCanSelect(this.remoteOptions);

    //         this.$nextTick(() => {
    //             this.updateState = true;
    //         });
    //     });
    // }
}
