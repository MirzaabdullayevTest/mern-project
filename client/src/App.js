import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes'
import 'materialize-css'
import useAuth from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { Navbar } from './components/Navbar'

function App() {
  const { login, token, userId, logout } = useAuth()  // token 
  const isAuthenticated = !!token  /// true
  const routes = useRoutes(isAuthenticated)

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <Router>
      {isAuthenticated ? <Navbar /> : null}
        <div className='container'>
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
