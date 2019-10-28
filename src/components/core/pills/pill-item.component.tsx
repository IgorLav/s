import React from 'react';
import {PillData} from './pills.component';
import {noop} from "../utils";

type Handler = {
    handler: (key: string, id: string) => void
}

type Props = Handler & PillData;

export const PillItem = ({removable, handler, id, groupId, caption, disabled}: Props) => {
    const isActiveHandler = removable && !disabled;
    return (
        <div className="pill" onClick={isActiveHandler ? () => handler(groupId, id) : noop}>
            <span className="pill__name">{caption}</span>
            {isActiveHandler && (<button className="pill__remove-btn"/>)}
        </div>
    );
};

