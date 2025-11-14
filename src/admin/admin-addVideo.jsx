import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom";

export function AddVideo(){

    const[categories, setCategories] = useState([{category_id:0, category_name:null}]);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues:{
            title:null, 
            description:null,
            url:null, 
            likes:0, 
            views:0, 
            dislikes:0, 
            category_id:0, 
            comments:null
        },
        onSubmit:(video) =>{
            axios.post('http://localhost:4400/videos', video);
            alert('Video Added Successfully...');
            navigate('/admin-dashboard');
        }
    })

    function LoadCategories(){
       axios.get('http://localhost:4400/categories').
       then(response => {
            response.data.unshift({category_id:-1, category_name:'select a category'})
            setCategories(response.data);
       })
    }

    useEffect(() => {
        LoadCategories();
    })

    return(
        <div className="d-flex justify-content-center mt-3">
            <form className="p-3 col-10 col-md-8 w-50 col-lg-4 border bg-light overflow-y-auto" onSubmit={formik.handleSubmit} style={{height:'580px', scrollbarWidth:'none', boxShadow:'7px 7px 10px black', background:'url("/images/form-bg.jpg") center/cover repeat-x fixed'}}>

                <p className="text-end mb-0"><Link to='/admin-dashboard' className="btn btn-close"></Link></p>
                <p className="text-center pb-2 fw-bold fs-3">Add New Video</p>
                <dl>
                    <dt className="form-label">Title</dt>
                    <dd><input className="form-control" onChange={formik.handleChange} type="text" name="title" /></dd>

                    <dt className="form-label">Description</dt>
                    <dd><input className="form-control" onChange={formik.handleChange} type="text" name="description" /></dd>

                    <dt className="form-label">URL</dt>
                    <dd><input className="form-control" onChange={formik.handleChange} type="text" name="url" /></dd>

                    <dt className="form-label">Category ID</dt>
                    <dd>
                        <select className="form-select" onChange={formik.handleChange} name="category_id">
                            {
                                categories.map(category => <option key={category.category_id} value={category.category_id}>{category.category_name}</option>)
                            }
                        </select>
                    </dd>

                    <dt className="form-label">Views</dt>
                    <dd><input className="form-control" onChange={formik.handleChange} type="number" min={0} name="views" /></dd>

                    <dt className="form-label">Likes</dt>
                    <dd><input className="form-control" onChange={formik.handleChange} type="number" min={0} name="likes" /></dd>

                    <dt className="form-label">Dislikes</dt>
                    <dd><input className="form-control" onChange={formik.handleChange} type="number" min={0} name="dislikes" /></dd>

                    <dt className="form-label">Comment</dt>
                    <dd><input className="form-control" onChange={formik.handleChange} type="text" name="comments" /></dd>
                </dl>
                <button className="btn btn-success w-100" type="submit">Add Video</button>
                <button className="btn btn-warning w-100 my-3" type="reset">Reset Details</button>
            </form>
        </div>
    )
}