import { legacy_createStore as createstore } from "redux";
import reducerFunction from "./redux";

const store = createstore(reducerFunction);

export default store;
