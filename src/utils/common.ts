import {ForwardedRef} from 'react';

function mergeRefs<T>(...ref: ForwardedRef<T>[]) {
  return (node: T) => {
    ref.forEach(ref => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    });
  };
}

export {mergeRefs};
