import { FormField } from '../../types/formtypes';

export const handleObserver = (field: FormField, allFields: FormField[]) => {
	if (!field.observer) {
		return field;
	}

	let observables = allFields
		.filter(
			allField => field.observer.observables.indexOf(allField.accessor) >= 0
		)
		.sort((a, b) => {
			let { observables } = field.observer;

			return observables.indexOf(a.accessor) - observables.indexOf(b.accessor);
		});

	return field.observer.observerFunction(field, ...observables);
};

export const updateObservers = (
	observableAccessor: string,
	allFields: FormField[]
) => {
	allFields
		.filter(
			f => f.observer && f.observer.observables.indexOf(observableAccessor) >= 0
		)
		.forEach((observer: FormField) => {
			observer = handleObserver(observer, allFields);
		});
};
