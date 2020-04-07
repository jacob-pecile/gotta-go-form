import { useState, useEffect } from 'react';

import { handleCallback } from './handlers/handleCallback';
import { HandleFormValidation } from './handlers/handleValidation';
import {
	handleVisibility,
	updateDependentFieldVisibility
} from './handlers/handleVisablitity';
import { handleObserver, updateObservers } from './handlers/handleObservers';

import { FormDefinition, FormIndex } from '../types/formtypes';
import { FooterAction, WrappedFooterAction } from '../types/eventtypes';
import { flatten } from 'lodash';

export const useForm = (
	form: FormDefinition,
	footerActions: FooterAction[]
): {
	definition: FormDefinition,
	moveToSection: (sectionNumber: number) => () => void,
	formfooterActions: WrappedFooterAction[]
} => {
	const [definition, setDefinition] = useState(form);

	let allFields = flatten(definition.sections.map(section => section.fields));

	const createFormObject = () => {
		let formObject = {};
		allFields.forEach(field => {
			formObject[field.accessor] = field.value;
		});
		return formObject;
	};

	useEffect(() => {
		definition.sections.forEach((section, sectionIndex) =>
			section.fields.forEach((field, fieldIndex) => {
				field.callback = onCallback(
					{ sectionIndex, fieldIndex },
					field.callback
				);
				field.isDirty = false;

				handleVisibility(field, allFields);
				field = handleObserver(field, allFields);
			})
		);
		setDefinition({ ...definition });
	}, []);

	const onCallback = (index: FormIndex, callback: (event: any) => void) => (
		event: any
	) => {
		let field =
			definition.sections[index.sectionIndex].fields[index.fieldIndex];

		field = handleCallback(field, event);
		updateDependentFieldVisibility(field.accessor, allFields);
		updateObservers(field.accessor, allFields);

		setDefinition({ ...definition });

		if (callback) {
			callback(event);
		}
	};

	const moveToSection = (sectionNumber: number) => () => {
		let element = document.getElementById(`form-section-${sectionNumber}`);
		element.scrollIntoView();
	};

	const ValidateForm = (submitCallback: (result: any) => void = null) => () => {
		let validatedForm = HandleFormValidation(definition);
		let isValid =
			flatten(validatedForm.sections.map(section => section.fields)).filter(
				field => field.properties && field.properties.invalidMessage
			).length === 0;
		setDefinition({ ...validatedForm });

		if (isValid) {
			submitCallback(createFormObject());
		}
	};

	let formfooterActions = footerActions.map(action => ({
		...action,
		onClick: action.validate ? ValidateForm(action.onClick) : () => action.onClick(createFormObject())
	}));

	return {
		definition,
		moveToSection,
		formfooterActions
	};
};
