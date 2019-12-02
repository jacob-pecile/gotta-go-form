import { useState, useEffect } from 'react';

import { handleCallback } from './handlers/handleCallback';
import { HandleFormValidation } from './handlers/handleValidation';
import {
	handleVisibility,
	updateDependentFieldVisibility
} from './handlers/handleVisablitity';
import { handleObserver, updateObservers } from './handlers/handleObservers';

import { FormDefinition, FormIndex } from '../types/formtypes';
import { FooterAction } from '../types/eventtypes';
import { flatten } from 'lodash';

export const useForm = (
	form: FormDefinition,
	footerActions: FooterAction[]
) => {
	const [definition, setDefinition] = useState(form);

	let allFields = flatten(definition.sections.map(section => section.fields));

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

		callback(event);
	};

	const updateCurrentSection = (sectionNumber: number) => () => {
		let element = document.getElementById(`form-section-${sectionNumber}`);
		element.scrollIntoView();
	};

	const ValidateForm = (submitCallback: () => void = null) => () => {
		let validatedForm = HandleFormValidation(definition);
		let isValid =
			flatten(validatedForm.sections.map(section => section.fields)).filter(
				field => field.properties && field.properties.InvalidMessage
			).length === 0;
		setDefinition({ ...validatedForm });

		if (isValid) {
			submitCallback();
		}
	};

	footerActions = footerActions.map(action =>
		action.validate
			? {
					...action,
					onClick: ValidateForm(action.onClick)
			  }
			: action
	);

	return {
		definition,
		updateCurrentSection,
		ValidateForm,
		formfooterActions: footerActions
	};
};
