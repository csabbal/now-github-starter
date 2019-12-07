import App from "next/app";
import React from "react";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import { changeLocation } from "../app/states/reducers/navigation";
import { start } from "../app/states/reducers/runTime";
import createStore from "../store";

import "../components/styles/general.scss";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store, router } = this.props;

    store.dispatch(
      changeLocation({
        location: { pathname: router.pathname, query: router.query }
      })
    );

    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}

export default withRedux(createStore)(withReduxSaga(MyApp));
