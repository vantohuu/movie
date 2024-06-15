import React, { useState } from 'react';
import { register } from '../../Utils/api';
import { useNavigate } from 'react-router-dom';
// import './SignUp.css';
import './Login.css';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
    if(username === '' ){
        setError('Tên người dùng không được để trống.');
        return;
    }
    if(email === ''){
        setError('Email không được để trống.');
        return;
    }

    if(password === ''){
        setError('Mật khẩu không được để trống.');
        return;
    }

      const response = await register(username, password, email);
      console.log('Registration success:', response);
      navigate('/otp-verification', { state: { email } }); // Chuyển hướng đến trang xác thực OTP
    } catch (error) {
      console.error('Registration error:', error);
      setError('Đăng ký thất bại. Vui lòng thử lại.');
    }
  };

  return (
    // <div className="signup-wrapper" id="signup-content">
    //   <div className="signup-content">
    //     <h3>Đăng ký</h3>
    //     {error && <p className="error">{error}</p>}
    //     <form onSubmit={handleSignUp}>
    //       <div className="row">
    //         <label htmlFor="username">Tên người dùng:</label>
    //         <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
    //       </div>
    //       <div className="row">
    //         <label htmlFor="password">Mật khẩu:</label>
    //         <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    //       </div>
    //       <div className="row">
    //         <label htmlFor="email">Email:</label>
    //         <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
    //       </div>
    //       <div className="row">
    //         <button type="submit">Đăng ký</button>
    //       </div>
    //     </form>
    //   </div>
    // </div>
    <form className='loginform' onSubmit={handleSignUp}>
                        <div className="row">
                            <label htmlFor="username">Tên người dùng:</label>
                            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="row">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div> 
                        <div className="row">
                            <label htmlFor="password">Mật khẩu:</label>
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        {/* <div className="row">
                            <label htmlFor="password">Nhập lại mật khẩu:</label>
                            <input type="password" id="password" value={Repassword} onChange={(e) => setRePassword(e.target.value)} />
                        </div> */}
                        <div className="row">
                            <button type="submit">Đăng kí</button>
                        </div>
                    </form>
  );
};

export default SignUp;
