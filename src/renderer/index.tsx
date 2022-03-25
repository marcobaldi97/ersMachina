import DataStore from 'core/DataStore';
import { render } from 'react-dom';
import App from './App';

declare global {
  interface Window {
    electron: {
      store: {
        getDataStoreInstance: () => typeof DataStore;
      };
    };
  }
}

render(<App />, document.getElementById('root'));
