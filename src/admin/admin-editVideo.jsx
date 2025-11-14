import axios from "axios";
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { Link } from 'react-router-dom'

export function EditVideo(){

    const params = useParams();
    const navigate = useNavigate();

    const[video, setVideo] = useState({id:null, title:null, description:null, url:null, views:0, likes:0, dislikes:0, category_id:null, comments:null});

    const[categories, setCategories] = useState([{category_id:0, category_name:null}])
    const formik = useFormik({
        initialValues:{
            id:video.id,
            title:video.title,
            description:video.description,
            url:video.url,
            views:video.views,
            likes:video.likes,
            dislikes:video.dislikes,
            category_id:video.category_id,
            comments:video.comments
        },
        onSubmit:(video => {
            axios.put(`http://localhost:4400/videos/${params.id}`, video).
            then(() => {
                alert('Video updated successfully');
                navigate('/admin-dashboard');   
            })
        }),
        enableReinitialize:true
    })

    function LoadVideo(){
        axios.get(`http://localhost:4400/videos/${params.id}`).
        then(response => {
            setVideo(response.data);
        })
    }

    function LoadCategories(){
        axios.get('http://localhost:4400/categories').
        then(response => {
            setCategories(response.data);
        })
    }

    useEffect(() => {
        LoadCategories();
        LoadVideo();
    })

    return(
        <div className="d-flex justify-content-center mt-3">
            <form className="p-3 col-10 col-md-8 col-lg-4 w-50 border bg-light overflow-y-auto" onSubmit={formik.handleSubmit} style={{height:'580px', scrollbarWidth:'none', boxShadow:'7px 7px 10px black', background:'url("/images/form-bg.jpg") center/cover repeat-x fixed'}}>

                <p className="text-end mb-0"><Link to='/admin-dashboard' className="btn btn-close"></Link></p>
                <p className="text-center pb-2 fw-bold fs-3">Edit Video</p>
                <dl>
                    <dt className="form-label">Title</dt>
                    <dd><input className="form-control" value={formik.values.title} onChange={formik.handleChange} type="text" name="title" /></dd>

                    <dt className="form-label">Description</dt>
                    <dd><input className="form-control" value={formik.values.description} onChange={formik.handleChange} type="text" name="description" /></dd>

                    <dt className="form-label">URL</dt>
                    <dd><input className="form-control" value={formik.values.url} onChange={formik.handleChange} type="text" name="url" /></dd>

                    <dt className="form-label">Category ID</dt>
                    <dd>
                        <select className="form-select" value={formik.values.category_id} onChange={formik.handleChange} name="category_id">
                            {
                                categories.map(category => <option key={category.category_id} value={category.category_id}>{category.category_name}</option>)
                            }
                        </select>
                    </dd>

                    <dt className="form-label">Views</dt>
                    <dd><input className="form-control" value={formik.values.views} onChange={formik.handleChange} type="number" min={0} name="views" /></dd>

                    <dt className="form-label">Likes</dt>
                    <dd><input className="form-control" value={formik.values.likes} onChange={formik.handleChange} type="number" min={0} name="likes" /></dd>

                    <dt className="form-label">Dislikes</dt>
                    <dd><input className="form-control" value={formik.values.dislikes} onChange={formik.handleChange} type="number" min={0} name="dislike" /></dd>

                    <dt className="form-label">Comment</dt>
                    <dd><input className="form-control" value={formik.values.comments} onChange={formik.handleChange} type="text" name="comment" /></dd>
                </dl>
                <button className="btn btn-success w-100" type="submit">Edit Video</button>
            </form>
        </div>
    )
}