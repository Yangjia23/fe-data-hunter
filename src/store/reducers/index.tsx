import { combineReducers, ReducersMapObject, Reducer } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from '../history';
import desktop from './desktop';
import profile from './profile';


let reducers: ReducersMapObject = {
    router: connectRouter(history),
    desktop,
    profile
};

type CombinedState = {
    [key in keyof typeof reducers]: ReturnType<typeof reducers[key]>
}
let reducer: Reducer<CombinedState> = combineReducers<CombinedState>(reducers);

export { CombinedState }
export default reducer;