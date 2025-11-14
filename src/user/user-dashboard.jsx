import axios from "axios";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addWatchLater, removeWatchLater } from "../slicers/video-slice";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
// import store from "../../store/store";

export function UserDashboard(){

    const[videos, setVideos] =  useState([{title:null, description:null, url:null, likes:0, views:0, dislikes:0, category_id:0, comments:null}]);
    const[categories, setCategories] = useState([{category_id:0, category_name:null}]);
    const[cookie, removeCookies] = useCookies();
    const navigate = useNavigate();
    let dispatch = useDispatch();
    const videosCount = useSelector((state) => state.video.videosCount);
    const Savevideos  = useSelector((state) => state.video.videos);

    function LoadVideos(){
        axios.get('http://localhost:4400/videos').
        then(response => {
            setVideos(response.data);
        })
    }

    function LoadCategories(){
       axios.get('http://localhost:4400/categories').
       then(response => {
            response.data.unshift({category_id:-1, category_name:'select'})
            setCategories(response.data);
       })
    }

    function handleSaveClick(video){
        dispatch(addWatchLater(video));
        alert('video save successfully');
    }

    function handleSignOutClick()
    {
        removeCookies('user_id');
        navigate('/user-login')
    }

    function handleRemoveClick(id){
        dispatch(removeWatchLater(id));
        alert('video remove from watchlater');
    }

    useEffect(() => {
        if(cookie['user_id'])
        {
            LoadVideos();
            LoadCategories();
        }else
        {
            navigate('/user-login');
        }
    })

    return(     
        <div>
            <div className="d-flex justify-content-around align-items-center">
                <span className="fs-4 fw-bold text-white p-2">User-Dashboard</span>

                <div className="input-group w-25">
                    <select name="category_id" className="form-select">
                        {
                            categories.map((category, index) => <option key={index}>{category.category_name}</option>)
                        }
                    </select>
                        <input type="text" className="form-control" style={{width:'200px'}} placeholder="serach category"/>
                        <button className="bi bi-search btn btn-success"></button>
                </div>

                <div className="align-content-center">
                    <span className="text-white fs-5 fw-bold">{cookie['user_id']}</span>
                    <button className="btn btn-danger mx-4" onClick={handleSignOutClick}>Sign Out</button>
                    <button className="bi bi-cart btn btn-warning position-relative" data-bs-toggle='offcanvas' data-bs-target='#saveOffcanvas'>
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{videosCount}</span>
                    </button>
                </div>
            </div>

            <div className="offcanvas offcanvas-end" id="saveOffcanvas">
                <div className="offcanvas-header">
                    <span className="offcanvas-title fw-bold">Your Watch later videos</span>
                    <button className="btn btn-close" data-bs-dismiss='offcanvas'></button>
                </div>
                <div className="offcanvas-body">
                    {
                        (Savevideos.length === 0)?
                        <div className="text-center pt-5">
                            <h4 className="bi bi-bi-collection-play mt-4 mb-0">No videos in Watch Later</h4><br/>
                            <p>Save videos to watch them anytime!</p>
                        </div>
                        :
                        Savevideos.map((video, index) => (
                            <div className="card w-100 mb-3" key={index}>
                                <div className="card-header">
                                    <iframe src={video.url} className="w-100"></iframe>
                                </div>
                                <div className="card-body">
                                    <span>{video.title}</span>
                                </div>
                                <div className="card-footer text-center">
                                    <button onClick={() => handleRemoveClick(video.id)} className="btn btn-danger w-50">Remove</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="d-flex flex-wrap gap-5 p-3 mt-5 overflow-y-scroll" style={{height:'500px', scrollbarWidth:'none'}}>
                {
                    videos.map((video, index) => 
                        <div key={index} className="card" style={{width:"340px"}}>
                            <div className="card-header">
                                <iframe src={video.url} className="w-100"></iframe>
                            </div>
                            <div className="card-body">
                                <p>{video.title}</p>
                            </div>
                            <div className="card-footer d-flex justify-content-between align-items-center">
                                <span className="bi bi-hand-thumbs-up"> {video.likes}</span>
                                <span className="bi bi-hand-thumbs-down"> {video.dislikes}</span>
                                <span className="bi bi-eye-fill"> {video.views}</span>
                                <button onClick={() => {handleSaveClick(video)}} className="btn btn-success bi bi-save"></button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}