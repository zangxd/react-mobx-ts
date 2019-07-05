export class StateProviders {
  stateProviders = new Map<Function, (props: any) => any>();

  bind<P, S>(componentClass: React.ComponentClass<P, S>, stateProvider: (props: P) => S) {
    this.stateProviders.set(componentClass, stateProvider);
  }

  getState<P, S>(componentClass: React.ComponentClass<P, S>, props: P): S {
    const stateProvider = this.stateProviders.get(componentClass);
    if (!stateProvider) {
      throw new Error(`did not bindState for class ${componentClass.name}`);
    }
    return stateProvider(props);
  }

  get props() {
    return { getState: this.getState.bind(this) };
  }
}
