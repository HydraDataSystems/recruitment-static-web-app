import { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { StateMachineProvider, createStore } from 'little-state-machine';

import { defaultState } from './constants';

createStore(defaultState);

const AllTheProviders = ({ children } : PropsWithChildren) => {
  
  return (
    <StateMachineProvider>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </StateMachineProvider>
  )
};

const customRender = (ui: any, options = {}) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };