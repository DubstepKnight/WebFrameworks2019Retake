import React from 'react';
import { Button, Intent, Spinner, Popover, Menu, Position, KeyCombo } from "@blueprintjs/core";
// import { BrowserRouter as Router } from "react-router-dom";
import Housing from './containers/Housing';
import { observer, inject } from "mobx-react";
import './App.css';
// import './NewColors.scss';

function App() {
  return (
    <div className="App">
      <Housing />
    </div>
  );
}

export default inject("RootState")(observer(App));
