import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import FormInput, {FormInputProps} from '../components/input';
import { FormType } from '../types/formtypes';

const Template: Story<FormInputProps> = (args) => <FormInput {...args} />;

export const basic = Template.bind({});
basic.args = {
  field: {
    title: 'Input',
	  accessor: 'input',
    type: FormType.Input
  }
};

export default {
  title: 'Fields/Input',
  component: FormInput,
  argTypes: { field: { callback: { action: 'update' } } }
} as Meta;