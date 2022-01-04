import React from 'react'

import GlobalStyle from './styles/global'
import SignIn from '../src/pages/SignIn'
import SignUp from '../src/pages/SignUp'

import {AuthProvider} from './hooks/AuthContext';

const App: React.FC = () => (
  <>
    <AuthProvider>
    <SignIn />
    </AuthProvider>
    
    <GlobalStyle />
  </>
)

export default App;
