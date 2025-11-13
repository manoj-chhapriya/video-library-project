/* eslint-disable no-unused-vars */
import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";
import * as yup from 'yup';

export function AdminLoginPage(){

    const[cookies, setCookies, removeCookies] = useCookies('admin_id');
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues:{
            admin_id:'',
            password:''
        },
        onSubmit : admin => {
           axios.get('http://localhost:4400/admin').
           then(response => {
                let result = response.data.find(value => value.admin_id === admin.admin_id );
                if(result){
                    if(result.password === admin.password){
                        setCookies('admin_id', result.admin_id);
                        navigate('/admin-dashboard');
                    }else{
                        alert('passowrd is incorrect, pls try again....');
                    }
                }else{
                    alert('user name not found, pls try again....');
                }
           })
        },
        validationSchema: yup.object({
            admin_id : yup.string().required('admin_id is required'),
            password: yup.string().required('password is required')
        })
    })

    return (
        <div className="d-flex flex-column justify-content-center  align-items-center" style={{height:"87vh"}}> 
            <div className="rounded rounded-3 py-4 ps-2 row gap-4" style={{width:'55vw', background: "url(/images/login-bg2.jpg)"}}>
                {/* Left Container */}
                <div className="d-felx text-dark justify-content-center align-content-center col-10 col-md-8 col-lg-6 text-center" style={{fontFamily:'Centaur',}}>
                    <div>
                        <div className="pb-2 fw-bold">
                            <p className="fs-2 mb-0" style={{textShadow:'0.8px 1.1px 1px #02262aff'}}>WELCOME TO VIDEOHUB</p>
                            <p className="mt-0">Manage, upload, and explore your video collection easily.</p>
                        </div>
                        <p className="fw-bold">
                            Add, edit, and manage videos effortlessly — keep your content fresh and organized.
                        </p>
                    </div>
                </div>

                {/* Right Container */}
                <div className="right-container col-lg-5 col-12 col-md-8 ms-2 align-items-center" style={{fontFamily:'-moz-initial'}}>
                    <div className="bg-light rounded rounded-4 p-3">
                        <Link to='/' className="btn btn-close float-end"></Link>
                        <h2 className="text-center pb-2" style={{textShadow:'1.7px 1px 2px gray'}} >Sign in</h2>

                        <form onSubmit={formik.handleSubmit} className="px-2">
                            <dl>
                                <div className="pt-2">
                                    <dt className="form-label">User Name</dt>
                                    <dd className="mb-0 pb-0"><input type="text" name="admin_id" onChange={formik.handleChange} className="form-control" placeholder="enter user-name" /></dd>
                                    <dd className="text-danger fs-6">{formik.touched.admin_id && formik.errors.admin_id}</dd>


                                    <dt className="form-label">Password</dt>
                                    <dd className="mb-0 pb-0"><input type="password" name="password" onChange={formik.handleChange} className="form-control" placeholder="enter password" /></dd>
                                    <dd className="text-danger fs-6">{formik.touched.admin_id && formik.errors.password}</dd>

                                </div>
                                
                                <div className="ms-1 row" style={{fontSize:'13px'}}>
                                    <div className="form-check col">
                                        <dd><input type="checkbox" className="form-check-input" /> Remember me</dd>
                                    </div>
                                     <div className="col text-end">
                                        <p>Forget password ?</p>
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-success text-white fs-5 rounded rounded-4 mt-1 fw-bold w-100">Sing in</button>

                                <div className="pt-4 pb-0" style={{fontSize:'12px',}}>
                                    <p>Don't have an account? <a href="#" className="fw-bold text-primary ms-1" style={{fontSize:'13px',}} > Sign Up</a></p>
                                </div>
                            </dl>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
}