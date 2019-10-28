import React, {ChangeEvent, Component} from 'react';
import classNames from 'classnames';
import './styles.scss';

type Props = {
    cssClass: string
    id: string,
    onChange: (id: string, checked: boolean) => void,
    checked: boolean,
    disabled: boolean,
    label: string,
    buttonLabel: boolean,
    inline: boolean
};

type State = {
  checked: boolean
};

const CSS_CLASSES = {
    wrap: 'checkbox-wrap',
    inline: 'checkbox-wrap_inline',
    checkbox: 'checkbox',
    checked: 'checkbox_checked',
    label: 'checkbox__label',
    labelBtn: 'checkbox_button',
    input: 'checkbox__input',
    checkmark: 'checkbox__checkmark'
};

export class Checkbox extends Component<Props, State> {
    static defaultProps = {
        disabled: false,
        checked: false,
        cssClass: '',
        inline: false,
        buttonLabel: false,
        label: ''
    };

    state = {
      checked: this.props.checked
    };

    onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.currentTarget;
        const checked = !this.state.checked;

        this.setState(state => ({checked}));
        this.props.onChange(target.id, checked);
    };

    render() {
        const {cssClass, label, inline, buttonLabel, id} = this.props;
        const {checked} = this.state;
        return (
            <div className={classNames(CSS_CLASSES.wrap, {
                [CSS_CLASSES.inline]: inline,
                [cssClass]: cssClass
            })}>
                <label className={
                    classNames(CSS_CLASSES.checkbox, {
                        [CSS_CLASSES.checked]: checked,
                        [CSS_CLASSES.labelBtn]: buttonLabel
                    })
                }>
                    <input
                        id={id}
                        type="checkbox"
                        onChange={this.onChange}
                        className={CSS_CLASSES.input} />

                    <span className={CSS_CLASSES.checkmark}/>

                    {label && (
                        <span className={CSS_CLASSES.label}>{label}</span>
                    )}
                </label>
            </div>
        );
    }
}