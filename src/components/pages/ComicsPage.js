import Comics from '../comics/Comics';
import { Helmet } from 'react-helmet';

const ComicsPage = () => {
  return (
    <>
      <Helmet>
          <meta
          name="description"
          content="Page with list pf our comics"
          />
          <title>Comics page</title>
      </Helmet>
      <Comics /> 
    </>  
  )
}

export default ComicsPage;