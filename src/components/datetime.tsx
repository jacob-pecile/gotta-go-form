import * as React from 'react';
import styled from 'styled-components';
import { FormField } from '../types/formtypes';
import ErrorMessage from './metaForm/errorMessage';

import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';

interface FormDateTimeProps {
	field: FormField;
	className?: string;
}

const FormDateTime = (props: FormDateTimeProps) => {
	let { field } = props;


	return (
		<div className={`form-datetime ${props.className}`}>
			<span>{field.title}</span>
			<DateTimePicker
				onChange={field.callback}
				value={field.value}
				{...field.properties}
			/>
			{field.properties && field.properties.invalidMessage && (
				<ErrorMessage message={field.properties.invalidMessage} />
			)}
		</div>
	);
};

export default styled(FormDateTime)`
	display: flex;
	flex-direction: column;

	& > span {
		font-size: 14px;
		
		font-weight: 600;
	}

	& > .react-datetime-picker {
		display: inline-flex;
		position: relative;
		& > .react-datetime-picker__wrapper {
			padding: 3px;
			border-radius: 3px;
			border: 1px solid #1f1f1f;
			display: flex;
			flex: 1;
			justify-content: space-around;

			& > button {
				background: #fff;
				border: none;
				cursor: pointer;
			}

			& > .react-datetime-picker__inputGroup {
				width: 90%;

				& > input[type='number']::-webkit-inner-spin-button,
				input[type='number']::-webkit-outer-spin-button {
					-webkit-appearance: none;
					margin: 0;
				}

				& > .react-datetime-picker__inputGroup__input {
					min-width: 0.54em;
					height: calc(100% - 2px);
					position: relative;
					border: 0;
					background: none;
					font: inherit;
					box-sizing: content-box;
				}

				& > .react-datetime-picker__inputGroup__divider {
					padding: 1px 0;
					white-space: pre;
				}
			}
		}

		& > div > .react-datetime-picker__calendar {
			width: 350px;
			max-width: 100vw;
			position: absolute;
			z-index: 100;

			&.react-datetime-picker__calendar--closed {
				display: none;
			}

			& > .react-calendar {
				border-width: thin;
				width: 350px;
				max-width: 100%;
				background: white;
				border: 1px solid #a0a096;
				font-family: Arial, Helvetica, sans-serif;
				line-height: 1.125em;
				z-index: 1;

				& > .react-calendar__navigation {
					height: 44px;
					& > button {
						min-width: 44px;
						background: none;
						border: none;
						cursor: pointer;
					}
				}

				& > .react-calendar__viewContainer {
					& .react-calendar__tile {
						max-width: 100%;
						text-align: center;
						padding: 0.75em 0.5em;
						background: none;
						margin: 0;
						border: 0;
						outline: none;
						cursor: pointer;
					}

					& .react-calendar__month-view__weekdays__weekday {
						display: flex;
						justify-content: center;
					}

					& .react-calendar__month-view__days {
						& > button.react-calendar__month-view__days__day {
							&:hover {
								background-color: #e6e6e6;
							}

							&.react-calendar__tile--active {
								background: #006edc;
								color: white;
							}
						}
					}
				}
			}
		}

		& > div > .react-datetime-picker__clock {
			display: none;
			position: absolute;
		}
	}
`;
