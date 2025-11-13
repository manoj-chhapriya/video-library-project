import { Link } from "react-router-dom";

export function VideoLibraryHome(){
    return(
        <div>
            <div className="m-2 d-flex justify-content-between">
                <div className="fs-3 fw-bold">
                     Home Page
                </div>
                <div>
                    <Link to="/user-login" className="btn btn-warning mx-2">User Login</Link>
                    <Link to="/admin-loginPage" className="btn btn-primary">Admin Login</Link>
                </div>
            </div>

           <div className="fs-2 fw-bold text-success text-center mt-5">
                <p>"Welcome to our page"</p>
                <p>Pls login to access our features and Services</p>
           </div>
        </div>
    )
}