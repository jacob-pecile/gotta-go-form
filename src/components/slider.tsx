import * as React from 'react';
import styled, { css } from 'styled-components';
import { FormField } from '../types/formtypes';
import ErrorMessage from './metaForm/errorMessage';

interface FormSliderProps {
    field: FormField;
    className?: string;
}

const defaultProperties = {
    min: 0,
    max: 10,
    step: 1
};

const FormSlider = (props: FormSliderProps) => {
    let { field, className } = props;

    let properties = { ...defaultProperties, ...field.properties };
    let isRange = !!properties.isRange;
    const defaultValue = isRange ? [properties.min, properties.max] : properties.min;

    let value = field.value || defaultValue;

    let tooltipPush = (v) => (v - properties.min) / (properties.max - properties.min);

    let rangeCallback = (index: number) => (event => {
        let currentvalue = [...value];
        currentvalue[index] = parseInt(event.target.value);
        if (currentvalue[0] === currentvalue[1]) {
            return;
        }
        if (currentvalue[0] > currentvalue[1]) {
            currentvalue.reverse();
        }
        field.callback({ target: { value: currentvalue } });
    });

    let onChange = isRange ? rangeCallback(0) : field.callback;

    return (
        <div className={`${className} form-slider`} data-testid="form-slider-container">
            <span>{field.title}</span>
            <div className="slider-container">
                <div className="slider-endpoints">
                    <span>{properties.min}</span>
                    {isRange && <div className="range-value" data-testid="range-value">
                        {value[0]} - {value[1]}
                    </div>}
                    <span>{properties.max}</span>
                </div>
                <input
                    data-testid="form-slider"
                    value={isRange ? value[0] : value}
                    onChange={onChange}
                    type="range"
                    min={properties.min}
                    max={properties.max}
                    step={properties.step} />
                {field.properties && field.properties.isRange &&
                    <input
                        data-testid="form-range-slider"
                        value={value[1]}
                        onChange={rangeCallback(1)}
                        type="range"
                        min={properties.min}
                        max={properties.max}
                        step={properties.step} />
                }
                {!isRange &&
                    <span className="slider-title" style={{ left: `calc(${tooltipPush(value) * 100}% - ${36 * tooltipPush(value)}px)` }}>
                        {value}
                    </span>
                }
            </div>
            {isRange && (
                <ErrorMessage message={field.properties.invalidMessage} />
            )}
        </div>
    );
};

const trackHeight = '4px';
const thumbWidth = '20px';

const trackColour = '#e5e5e5';

const track = css`
  box-sizing: border-box;
  border: none;
  height: 4px;
  background: ${trackColour};
  border-radius: 8px;
  position: relative;
`;

const fill = css`
  height: ${trackHeight};
  border-radius: 4px;
`;

const thumb = css`
  box-sizing: border-box;
  border: none;
  width: ${thumbWidth};
  height: ${thumbWidth};
  border-radius: 50%;
  background: #4e7ea1;
  box-shadow: 0px 0px 5px rgba(66, 97, 255, 0.5);
  position: relative;
  z-index: 1;
`;

export default styled(FormSlider)`
    display: flex;
    flex-direction: column;

    & > span:not(.error-message) {
        font-size: 14px;
        font-weight: 600;
    }

    & > .slider-container{
        position: relative;
        display: flex;
        flex-direction: column;
        padding-left: 8px;
        padding-bottom: ${props => props.field.properties && props.field.properties.isRange ? '20px' : '0'};

        & > .slider-endpoints{
            height: 36px;
            display: flex;
            width: 100%;
            justify-content: space-between;
            align-items: flex-end;
             & > span{
                 margin-right:8px;
             }
        }

        & > .slider-title{
            display: none;
            position: absolute;
            top: 0;
            background-color: #6c6c6c;
            color: white;
            border-radius: 3px;
            padding: 4px;
            min-width: 12px;
            width: 28px;
            max-height: 20px;
            justify-content: center;

            &::after{
                content: ' ';
                width: 0;
                height: 0;
                border-top: 8px solid #6c6c6c;
                border-left: 8px solid transparent;
                border-right: 8px solid transparent;
                bottom: -8px;
                position: absolute;
                left: calc(50% - 8px);
            }
        }

        

        & input{
            position: ${props => props.field.properties && props.field.properties.isRange ? 'absolute' : 'static'};
            bottom: 0;
            
            margin-top: 20px;
            cursor: pointer;
            width: calc(100% - 8px);

            &:hover + .slider-title{
                display: flex;
            }

            
            -webkit-appearance: none;
            &::-webkit-slider-thumb {
                -webkit-appearance: none;
            }

            &:focus {
                outline: none;
            }

            &:focus::-webkit-slider-thumb {
                outline: -webkit-focus-ring-color auto 5px;
            }

            &:focus::-moz-range-thumb {
                outline: -webkit-focus-ring-color auto 5px;
            }

            &:focus::-ms-thumb {
                outline: -webkit-focus-ring-color auto 5px;
            }

            margin: 0;
            padding: 0;
            height: ${thumbWidth};
            background: transparent;
            font: 1em/1 arial, sans-serif;

            &::-webkit-slider-runnable-track {
                ${track};
                height: 6px;
            }

            &::-moz-range-track {
                ${track};
            }

            &::-ms-track {
                ${track};
            }

            &::-moz-range-progress {
                ${fill};
            }

            &::-ms-fill-lower {
                ${fill};
            }

            &::-webkit-slider-thumb {
                margin-top: calc(0.5 * (${trackHeight} - ${thumbWidth}));
                ${thumb};
            }

            &::-moz-range-thumb {
                ${thumb};
            }

            &::-ms-thumb {
                margin-top: 0;
                ${thumb};
            }

            &::-ms-tooltip {
                display: none;
            }

            &::-moz-focus-outer {
                border: 0;
            }
        }
    }

`;