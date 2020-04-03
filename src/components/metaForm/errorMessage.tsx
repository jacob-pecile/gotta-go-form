import * as React from 'react';
import styled from 'styled-components';

interface ErrorMessageProps {
    message: string;
    className?: string;
}

const ErrorMessage = (props: ErrorMessageProps) => (
    <span className={`${props.className} error-message`}>{props.message}</span>
);

export default styled(ErrorMessage)`
    color: #ff1917;
    font-size: 12px;
`;