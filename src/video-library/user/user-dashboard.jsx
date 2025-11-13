import axios from "axios";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addWatchLater } from "../../slicers/video-slice";
// import store from "../../store/store";

export function UserDashboard(){

    const[videos, setVideos] =  useState([{title:null, description:null, url:null, likes:0, views:0, dislikes:0, category_id:0, comments:null}]);
    let dispatch = useDispatch();
    const videosCount = useSelector((state) => state.video.videosCount);

    function LoadVideos(){
        axios.get('http://localhost:4400/videos').
        then(response => {
            setVideos(response.data);
        })
    }

    useEffect(() => {
        LoadVideos();
    })

    function handleSaveClick(video){
        dispatch(addWatchLater(video));
        alert('video save successfully');
    }

    return(     
        <div>
            <div className="text-center">
                <span className="fs-4 fw-bold bg-dark text-white p-2">User-Dashboard</span>
                <span className="text-dark badge rounded rounded-5 fs-4 text-center bg-danger ms-3">{videosCount}</span>
            </div>

            <div className="d-flex gap-3 p-3 pt-4">
                {
                    videos.map((video, index) => 
                        <div key={index} className="card" style={{width:"300px"}}>
                            <div className="card-header">
                                <iframe src={video.url} className="w-100"></iframe>
                            </div>
                            <div className="card-body">
                                <p>{video.title}</p>
                            </div>
                            <div className="card-footer">
                                <button onClick={() => {handleSaveClick(video)}} className="bi bi-save-fill btn btn-success w-100"> Save</button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}