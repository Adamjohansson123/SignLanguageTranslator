import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import StartPage from './components/StartUpPage'
import TranslationPage from './components/TranslationPage'
import ProfilePage from './components/ProfilePage'
import './App.css'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/translation" exact>
          <TranslationPage />
        </Route>
        <Route path="/profile">
          <ProfilePage />
        </Route>
        <Route path="/">
          <StartPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
