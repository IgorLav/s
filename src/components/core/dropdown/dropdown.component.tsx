import React, {Component, createRef, ReactNode, RefObject} from 'react';
import classNames from 'classnames';
import './styles.scss';


type Props = {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void,
    caption: ReactNode,
    children: ReactNode,
    cssClass: string,
};

const CSS_CLASSES = {
    wrapper: 'dropdown',
    bottom: 'dropdown_bottom',
    body: 'dropdown__body',
    handler: 'dropdown__handler',
    handlerActive: 'dropdown__handler_active'
};

export class Dropdown extends Component<Props> {
    setWrapperRef: RefObject<HTMLDivElement> = createRef();
    dropdownBodyRef: RefObject<HTMLDivElement> = createRef();

    static defaultProps = {
        cssClass: ''
    };

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        document.addEventListener('resize', this.recalculateStyles);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
        document.removeEventListener('resize', this.recalculateStyles);
    }

    componentDidUpdate() {
        this.recalculateStyles();
    }

    recalculateStyles = () => {
        if (this.props.isOpen) {
            const refElement = this.dropdownBodyRef && this.dropdownBodyRef.current;

            if (refElement) {
                refElement.style.left = '';

                window.requestAnimationFrame(() => {
                    const boundingEl = refElement.getBoundingClientRect();
                    const isOutOfRight = boundingEl.right > window.innerWidth;

                    refElement.style.left = isOutOfRight ?
                        `${window.innerWidth - boundingEl.right - 20}px` : `-10px`;
                });
            }
        }
    };

    bodyRender = () => {
        if (this.props.isOpen) {
            return (
                <div
                    className={CSS_CLASSES.body}
                    ref={this.dropdownBodyRef}>
                    {this.props.children}
                </div>
            );
        }
    };

    handleClickOutside = (event: any) => {
        const refEl = this.setWrapperRef && this.setWrapperRef.current;

        if (
            this.props.isOpen &&
            refEl && !refEl.contains(event.target)
        ) {
            this.props.onClose();
        }
    };

    render() {
        const {caption, isOpen, cssClass} = this.props;
        const classes = classNames(CSS_CLASSES.handler, {[CSS_CLASSES.handlerActive]: isOpen});

        return (
            <div
                className={classNames(
                    CSS_CLASSES.wrapper, {
                        [CSS_CLASSES.bottom]: isOpen,
                        [cssClass]: cssClass
                    }
                )}
                ref={this.setWrapperRef}>

                <a href="#"
                   className={classes}
                   onClick={this.props.onOpen}>
                    {caption}
                    <span className="arrow"/>
                </a>

                {this.bodyRender()}
            </div>
        );
    }
}