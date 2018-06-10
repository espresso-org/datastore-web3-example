import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { loadFileIcons } from './utils/files'

loadFileIcons()

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
