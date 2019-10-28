import React, {FormEvent, PureComponent, ReactNode} from 'react';
import classNames from 'classnames';
import './styles.scss';

type Props = {
    type: string,
    caption?: ReactNode,
    handler: (e: FormEvent<HTMLButtonElement>) => void,
    disabled: boolean
};

const BTN_CSS_CLASSES = {
    btn: 'btn',
    default: 'btn_default',
    primary: 'btn_primary'
};

export const BTN_TYPES = {
    default: 'default',
    primary: 'primary'
};

export class Button extends PureComponent<Props> {
    static defaultProps = {
        type: BTN_TYPES.default,
        disabled: false
    };

    render() {
        const {type, caption, handler, disabled} = this.props;

        const btnClasses = classNames(BTN_CSS_CLASSES.btn, {
            [BTN_CSS_CLASSES.default]: type === BTN_TYPES.default,
            [BTN_CSS_CLASSES.primary]: type === BTN_TYPES.primary
        });

        return (
            <button className={btnClasses}
                    onClick={handler}
                    disabled={disabled}>
                {caption ? caption : null}
            </button>
        );
    }
}
