import { useState } from 'react';
import Header from '../header/Header';
import RandomCharacterInfo from '../randomCharacterInfo/RandomCharacterInfo';
import CharacterPage from '../characterPage/CharacterPage';
import ComicPage from '../comicPage/ComicPage';
import Comics from '../comics/Comics';
import CharactersList from '../charactersList/CharactersList';
import CharacterInfo from '../characterInfo/CharacterInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import '../../sass/style.sass'
import './app.sass'

import bg_man from '../../img/bg_asset.png';

const App = () => {
  const [selectedCharacter, SetSelectedCharacter] = useState(null)

  const onCharacterSelected = (id) => SetSelectedCharacter(id) 

  // const [selectedComic, setSelectedComic] = useState(null)
  // const onComicSelected = (id) => setSelectedComic(id)

  return (
    <div className="App">
      <Header></Header>
      
      <ErrorBoundary>
        <RandomCharacterInfo></RandomCharacterInfo>
      </ErrorBoundary>
      <div className="container mt__20 flex__display">
        <ErrorBoundary>
          <CharactersList onCharacterSelected={onCharacterSelected}></CharactersList>
        </ErrorBoundary> 
        <ErrorBoundary>
          <CharacterInfo characterId={selectedCharacter}></CharacterInfo>
        </ErrorBoundary>  
      </div>
      <img className="bg__man" src={bg_man} alt={bg_man} />
      
      <CharacterPage></CharacterPage>
      <ComicPage></ComicPage>
      <Comics></Comics>
    </div>
  )
}

export default App;
