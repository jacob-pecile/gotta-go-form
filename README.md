# Gotta Go Form
A generic form renderer with Typescript, hooks, and styled components.

# About

Given a single JSON object to define your form. gotta-go-form's Form component will render out an entire form with validation, and field dependencies.

Gotta Go Form's goal is to allow quick creation of forms with even the most complicated requirements.

# Installation
```
#Yarn
yarn add gotta-go-form

#NPM
npm install gotta-go-form
```

# Example

```
import {Form, FormType} from 'gotta-go-form'
 
render() {
  const input: FormField = {
        title: "Input",
        accessor: "input",
        type: FormType.Input,
        callback: e => console.log(e.target.value),
        value: "",
        mandatoryMessage: "please put something here",
        properties: { inputProps: { maxLength: 5 } }
    };

    let def: FormDefinition = {
        sections: [
            {
            title: "Landing Zone",
            fields: [input]
            }
        ]
    };

    let footeractions = [
        {
            text: "Submit",
            type: "Primary",
            validate: true,
            onClick: () => console.log("Submitted")
        }
    ];
 
   return <Form formDefinition={def} footerActions={footeractions} />;
}
```

# Form Definition

The object used to define your form is defined as a list of "Sections" which in turn are defined as a lit of "FormFields"

```
interface FormDefinition {
	sections: Section[];
}

interface Section {
	title: string;
	fields: FormField[];
}
```

### Form Field

The Form Field object represents a single field on your form. gotta-go-form currently supports the following field types:

- Input
- Checkbox
- DropDown
- RadioButtonList
- CheckboxList
- DateTime
- TextArea
- Custom

It is defined using the following interface:

```
interface FormField {
	title: string;  //the name of your field
	accessor: string; //the unique identifier of your field
	type: FormType; 
	callback: (e: any) => void; //the function to be called on change of your field
	value: any;
	options?: FormOptions[]; //the potential values of your field (used by DropDown, RadioButtonList, and CheckBoxList)
	properties?: any; //optional properties specific to your field type i.e. the format of your datetime picker
	customComponent?: (field: FormField) => JSX.Element;
	mandatoryMessage?: string;
	validation?: Validation;
	visibility?: Visibility;
	observer?: Observer;
}

interface FormOptions {
	value: number | string;
	label: string;
}
```

**It is important that every field in your form has a unique accessor**
The accessor property is the field the form uses to distinguish fields in your form. Think of it like an ID on a DOM object.

You can find examples of the different form types [here](https://github.com/jacob-pecile/gotta-go-form/blob/master/examples/fields.tsx)

### Validation
If your only concern is that the field is empty you don't need to add a validation property to your field.
Simply add a mandatoryMessage and your field will be deemed invalid if empty.

If your validation is more complicated than that you will need to add a more complicated property:

```
interface Validation {
	accessors: string[];
	validate: (
		currentField: FormField,
		...dependantFields: FormField[]
	) => boolean;
	errorMessage: string;
}
```
gotta-go-form's validation allows for validation of varying complications.

##### accessors
Sometimes your validation might be dependant on the values of other fields. If that is the case put the accessors of the dependant fields here. 

##### validate
The function used to validate your field. THe entire field obejct if always be passed as the first parameter to this function. All dependant fields specified in the accessors property will be passed in as supplementary parameters. **These supplementary fields will be passed in the order specified in accessors**

##### errorMessage
The message you want to display below the field if the user submits the form while this field is invalid


### Visibility 
Sometimes you want fields to hidden in certain circumstances. YOu can define this with the visibility property

```
interface Visibility {
	accessors: string[];
	condition: (...dependantValues: any[]) => boolean;
}
```
##### accessors
the accessors of the fields that the current field needs to know the value of to determine whether it should be visible or not

##### condition
A function that returns a boolean based on the values of the dependant fields
**The passed in values will be passed in the order specified in accessors**

### Observers
Sometimes you want the sate of certain fields to be updated upon the change of other fields.

For example you might want an endtime field that immediately sets itself to 15 minutes after the user has set an start time.

You can add this logic to your form using the observer property. 

```
interface Observer {
	observables: string[];
	observerFunction: (
		observer: FormField,
		...Observables: FormField[]
	) => FormField;
}
```

Adding this property turns your field into an observer who is watching for when other fields change

##### observables
The accessors of the fields you want this field to observe.

##### observerFunction
This function will be called if the value of any of the observed fields change. The current (observer) field will be passed in as the first parameter and all observables will be passed in as supplementary parameters.

This function should update and return the observer field.

### Footer Actions
You'll likely want some global actions to take on your form. You do this by defining footer actions.
Each of these actions will become a button in the footer of this form.

```
interface FooterAction {
    text: string; //the test displayed on the button
    disabled?: boolean;
    type: 'Primary' | 'Secondary'; 
    validate?: boolean; 
    onClick: () => void; 
}
```

##### Validate
If you want to form to to be validated before it takes the action specified in the onClick function simply set the validate property to true. If the form is invalid then the error messages will be updated and the onClick function will not be called.

It's important to note that right now the form does not have an understanding of "submission" and thus you cannot get the current state of the form. 

**You must update your own state upon the execution of the callbacks for each field**

# Future Versions
Right now gotta-go-form has enough for you to start creating forms, but there are more features planned to the release of version 1.0.0

- horizonatal layout properties
- "submission" (making onchange methods nullable)
- simplifying the validation, visibility, and observer API (making accessors nullable)
- optional header component
- managing validation for only "dirty" fields
- make value nullable
- allowing for multiple validation functions for one field

# third party libraries
Datetime component built using : [react-datetime-picker](https://github.com/wojtekmaj/react-datetime-picker)

Dropdown component built using : [react-select](https://github.com/JedWatson/react-select)

