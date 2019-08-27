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
}

export enum FormType{
    Custom = -1,
    Input = 0,
    Checkbox = 1,
    DropDown = 2,
    RadioButtonGroup = 3
}

export interface FormIndex{
    sectionIndex: number;
    fieldIndex: number;
}