import React from "react";
import ReactDOM from "react-dom";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import rootReducer from '../reducers';
import QuestionContainer from "./QuestionContainer";
import * as actions from "../actions";

const App = () => <QuestionContainer />;

const wrapper = document.getElementById("app");
const store = createStore(rootReducer, applyMiddleware(thunk));

store
    .dispatch(actions.fetchQuestions())
    .then(() => ReactDOM.render(<Provider store={ store }><App /></Provider>, wrapper))
