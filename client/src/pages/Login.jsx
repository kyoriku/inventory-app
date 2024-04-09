import LoginForm from "../components/LoginForm";
import "../styles/Login.css";

const LoginPage = () => {
  return (
    <div className="d-flex justify-content-center align-items-center background">
      <div className="text-center col-md-4 card p-3 login-card">
        <h2 className="login-header">Login</h2>
        <hr />
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;