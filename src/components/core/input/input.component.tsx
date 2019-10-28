import React, {ReactNode, FormEvent, PureComponent} from 'react';
import classNames from 'classnames';
import {INPUT_CSS_CLASSES, INPUT_TYPES} from "./constants";
import "./styles.scss";

type Props = {
    width: number | 'auto',
    type: string,
    name: string,
    value: string,
    placeholder: string,
    cssClass: string,
    prependedEl?: ReactNode,
    appendedEl?: ReactNode,
    onChange: (value: string, name: string) => void,
    onBlur?: (value: string, name: string) => void
};

export class InputComponent extends PureComponent<Props> {
    static defaultProps = {
        value: '',
        cssClass: '',
        type: INPUT_TYPES.text,
        placeholder: ''
    };

    onChange = (e: FormEvent<HTMLInputElement>) => {
        const {onChange, name} = this.props;
        onChange(e.currentTarget.value, name);
    };

    onBlur = (e: FormEvent<HTMLInputElement>) => {
        const {onBlur, name} = this.props;
        if (onBlur) {
            this.props.onChange(e.currentTarget.value, name);
        }
    };

    render() {
        const {cssClass, name, placeholder, prependedEl, appendedEl, type, width} = this.props;
        return (
            <div
                className={classNames(INPUT_CSS_CLASSES.input, cssClass)}
                style={{maxWidth: width}}>

                {prependedEl && (
                    <div className={INPUT_CSS_CLASSES.inputPrependedElement}>{prependedEl}</div>
                )}

                <input
                    className={INPUT_CSS_CLASSES.inputField}
                    type={type}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    name={name}
                    placeholder={placeholder}
                />

                {appendedEl && (
                    <div className={INPUT_CSS_CLASSES.inputAppendedElement}>
                        {appendedEl}
                    </div>
                )}
            </div>
        );
    }
}
