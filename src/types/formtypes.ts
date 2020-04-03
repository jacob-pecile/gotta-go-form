export interface FormDefinition {
	title?: string;
	sections: Section[];
}

export interface Section {
	title?: string;
	fields: FormField[];
}

export interface FormField {
	title: string;
	accessor: string;
	type: FormType;
	callback?: (e: any) => void;
	isDirty?: boolean;
	value?: any;
	options?: FormOptions[];
	properties?: any;
	customComponent?: (field: FormField) => JSX.Element;
	mandatoryMessage?: string;
	validation?: Validation | Validation[];
	visibility?: Visibility;
	observer?: Observer;
	fieldWidthPercentage?: number;
}

export enum FormType {
	Custom = -1,
	Input = 0,
	Checkbox = 1,
	DropDown = 2,
	RadioButtonList = 3,
	CheckboxList = 4,
	DateTime = 5,
	TextArea = 6
}

export interface FormIndex {
	sectionIndex: number;
	fieldIndex: number;
}

export interface FormOptions {
	value: number | string;
	label: string;
}

export interface Validation {
	accessors?: string[];
	validate: (
		currentField: FormField,
		...dependantFields: FormField[]
	) => boolean;
	evaluation?: boolean;
	errorMessage: string;
}

export interface Visibility {
	accessors: string[];
	condition: (...dependantValues: any[]) => boolean;
	isVisible?: boolean;
}

export interface Observer {
	observables: string[];
	observerFunction: (
		observer: FormField,
		...Observables: FormField[]
	) => FormField;
}
