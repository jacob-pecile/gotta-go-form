export interface FormDefinition{
    sections: Section[];
}

export interface Section{
    title: string;
    fields: FormField[];
}

export interface FormField{
    title: string;
    accessor: string;
    type: FormType;
    callback: (e: any) => void;
    value: any;
    options?: FormOptions[];
    properties?: any;
}

export enum FormType{
    Custom = -1,
    Input = 0,
    Checkbox = 1,
    DropDown = 2,
    RadioButtonList = 3,
    CheckboxList = 4
}

export interface FormIndex{
    sectionIndex: number;
    fieldIndex: number;
}

export interface FormOptions{
    value: number | string;
    label: string;
}