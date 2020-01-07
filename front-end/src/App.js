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
      {/* <Button intent="primary" text="Button on content"/> 
      <Popover content={<Menu>...</Menu>} position={Position.LEFT_BOTTOM}>
        <Button icon="share" text="Open in..." />
      </Popover>

      <Button intent={Intent.PRIMARY} text="Primary" />
      <Button intent={Intent.WARNING} text="Warn" />
      <Button intent={Intent.DANGER} text="Danger" /> */}
      {/* <KeyCombo combo="mod" minimal /> */}
      {/* <Intent /> */}
      {/* <Spinner/> */}
    </div>
  );
}

export default App;
