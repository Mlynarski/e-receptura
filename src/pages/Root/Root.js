import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import MainTemplate from '../../templates/MainTemplate';
import PageWelcome from '../PageWelcome';
import PageGenerator from '../PageGenerator';
import PageRules from '../PageRules';
import PageNotFound from '../PageNotFound';
import CookiesBar from '../../components/molecules/CookiesBar';
import GlobalStyle from '../../style';
import store from '../../store';

const Root = () => (
  <Provider store={store}>
    <Router>
      <GlobalStyle />
      <CookiesBar />
      <MainTemplate>
        <Switch>
          <Route exact path="/" component={PageWelcome} />
          <Route exact path="/generator" component={PageGenerator} />
          <Route exact path="/rules" component={PageRules} />
          <Route component={PageNotFound} />
        </Switch>
      </MainTemplate>
    </Router>
  </Provider>
);
export default Root;
