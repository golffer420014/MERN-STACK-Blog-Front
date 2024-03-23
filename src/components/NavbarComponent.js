import { Link, withRouter } from "react-router-dom";
import { getUser, logout } from "../sevices/authorize";

const NavbarComponent = ({ history }) => {
    return (
        <nav>
            <ul className="nav nav-tabs justify-content-start">
                <li className="nav-item pr-3 pt-3 pb-3">
                    <Link to="/" className="nav-link">
                        หน้าแรก
                    </Link>
                </li>
                {getUser() && (
                    <li className="nav-item pr-3 pt-3 pb-3">
                        <Link to="/create" className="nav-link">
                            เขียนบทความ
                        </Link>
                    </li>
                )}

                {!getUser() && (
                    <li className="nav-item pr-3 pt-3 pb-3">
                        <Link
                            to="/login"
                            onClick={() => {
                                setTimeout(() => {
                                    window.location.reload();
                                }, 100);
                            }}
                            className="nav-link"
                        >
                            เข้าสู่ระบบ
                        </Link>
                    </li>
                )}
                {getUser() && (
                    <li className="nav-item pr-3 pt-3 pb-3">
                        <button
                            onClick={() =>
                                logout(() => {
                                    history.push("/");
                                    setTimeout(() => {
                                        window.location.reload();
                                    }, 100);
                                })
                            }
                            className="nav-link"
                        >
                            ออกจากระบบ
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default withRouter(NavbarComponent);
