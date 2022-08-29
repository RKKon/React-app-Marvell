import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import CharacterPage from '../characterPage/CharacterPage';
import ComicPage from '../comicPage/ComicPage';

import {ComicsPage, MainPage} from '../pages/index';

import '../../sass/style.sass'

const App = () => { 

  return (
    <Router>
      <main className="App">
        <Switch>
          <Route exact path='/'>
            <MainPage />
          </Route>

          <Route exact path={'/character_page'}>
            <CharacterPage />
          </Route>  

          <Route exact path={'/comic_page'}>
            <ComicPage />
          </Route>

          <Route exact path='/comics'>
            <ComicsPage />
          </Route>
        </Switch>
      </main>
    </Router>
  )
}

export default App;
