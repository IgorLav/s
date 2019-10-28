import React, {Component, ReactNode} from 'react';
import classNames from 'classnames';
import {PillItem} from "./pill-item.component";
import './styles.scss';

export type PillData = {
    removable: boolean,
    id: string,
    groupId: string,
    caption: string,
    disabled: boolean
}

export type Props = {
    label: ReactNode,
    data: any[],  // TODO: add correct annotation
    handler: (key: string, id: string) => void,
    emptyDataMessage: ReactNode,
    cssClass: string
}

export class Pills extends Component<Props> {
    static defaultProps = {
        data: {},
        emptyDataMessage: 'No data.',
        cssClass: ''
    };

    getPills = () => {
        const {data, handler} = this.props;

        return data.map(pillGroupData => {
            if(pillGroupData.children.length === 0) {
                return null;
            }

            return (
                <div className="pills-stripe__group" key={pillGroupData.name}>
                    <span className="pills-stripe__group-label">{pillGroupData.name}</span>
                    {
                        pillGroupData.children.map(
                            (pillData: PillData) => (
                                <PillItem key={pillData.id} handler={handler} {...pillData} />
                            )
                        )
                    }
                </div>
            );
        });
    };

    render() {
        const {label, data, emptyDataMessage, cssClass} = this.props;
        const showEmptyState = Object.keys(data).length === 0;

        return (
            <div className={classNames('pills-stripe-wrap', {[cssClass]: cssClass})}>
                <div className={classNames('pills-stripe', {[cssClass]: cssClass})}>
                    {label && (
                        <div className="pills-stripe__heading">{label}</div>
                    )}

                    {this.getPills()}

                    {showEmptyState && (
                        <div className="pills-stripe__no-data-msg">
                            {emptyDataMessage}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}