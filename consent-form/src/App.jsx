import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import './i18n';

import Home from './pages/Home';
import Consents from "./pages/Consents";
import './index.css'
import {AppContextProvider} from "./context/AppContext.jsx";

function App() {

  return (

      <AppContextProvider>
          <Router>
              <nav className="bg-white shadow">
                  <div className="mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="flex items-center justify-between h-16">
                          <div className="flex-shrink-0">
                              <img className="h-8 w-8" src="./public/vite.svg" alt="Logo" />
                          </div>
                          <div className="hidden md:block">
                              <div className="ml-10 flex items-baseline">
                                  <Link to="/" className="nav-link px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                                  <Link to="/consents" className="nav-link px-3 py-2 rounded-md text-sm font-medium">Consents</Link>
                              </div>
                          </div>
                      </div>
                  </div>
              </nav>

              <Routes>
                  <Route exact path="/" element={<Home/>} />
                  <Route path="/consents" element={<Consents/>} />
              </Routes>
          </Router>
      </AppContextProvider>
  )
}

export default App
