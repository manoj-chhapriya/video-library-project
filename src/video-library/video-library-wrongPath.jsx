import { Link } from "react-router-dom"

export function WrongPath(){
    return(
        <div className="d-flex flex-column justify-content-center mt-5 p-5 align-item-center fs-4 fw-bold text-danger text-center">
            <div >
                <p className="bi bi-exclamation-triangle"> oops ! Somthing went wrong<br/> invalid path, pls check your path and try again... </p>
                <Link to="/" className="btn btn-success bi bi-house-door-fill"> Back to Home</Link>
            </div>
        </div>
    )
}