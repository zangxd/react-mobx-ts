// provide field binding between state and input
type Field<S> = { [key in keyof Required<S>]: Field<Required<S>[key]> };

type Fields<S> = { [key in keyof S]: Field<Required<S>[key]> };

function getValue(state: any, path: string[]): any {
  if (path.length === 0) {
    return state;
  }

  const [firstProp, ...remaining] = path;
  if (state && state[firstProp]) {
    return getValue(state[firstProp], remaining);
  }
  return '';
}

function changeValueByCopy(
  state: Record<string, any> | undefined,
  path: string[],
  value: any,
): Record<string, any> {
  if (path.length === 0) {
    throw new Error('must provide path');
  }
  if (path.length === 1) {
    return {
      ...state,
      [path[0]]: value,
    };
  }
  const [firstProp, ...remaining] = path;
  if (!state) {
    return {
      [firstProp]: changeValueByCopy(undefined, remaining, value),
    };
  }
  return {
    ...state,
    [firstProp]: changeValueByCopy(state[firstProp], remaining, value),
  };
}

export interface HTMLElementWithValue {
  value: any;
  type?: string;
  checked?: boolean;
}

export class FieldRef {
  comp: React.Component;

  path: string[];

  constructor(comp: React.Component, path: string[]) {
    this.comp = comp;
    this.path = path;
  }

  static traps: ProxyHandler<FieldRef> = {
    get(target: FieldRef, propertyKey: string) {
      if (propertyKey === '__FIELD_REF') {
        return target;
      }
      if (propertyKey === 'value') {
        return getValue(target.comp.state, target.path);
      }
      if (propertyKey === 'onChange') {
        return (e: React.ChangeEvent<HTMLElementWithValue>) => {
          const newState = changeValueByCopy(target.comp.state, target.path, e.target.value);
          target.comp.setState(newState);
        };
      }
      return new Proxy(
        new FieldRef(target.comp, target.path.concat([propertyKey])),
        FieldRef.traps,
      );
    },
    getOwnPropertyDescriptor(target: FieldRef, propertyKey: string) {
      if (propertyKey === 'value' || propertyKey === 'onChange') {
        return Reflect.getOwnPropertyDescriptor({ value: true, onChange: true }, propertyKey);
      }
      throw new Error('unsupported');
    },
    ownKeys() {
      return ['value', 'onChange'];
    },
  };
}

class FieldsRef {
  comp: React.Component;

  constructor(comp: React.Component) {
    this.comp = comp;
  }

  static traps: ProxyHandler<FieldsRef> = {
    get(target: FieldsRef, propertyKey: string) {
      return new Proxy(new FieldRef(target.comp, [propertyKey]), FieldRef.traps);
    },
  };
}

export function fieldsOf<P, S>(comp: React.Component<P, S>): Fields<Required<S>> {
  return new Proxy(new FieldsRef(comp as any), FieldsRef.traps) as any;
}
