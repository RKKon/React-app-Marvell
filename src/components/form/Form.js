import '../../sass/style.sass'
import './form.sass'

function Form() {
  return (
    <div className="form">
      <form className="character__form" action="#">
        <h2>Or find a character by name:</h2>
        <input name='name' type="text" placeholder="Enter name" />
        <button type="submit" className="btn">FIND</button>
        {/* <p className="character__form__bad__answer">This field is required</p> */}

        {/* <p className="character__form__bad__answer">The character was not found. Check the name and try again</p> */}
        
        {/* <p className="character__form__answer">There is! Visit ${name} page?</p>
        <button className="btn grey__btn">TO PAGE</button> */}
      </form>
    </div>
  )
}

export default Form;