import * as React from 'react';
import { useForm } from './hooks/useForm';
import { FormDefinition } from './types/formtypes';
import { FooterAction } from './types/eventtypes';
import FormSection from './formsection';
import NavBar from './components/navigation/navbar';
import FormFooter from './formfooter';

import classNames from 'classnames';
import styled from 'styled-components';

interface FormProps {
	formDefinition: FormDefinition;
	className?: string;
	footerActions: FooterAction[];
	showNavbar: boolean;
}

export const Form = (props: FormProps) => {
	let { formDefinition, className, footerActions, showNavbar } = props;
	let { definition, updateCurrentSection, formfooterActions } = useForm(
		formDefinition,
		footerActions
	);

	let sections = definition.sections.map((section, sectionIndex) => (
		<FormSection
			key={sectionIndex}
			sectionIndex={sectionIndex}
			section={section}
		/>
	));

	let titles = formDefinition.sections.map(section => section.title);

	return (
		<div className={classNames(className, 'form-container')}>
			<div className="main-form-content">
				{showNavbar && (
					<NavBar sections={titles} onSectionClick={updateCurrentSection} />
				)}
				<div className="section-container">{sections}</div>
			</div>
			<div className="form-footer">
				<FormFooter actions={formfooterActions} />
			</div>
		</div>
	);
};

export default styled(Form)`
	display: flex;
	flex-direction: column;
	height: 100%;

	& > .main-form-content {
		display: flex;
		height: calc(100% - 52px);

		& > .section-container {
			flex: 1;
			height: 100%;
		}
	}
`;
