import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { VideoLibraryHome } from "./video-library-home";
import { AdminLogin } from "./admin/admin-login";
import { AdminDashboard } from "./admin/admin-dashboard";
import { AddVideo } from "./admin/admin-addVideo";
import { WrongPath } from "./video-library-wrongPath";
import { AdminLoginPage } from "./admin/Admin-loginForm/admin-loginPage";
import { EditVideo } from "./admin/admin-editVideo";    
import { UserDashboard } from "./user/user-dashboard";

export function VideoLibraryIndex(){
    return(
        <div className="w-100">
            <BrowserRouter>
                <header className="text-center mt-4 fs-2 fw-bold">
                    <Link to="/" className="text-white text-decoration-none">
                        <div className="bi bi-house-door-fill"> Video Library</div>
                    </Link>
                </header>

                <section className="mt-2">
                    <Routes>
                        <Route path="/" element={<VideoLibraryHome/>} />
                        <Route path="admin-login" element={<AdminLogin/>} />
                        <Route path="admin-loginPage" element={<AdminLoginPage />} />
                        <Route path="admin-dashboard" element={<AdminDashboard/>} />
                        <Route path="admin-dashboard/add-video" element={<AddVideo/>} />
                        <Route path="admin-dashboard/edit-video/:id" element={<EditVideo />} />
                        <Route path="user-dashboard" element={< UserDashboard/>} />
                        <Route path="*" element={<WrongPath/>} />
                    </Routes>
                </section>
            </BrowserRouter>
        </div>
    )
}