import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import authReducer from "../../modules/auth/components/reducer";

const createRootReducer = (history: any) => combineReducers({
    //app: appReducer,
    auth: authReducer,

    router: connectRouter(history)
});

export default createRootReducer;
