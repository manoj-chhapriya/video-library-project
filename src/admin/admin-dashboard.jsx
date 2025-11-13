/*eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { Link, useNavigate } from 'react-router-dom'

export function AdminDashboard(){
    const [cookies, setCookies, removeCookies] = useCookies(['admin_id']);
    const [videos, setVideos] = useState([{title:null, description:null, url:null, likes:0, views:0, dislikes:0, category_id:0, comments:null}]);
    const navigate = useNavigate();
    const[selectedVideo, setSelectVideo] = useState([]);

    function LoadVideos(){
        axios.get('http://localhost:4400/videos').
        then(response => {
            setVideos(response.data);
        })
    }

    function handleClick(){
        removeCookies('admin_id');
        navigate('/admin-loginPage');
    }

    function handleDeleteVideo(id){
        axios.delete(`http://localhost:4400/videos/${id}`).
        then(() => {
            alert('video deleted successfully');
            setVideos(videos.filter(video => video.id !== id));
        }).
        catch(err => {
            console.error('Error deleting video:', err);
            alert('Failed to delete video');
      });
    }

    useEffect(() => {
        if(cookies['admin_id']){
            LoadVideos();
        }else{
            navigate('/admin-loginPage')
        }
    },[cookies, navigate])

    return(
        <div>
            <div className="d-flex justify-content-between px-3">
                <div className="fw-bold fs-3">
                        <span>Admin-Dashboard</span>
                </div>
                <div className="fs-5 fw-bold bg-light">
                        <span className="me-4">{cookies['admin_id']}</span>
                        <button onClick={handleClick} className="btn btn-danger">Sign-out</button>
                </div>
            </div>

            <div className="text-center">
                    <Link className="bi bi-camera-video-fill btn btn-success fw-bold fs-5 w-25 text-decoration-none text-white" to='add-video'> Add New Videos</Link>
            </div>

            <div className="mt-5 overflow-y-scroll" style={{height:'440px', scrollbarWidth:'none'}}>
                <div className="table-responsive px-3">
                    <table className="table table-hover table-group-divider align-middle text-center table-light" style={{tableLayout:'fixed'}}>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Preview</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                videos.map(video => 
                                    <tr key={video.title}>
                                        <td>{video.title}</td>
                                        <td><iframe src={video.url} width={300} height={150} alt="" /></td>
                                        <td>
                                            <Link className="bi bi-pen-fill mx-2 btn btn-warning w-50" to={`edit-video/${video.id}`}>edit</Link>
                                            <button className="bi bi-trash btn btn-danger mt-3 w-50" onClick={() => {setSelectVideo(video)}} data-bs-toggle="modal" data-bs-target="#deleteModal"> delete</button>
                                            {/* <Link to={`/delete-video/${video.id}`} className="bi bi-trash btn btn-danger mt-3 w-50">delete</Link> */}
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for delete */}
            <div>
                <div className="modal fade" id="deleteModal">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content" style={{backgroundColor:"lightcyan"}}>
                            <div className="modal-header justify-content-center text-center">
                                 <strong>Are you sure to delete video? <br/>{selectedVideo.title}</strong>
                            </div>
                            <div className="modal-body">
                                <div className="d-flex justify-content-evenly">
                                    <button className="btn btn-danger w-25" data-bs-dismiss="modal" onClick={() => handleDeleteVideo(selectedVideo.id)}>Yes</button>
                                    <button className="btn btn-warning w-25" data-bs-dismiss="modal" >No</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}