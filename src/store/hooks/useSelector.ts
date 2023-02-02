import { useSelector as useReduxSelector, type TypedUseSelectorHook } from 'react-redux';

import type { State } from '../abstracts';

const useSelector: TypedUseSelectorHook<State> = useReduxSelector;

export default useSelector;
