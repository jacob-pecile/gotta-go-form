import { FormField } from '../../types/formtypes';

export const handleVisibility = (field: FormField, allFields: FormField[]) => {
	if (!field.visibility) {
		return field;
	}

	let dependentValues = allFields
		.filter(
			allField => field.visibility.accessors.indexOf(allField.accessor) >= 0
		)
		.sort((a, b) => {
			let { accessors } = field.visibility;

			return accessors.indexOf(a.accessor) - accessors.indexOf(b.accessor);
		})
		.map(a => a.value);

	field.visibility.isVisible = field.visibility.condition(...dependentValues);

	return field;
};

export const updateDependentFieldVisibility = (
	updatedFieldAccessor: string,
	allFields: FormField[]
) => {
	allFields
		.filter(
			f =>
				f.visibility &&
				f.visibility.accessors.indexOf(updatedFieldAccessor) >= 0
		)
		.forEach((visibilityDepenedentField: FormField) => {
			handleVisibility(visibilityDepenedentField, allFields);
		});
};
