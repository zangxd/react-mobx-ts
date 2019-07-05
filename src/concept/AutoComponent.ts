import * as React from 'react';
import * as mobx from 'mobx';

export interface AutoComponentProps<S> {
  getState: <P, S>(componentClass: React.ComponentClass<P, S>, props: P) => S;
}

export abstract class AutoComponent<P, S> extends React.Component<P & AutoComponentProps<S>, S> {
  private disposeAutoRun: mobx.IReactionDisposer | null = null;

  StateType?: S; // to allow reference S via Component['StateType']

  constructor(props: P & AutoComponentProps<S>) {
    super(props);
    const thisClass = this.constructor as React.ComponentClass<P, S>;
    this.state = props.getState(thisClass, props);
  }

  componentDidMount() {
    const thisClass = this.constructor as React.ComponentClass<P, S>;
    const thisProps = this.props as any;
    this.disposeAutoRun = mobx.autorun(() => {
      this.setState(thisProps.getState(thisClass, this.props));
    });
  }

  componentWillUnmount() {
    if (this.disposeAutoRun) {
      this.disposeAutoRun();
    }
  }
}
