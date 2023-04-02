import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/Game';
import './styles/index.scss';
import { EnvironmentVars } from './types';

ReactDOM.render(<Game />, document.getElementById('app'));

(async (): Promise<void> => {
  const envs: EnvironmentVars = await fetch('/environment').then((resp) => resp.json());

  if (envs.environment === 'dev') {
    new EventSource('/esbuild').addEventListener('change', () => window.location.reload());
  }
})();
