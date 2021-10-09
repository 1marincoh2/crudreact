import {createStore} from "redux";
import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction';
import reducer from "./reducers";

const initialState={

    todos:[
        {
            id:0,
            name:'hacer la tarea',
            complete:false,
        },
        {
            id:1,
            name:'hacer la tarea',
            complete:true,
        },

    ]

}



export const store = createStore(
     reducer,
    initialState,
    // @ts-ignore
  devToolsEnhancer(
    // options like actionSanitizer, stateSanitizer
))
