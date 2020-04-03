import * as React from 'react';
import { useForm } from './hooks/useForm';
import { FormDefinition } from './types/formtypes';
import { FooterAction } from './types/eventtypes';
import FormSection from './formsection';
import NavBar from './components/navigation/navbar';
import FormFooter from './formfooter';
import FormHeader from './formHeader';

import styled from 'styled-components';

interface FormProps {
	formDefinition: FormDefinition;
	className?: string;
	footerActions: FooterAction[];
	showNavbar?: boolean;
	Header?: () => JSX.Element;
}

export const Form = (props: FormProps) => {
	let { formDefinition, className, footerActions, showNavbar, Header } = props;
	let { definition, moveToSection, formfooterActions } = useForm(
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
		<div className={`${className} form-container`}>
			<div className="main-form-window" data-testid="main-form-content">
				{showNavbar && (
					<NavBar sections={titles} onSectionClick={moveToSection} />
				)}
				<div className="main-form-container" data-testid="main-form-container">
					{Header ? <Header /> : <FormHeader title={formDefinition.title} />}
					<div className="section-container" data-testid="section-container">{sections}</div>
				</div>
			</div>
			<div className="form-footer">
				<FormFooter actions={formfooterActions} />
			</div>
		</div >
	);
};

export default styled(Form)`
	display: flex;
	flex-direction: column;
	height: 100%;
	font-family: 'Open Sans', Arial, sans-serif;

	& > .main-form-window {
		display: flex;
		height: calc(100% - 52px);

		& > .main-form-container{
			display: flex;
			flex-direction: column;
			flex: 1;
			height: 100%;

			& > .section-container {
				display: flex;
				flex: 1
			}
		}


	}
`;
