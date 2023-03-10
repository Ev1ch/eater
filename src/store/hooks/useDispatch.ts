import { useDispatch as useReduxDispatch } from 'react-redux';

import type { Dispatch } from '../abstracts';

const useDispatch = () => useReduxDispatch<Dispatch>();

export default useDispatch;
