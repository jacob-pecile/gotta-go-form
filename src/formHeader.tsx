import * as React from 'react';
import styled from 'styled-components';

interface FormHeaderProps {
    title: string;
    className?: string;
}

const FormHeader = (props: FormHeaderProps) => {

    if (!props.title) {
        return null;
    }

    return (
        <div className={`form-header ${props.className}`}>
            <span>{props.title}</span>
        </div>
    );
};

export default styled(FormHeader)`
    display: flex;
    width: calc(100% - 16px);
    justify-content: flex-start;
    border-bottom: 1px solid #1f1f1f;
    margin: 0px 8px 8px 8px;

    & > span{
        font-weight: 600;
        font-size: 24px;
    }

`;