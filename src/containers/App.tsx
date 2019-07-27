import React from 'react';
import '../styles//App.css';

import Main from '../components/Main';
import NavBar from '../components/NavBar';

import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { reverseLogo } from '../actions/reverseLogo';

interface IProps {
  cssClass: string,
  reverseLogo(): any
}

const App: React.FC<IProps> = ({ cssClass, reverseLogo }) => {
  return (
    <div className="App">
      <NavBar />
      <Main />
  </div>
  )
}

const mapStateToProps = ({ cssClass }: { cssClass: string }) => {

  return { cssClass }
}

const mapDispatchToProps = (dispatch: Dispatch) => {

  return { reverseLogo: () => dispatch(reverseLogo()) }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);