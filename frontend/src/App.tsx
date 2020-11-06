import React from 'react';
import {GameContainer} from './components/GameContainer/GameContainer'

import styles from './App.module.css'

function App() {
  return (
    <div className={styles.app}>
      <GameContainer />
    </div>
  )
}

export default App;
