import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

import { IoMdArrowRoundBack } from "react-icons/io";

function NotFound(){

  const err = useRouteError();        // Gives the absolute error messages.
  console.log(err)

  return (
    <>
      <div className="backToHomeParent">
        <Link to="/" className="backToHome"><IoMdArrowRoundBack /> Home</Link>
      </div>
      
      <div className="notFoundParent">
        <h2 className="notFound">{err.status} {err.statusText}</h2>
        <h3 className="notFoundTwo">{err.data}</h3>
      </div>
    </>
  )
}
  
  

export default NotFound;