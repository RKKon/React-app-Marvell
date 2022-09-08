import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';

import '../../sass/style.sass'
import './form.sass'

function CharacterSearchForm() {
  const [charName, setCharName] = useState(null)
  const {getCharacterPage, error, loading, clearError} = useMarvelService();

  const getCharacter = (nameCharacter) => { // getting char from API then use function to put in charName
    getCharacterPage(nameCharacter)
      .then(onCharacterLoaded)   
  }

  const onCharacterLoaded = (charName) => { // if нету параметра (charName) то не работает!
    clearError()
    setCharName(charName)
    console.log(charName);
  }

  const errorMessage = error ? <ErrorMessage /> : null;
  const renderCharacter = !charName ? null : charName.length ? 
      <div> 
        <p className="character__form__answer">There is! Visit {charName[0].name} page?</p>
        <Link to={`/characters/${charName[0].id}`}>
          <button  className="btn grey__btn grey__btn__search" disabled={loading}>TO PAGE</button> 
        </Link>  
      </div> : 
      <p className="character__form__bad__answer">The character was not found. Check the name and try again</p>


  return (
    <>
      <Formik
        initialValues={{name: ''}}
        validationSchema={Yup.object({name: Yup.string().required('This field is required') })}
        onSubmit= { values => getCharacter(values.name) } >
        
        <Form className="character__form" action="#">
          <h2>Or find a character by name:</h2>
          <div>
            <Field id="name" name='name' type="text" placeholder="Enter name" />
            <button type="submit" className="btn">FIND</button>
          </div>
          {renderCharacter}
          {errorMessage}
          <FormikErrorMessage name='name' className="character__form__bad__answer" component="p" />
        </Form>
      </Formik>
    </>
  )
}

export default CharacterSearchForm;