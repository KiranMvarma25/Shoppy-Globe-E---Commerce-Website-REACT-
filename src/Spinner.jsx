import "./spinner.css";

function Spinner(){
    return(
        <>
            <div className="spinnerParent">
                <div className="loader"></div>
                <h3>Loading...</h3>
            </div>
        </>
    )
}

export default Spinner;