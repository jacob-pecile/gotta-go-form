import * as React from 'react';
import styled from 'styled-components';

interface NavBarProps {
    sections: string[];
    onSectionClick: (sectionIndex: number) => () => void;
    className?: string;
}

const NavBar = (props: NavBarProps) => {

    let sections = props.sections.map((section, index) => (
        <div key={index} className="section-step" onClick={props.onSectionClick(index)}>
            <span>{section}</span>
        </div>
    ));

    return (
        <div className={props.className}>
            {sections}
        </div>
    );
}

export default styled(NavBar)`
    display: flex;
    flex-direction: column;
    width: 230px;
    background-color: #E5E5E5;
    border-right: solid 1px #d8d8d8;
    height: 100%;

    & > .section-step{
        height: 32px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 16px;
        user-select: none;

        & > span{
            font-weight: 600;
            font-size: 16px;
            font-family: 'Open Sans', sans-serif
        }

        &:hover{
            background-color: #d8d8d8;
            cursor: pointer;
        }
    }
`