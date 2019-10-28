import React, {Component, createRef, ReactNode, RefObject} from 'react';
import classNames from 'classnames';
import './styles.scss';

type Props = {
    cssClass: string,
    children: ReactNode,
    title: ReactNode,
    isOpen: boolean,
    handler: () => void
};

type State = {
    maxHeight: number
};

const CSS_CLASSES = {
    wrapper: 'accordion',
    header: 'accordion__header',
    body: 'accordion__body',
    content: 'accordion__content'
};

export class Accordion extends Component<Props, State> {
    contentRef: RefObject<HTMLDivElement> = createRef();

    state = {
        maxHeight: 0
    };

    static defaultProps = {
        cssClass: '',
        isOpen: false
    };

    componentDidUpdate({isOpen}: Props) {
        if (this.contentRef.current && isOpen !== this.props.isOpen) {
            const target = this.contentRef.current;

            this.setState(state => ({
                maxHeight: state.maxHeight ? 0 : target.scrollHeight
            }));
        }
    }

    toggleAccordion = () => {
        this.props.handler();
    };

    render() {
        const {title, children, cssClass} = this.props;
        const {maxHeight} = this.state;
        const bodyStyles = {maxHeight};

        return (
            <div className={classNames(CSS_CLASSES.wrapper, {[cssClass]: cssClass})}>
                <header className={CSS_CLASSES.header} onClick={this.toggleAccordion}>
                    {title}
                </header>

                <div className={CSS_CLASSES.body} style={bodyStyles} ref={this.contentRef}>
                    <div className={CSS_CLASSES.content}>
                        {children}
                    </div>
                </div>
            </div>
        )
    }
}
