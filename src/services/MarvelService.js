import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {

  const {loading, request, error, clearError} = useHttp();

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  const _apiKey = 'apikey=b728d6eca38d279d414e4429c17a0bc1'; 
  //const _apiKey = 'apikey=c5d6fc8b83116d92ed468ce36bac6c62'; //another if above limits hits
  const _baseOffset = 211

  const getAllComics = async (offset = 5) => {
    const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformComic); 
  }
  const getComic = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
    return _transformComic(res.data.results[0])
  }
  const _transformComic = comic => {
    return {
      id: comic.id,
      title: comic.title,
      description: comic.description || 'There is no description',
      thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
      price: comic.prices[0].price ? `${comic.prices[0].price}$` : 'NOT AVAILABLE',
      language: comic.textObjects.language || 'en-us',
      pages: comic.pageCount ? `${comic.pageCount} pages` : 'No information about the number of pages',
    }
  }

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformCharacter)
  }
  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0])
  }
  const getCharacterPage = async (nameCharacter) => {
    const res = await request(`${_apiBase}characters?name=${nameCharacter}&${_apiKey}`);
    return res.data.results.map(_transformCharacter) // if res.data.results[0] не будет работать коректно
  }
  const _transformCharacter = (character) => {
    return {
      id: character.id,
      name: character.name,
      description: character.description ? `${character.description.slice(0,210)}...` : `There is no description for this character`,
      thumbnail: character.thumbnail.path + '.' + character.thumbnail.extension,
      homepage: character.urls[0].url,
      wiki: character.urls[1].url,
      comics: character.comics.items,
    }
  }

  return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics, getComic, getCharacterPage}
}

export default useMarvelService;

