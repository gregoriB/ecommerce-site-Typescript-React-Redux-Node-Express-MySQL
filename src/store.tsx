import { createStore } from 'redux';
import reverseLogo from './reducers/reverseLogo';

const store = createStore(reverseLogo);

export default store;