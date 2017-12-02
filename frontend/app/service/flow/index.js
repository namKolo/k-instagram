// @flow
import type { HOC } from 'recompose';

// eslint-disable-next-line
type HOCBase_<A, B, C: HOC<A, B>> = A;
export type HOCBase<C> = HOCBase_<*, *, C>;
