/* eslint-disable no-unused-vars */
import axios from "axios"
import { useFormik } from "formik"
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom"

export function AdminLogin(){
    
    const [cookies, setCookies, removeCookies] = useCookies(['admin_id']);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues:{
            admin_id:'',
            password:''
        },
        onSubmit : (admin) => {
            axios.get('http://localhost:4400/admin').
            then(response => {
                var result = response.data.find((value) => value.admin_id===admin.admin_id);
                if(result){
                    if(result.password===admin.password){
                        setCookies('admin_id', result.admin_id)
                        navigate('/admin-dashboard');
                    }else{
                        alert('Error! : invalid password, pls try again...')
                    }
                }else{
                    alert('Error! : invalid admin id, pls try again...');
                }
            })
        }
    })

    return(
        <div>
            <div className="text-center fs-3 fw-bold my-2">Admin Login</div>
            <div className="d-flex justify-content-center">
                <div className="border border-2 p-4 col-8 col-md-8 col-lg-4">
                    <form onSubmit={formik.handleSubmit}>
                        <p className="text-end mb-0"><Link to="/" className="btn btn-close"></Link></p>
                        <dl>
                            <dt className="form-label">Admin id</dt>
                            <dd><input name="admin_id" onChange={formik.handleChange} className="form-control" type="text" /></dd>
                            <dt className="form-label">Password</dt>
                            <dd><input name="password" onChange={formik.handleChange} className="form-control" type="password" /></dd>
                        </dl>
                        <button type="submit" className="btn btn-success w-100">Login</button>
                    </form>
                    <Link to='/' className="btn btn-danger mt-3 w-100"> Back to Home</Link>
                </div>
            </div>
        </div>
    )
}