import { FieldTypeEnum } from "../enums/FieldTypeEnum";

export interface FieldSettingModel {
    uid?: string;
    fieldType: FieldTypeEnum;
    fieldDataType?: string | number;
    label?: string;
    fieldName: string;
    required?: boolean;
    defaultValue?: string;
    calculatedValue?: string;
    display?: string;
    disabled?: string;
    validations?: Validation[];
    placeHolder?: string;
    maxLength?: number;
    textareaRows?: number;
    selectMode?: string;
    options?: ItemSource[];
    max?: number;
    min?: number;
    precision?: number;
    width?: string;
    colSpan?: number;
    sourceUrl?: string;
}

export interface FieldTool {
    fieldType: FieldTypeEnum;
    fieldName?: string;
}

export interface Validation {
    name: 'required' | 'pattern' | 'validator'
    errorMessage?: string;
    pattern?: string;
    index: number;
    customizeValidator?: string;
}

export interface RowModel {
    rowId: string;
    gutter: number;
    fields: FieldSettingModel[];
}

export interface RepeatingSection {
    sectionId: string;
    rows: RowModel[];
}

export type ComponentItem = RowModel | RepeatingSection

export interface CardModel {
    cardId: string;
    cardTitle: string;
    rows: ComponentItem[];
}

export interface FormPage {
    moduleName: string;
    filePath: string;
    cards: CardModel[];
}

export interface ItemSource {
    value: string | number;
    label: string;
    index?: number;
}

export interface TreeItemSource {
    value: string;
    label: string;
    fullPath?: string;
    children?: TreeItemSource[];
    selectable?: boolean;
    disabled?: boolean;
    class?: string;
}

export const isRowModel = (item: ComponentItem): item is RowModel => {
    return (item as RowModel).rowId !== undefined
}


