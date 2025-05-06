import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from './authContext'; // Adjust path as needed
export default function Login() {
  const baseUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState(null);
  const [serverErrors, setServerErrors] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [active, setActive] = useState('');
  const validate = () => {
    const errors = {};
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Invalid email format';
    }
    if (!password) {
      errors.password = 'Password is required';
    }
    return errors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailErr('');
    setPasswordErr('');
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setServerErrors({});
    try {
      const response = await fetch(`${baseUrl}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data?.data?.status === "0") {
        setActive(data.data.message);
        navigate('/');
        return;
      }
      if (data.status_error === 'password') {
        setPasswordErr(data.message);
        return;
      }
      if (response.ok) {
        console.log(data.data.role);
        const role = data.data.role == "1" ? "customer" : "supplier";
        const user = { role, token: data.data.token };
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('email', data.data.email);
        localStorage.setItem('id', data.data.id);
        localStorage.setItem('role', data.data.role);
        setUser(user);
        setToken(data.data.token);
        if (role === "customer") {
          console.log("mughis");
          navigate('/category');
        } else {
          console.log("raghib");
          navigate('/supplier/dashboard');
        }
      } else if (response.status === 422) {
        setServerErrors(data.errors || {});
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };
  return (
    <div id="layoutAuthentication">
      <div id="layoutAuthentication_content">
        <main>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5">
                <div className="card shadow-lg border-0 rounded-lg mt-5">
                  <div className="card-header">
                    <h1 className="text-center font-weight-light my-4">VERA</h1>
                  </div>
                  <div className="card-body">
                  {active && <div className="text-danger mt-1">{active}</div>}
                    <form onSubmit={handleSubmit}>
                      <div className="form-floating mb-3">
                        <input className="form-control" id="inputEmail" type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="inputEmail">Email</label>
                        {formErrors.email && <div className="text-danger mt-1">{formErrors.email}</div>}
                        {serverErrors.email && ( <div className="text-danger mt-1">{serverErrors.email[0]}</div> )}
                        {emailErr && <div className="text-danger mt-1">{emailErr}</div>}
                      </div>
                      <div className="form-floating mb-3">
                        <input className="form-control" id="inputPassword" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <label htmlFor="inputPassword">Password</label>
                        {formErrors.password && <div className="text-danger mt-1">{formErrors.password}</div>}
                        {serverErrors.password && (<div className="text-danger mt-1">{serverErrors.password[0]}</div>)}
                        {passwordErr && <div className="text-danger mt-1">{passwordErr}</div>}
                      </div>
                      {/* {error && ( <div className="text-danger text-center mb-3">{error}</div> )} */}
                      <div className="mt-4 mb-0 text-center">
                        <button className="btn btn-primary" type="submit">
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="card-footer text-center py-3">
                    <div className="small">
                      <Link to="/register">Need an account? Sign up!</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div id="layoutAuthentication_footer">
        <footer className="py-4 bg-light mt-auto">
          <div className="container-fluid px-4">
            <div className="d-flex align-items-center justify-content-between small">
              <div className="text-muted">
                Copyright &copy; Vera 2025
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
