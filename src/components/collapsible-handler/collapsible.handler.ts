import {Component, ReactNode} from 'react';


type ChildrenProps = {
    isOpen: boolean,
    handler: () => void,
};

type Props = {
    children: (props: ChildrenProps) => ReactNode
}

type State = {
    isOpen: boolean
};

export class CollapsibleHandler extends Component<Props, State> {
    state = {
        isOpen: false
    };

    handler = () => {
        this.setState(state => ({isOpen: !state.isOpen}))
    };

    render() {
        const {isOpen} = this.state;

        return this.props.children({
            handler: this.handler,
            isOpen
        });
    }
}