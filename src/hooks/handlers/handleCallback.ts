import { FormField, FormType } from '../../types/formtypes';

export const handleCallback = (field: FormField, event: any) => {
	const fieldValue = {
		[FormType.Custom]: () => event,
		[FormType.Input]: () => event.target.value,
		[FormType.TextArea]: () => event.target.value,
		[FormType.Checkbox]: () => event.value,
		[FormType.DropDown]: () => event.value,
		[FormType.CheckboxList]: () => event,
		[FormType.RadioButtonList]: () => event.value,
		[FormType.DateTime]: () => event
	};

	field.value = fieldValue[field.type]();
	field.isDirty = true;
	field = refreshField(field);

	return field;
};

const refreshField = (field: FormField) => {
	field.properties = {
		...field.properties,
		invalidMessage: ''
	};

	return field;
};
