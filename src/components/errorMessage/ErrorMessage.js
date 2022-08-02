import errorImg from './error.gif'

import './ErrorMessage.sass'

const ErrorMessage = () => {
  return (
    //<img className='error__message' src={process.env.PUBLIC_URL + '/error.gif'} alt="Error" /> //if in folder public
    <img className='error__message' src={errorImg} alt="Error" />
  )
}

export default ErrorMessage;