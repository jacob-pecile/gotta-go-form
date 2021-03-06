import * as React from 'react';
import styled from 'styled-components';
import { FormField } from '../types/formtypes';
import ErrorMessage from './metaForm/errorMessage';

interface FormTextAreaProps {
	field: FormField;
	className?: string;
}

const FormTextArea = (props: FormTextAreaProps) => {
	let { field, className } = props;

	let inputProps = field.properties ? field.properties.inputProps : null;

	return (
		<div className={`form-textarea-container ${className}`}>
			<span>{field.title}</span>
			<textarea
				onChange={field.callback}
				value={field.value === null ? '' : field.value}
				{...inputProps}
			/>
			{field.properties && field.properties.invalidMessage && (
				<ErrorMessage message={field.properties.invalidMessage} />
			)}
		</div>
	);
};

export default styled(FormTextArea)`
	display: flex;
	flex-direction: column;

	& > span {
		font-size: 14px;
		
		font-weight: 600;
	}

	& > textarea {
		margin-top: 4px;
		padding: 8px;
		border-radius: 3px;
		border: 1px solid #1f1f1f;
	}
`;
