import { Link } from "react-router-dom";

export function VideoLibraryHome(){
    return(
        <div className="w-100">
            <div className="m-2 text-center mt-5 w-100">
                <div className="fs-3 fw-bold text-white mb-3">
                     Home Page
                </div>
                <div>
                    <Link to="/user-login" style={{width:"200px"}} className="btn btn-warning mx-2">User Login</Link>
                    <Link to="/admin-loginPage" style={{width:"200px"}} className="btn btn-primary">Admin Login</Link>
                </div>
            </div>

           <div className="mt-5 row mx-auto" style={{height:"350px", width:"900px", boxShadow:"2px 2px 5px black"}}>
                <div className="col-6 align-self-center text-center text-light">
                   <h2 className="pb-3"style={{textShadow:'2px 2px 4px black'}}>“Discover, watch, and grow with us.”</h2>
                    <p style={{textShadow:'-2px -2px 4px black'}}>Access all features and videos—please login to continue.</p>
                </div>

                <div className="col-6 h-100 p-0">
                    <img src="/images/video-library-homepage.jpg" className="w-100 h-100 full-fit" alt="" />
                </div>
           </div>
        </div>
    )
}