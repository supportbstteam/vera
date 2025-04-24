import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Register() {
    const baseUrl = process.env.REACT_APP_API_URL
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [serverErrors, setServerErrors] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const validate = () => {
    const errors = {};
    if (!firstName.trim()) errors.firstName = 'First name is required';
    if (!lastName.trim()) errors.lastName = 'Last name is required';
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Invalid email format';
    }
    // if (!mobile) {
    //   errors.mobile = 'Mobile number is required';
    // } else if (!/^[0-9]{10}$/.test(mobile)) {
    //   errors.mobile = 'Mobile must be 10 digits';
    // }
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    return errors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    try {
      const response = await fetch(`${baseUrl}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          mobile,
          password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        // localStorage.setItem('token', data.token);
        navigate('/');
      } else if (response.status === 422) {
        setServerErrors(data.errors || {});
      } else {
        setError(data.message || 'Registration failed');
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
                    <form onSubmit={handleSubmit}>
                      <div className="form-floating mb-3">
                        <input className="form-control" id="first_name" type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        <label htmlFor="first_name">First Name</label>
                        {formErrors.firstName && <div className="text-danger mt-1">{formErrors.firstName}</div>}
                        {serverErrors.firstName && <div className="text-danger mt-1">{serverErrors.firstName[0]}</div>}
                      </div>
                      <div className="form-floating mb-3">
                        <input className="form-control" id="last_name" type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        <label htmlFor="last_name">Last Name</label>
                        {formErrors.lastName && <div className="text-danger mt-1">{formErrors.lastName}</div>}
                        {serverErrors.lastName && <div className="text-danger mt-1">{serverErrors.lastName[0]}</div>}
                      </div>
                      <div className="form-floating mb-3">
                        <input className="form-control" id="mobile" type="text" placeholder="Mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                        <label htmlFor="mobile">Mobile</label>
                      </div>
                      <div className="form-floating mb-3">
                        <input className="form-control" id="inputEmail" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="inputEmail">Email</label>
                        {formErrors.email && <div className="text-danger mt-1">{formErrors.email}</div>}
                        {serverErrors.email && <div className="text-danger mt-1">{serverErrors.email[0]}</div>}
                      </div>
                      <div className="form-floating mb-3">
                        <input className="form-control" id="inputPassword" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label htmlFor="inputPassword">Password</label>
                        {formErrors.password && <div className="text-danger mt-1">{formErrors.password}</div>}
                        {serverErrors.password && <div className="text-danger mt-1">{serverErrors.password[0]}</div>}
                      </div>
                      {error && <div className="text-danger mb-3">{error}</div>}
                      <div className="mt-4 mb-0 text-center">
                        <button className="btn btn-primary text-center" type="submit">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
