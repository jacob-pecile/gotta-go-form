import {
	FormField,
	FormType,
	FormDefinition,
	Section
} from '../../types/formtypes';
import { flatten } from 'lodash';

export const HandleFormValidation = (form: FormDefinition) => {
	form.sections = form.sections.map((section: Section) =>
		HandleSectionValidation(section, form)
	);

	return form;
};

export const HandleSectionValidation = (
	section: Section,
	form: FormDefinition
): Section => {
	let allFields = flatten(form.sections.map(section => section.fields));

	section.fields = section.fields.map((field: FormField) => {
		field.properties = {
			...field.properties,
			invalidMessage: handleValidation(field, allFields)
		};

		return field;
	});

	return section;
};

export const handleValidation = (field: FormField, allFields: FormField[]) => {
	if (field.mandatoryMessage && isFieldEmpty(field)) {
		return field.mandatoryMessage;
	}

	if (field.validation) {
		let validationRules = flatten([field.validation]);

		for (let rule of validationRules) {
			let { validate, accessors, errorMessage } = rule;
			accessors = accessors || [];

			let dependantFields = allFields
				.filter(
					(otherField: FormField) => accessors.indexOf(otherField.accessor) >= 0
				)
				.sort(
					(a, b) => accessors.indexOf(a.accessor) - accessors.indexOf(b.accessor)
				);

			if (!validate(field, ...dependantFields)) {
				rule.evaluation = false;
				return errorMessage;
			}
		}
	}

	return '';
};

const isFieldEmpty = (field: FormField) => {
	let { value } = field;

	if (value === null || value === undefined) {
		return true;
	}

	let isEmptyCalculator = {
		[FormType.Custom]: () => !value,
		[FormType.Input]: () => value === '' || value === null || value === undefined,
		[FormType.TextArea]: () => value === '' || value === null || value === undefined,
		[FormType.DropDown]: () => !value || value === 0,
		[FormType.RadioButtonList]: () => !value || value === 0,
		[FormType.DateTime]: () => !value
	};

	return !!isEmptyCalculator[field.type] && isEmptyCalculator[field.type]();
};
