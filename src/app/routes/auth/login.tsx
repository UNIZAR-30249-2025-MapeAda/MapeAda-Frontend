import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import LoginForm from "../../../features/auth/components/login-form";

const Login = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 bg-light" style={{ width: "350px" }}>
        <h2 className="text-center mb-3">
          <FontAwesomeIcon icon={faMapLocationDot} /> MapeAda
        </h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
