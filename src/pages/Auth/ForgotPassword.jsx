// import React, { useState } from 'react';
// import { forgotPassword } from '../../Utils/api';
// import './ForgotPassword.css';

// const ForgotPassword = () => {
//     const [email, setEmail] = useState('');
//     const [message, setMessage] = useState('');
//     const [error, setError] = useState('');

//     const handleForgotPassword = async (event) => {
//         event.preventDefault();
//         try {
//             const response = await forgotPassword(email);
//             if (response.success) {
//                 setMessage('Password reset link has been sent to your email.');
//                 setError('');
//             } else {
//                 setError('Failed to send password reset link. Please try again.');
//                 setMessage('');
//             }
//         } catch (error) {
//             console.error('Forgot password error:', error);
//             setError('An error occurred. Please try again.');
//             setMessage('');
//         }
//     };

//     return (
//         <div className="forgot-password-wrapper">
//             <div className="forgot-password-content">
//                 <h3>Forgot Password</h3>
//                 <form onSubmit={handleForgotPassword}>
//                     <div className="row">
//                         <label htmlFor="email">Email:</label>
//                         <input 
//                             type="email" 
//                             id="email" 
//                             value={email} 
//                             onChange={(e) => setEmail(e.target.value)} 
//                             required 
//                         />
//                     </div>
//                     <div className="row">
//                         <button type="submit">Send Reset Link</button>
//                     </div>
//                 </form>
//                 {message && <p className="success">{message}</p>}
//                 {error && <p className="error">{error}</p>}
//             </div>
//         </div>
//     );
// }

// export default ForgotPassword;

import React, { useState } from 'react';
import { resetPassword } from '../../Utils/api'; // You'll need to implement this function in your API utilities
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Reuse the same CSS for consistent styling

const ForgotPassword = () => {
    const [username, setUsername] = useState(''); // Change to email or username based on your API
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleResetPassword = async (event) => {
        event.preventDefault();
        if (!username || !email || !newPassword || !confirmPassword) {
            setError('Vui lòng điền đầy đủ thông tin.');
            return;
        }
        
        if (newPassword !== confirmPassword) {
            setError('Mật khẩu mới và xác nhận mật khẩu không khớp.');
            return;
        }

        try {
            const response = await resetPassword(username,email, newPassword);
            if (response.success) {
                // setSuccess('Mật khẩu đã được đặt lại thành công. Vui lòng đăng nhập.');
                // setTimeout(() => navigate('/login'), 3000); // Redirect to login after 3 seconds
                let emaildk = email;
                //truyền emaildk và newpassword qua trang otp-verification
                navigate('/otp-verification', { state: { emaildk: emaildk, newPassword: newPassword } });
            } else {
                setError(response.error || 'Đặt lại mật khẩu thất bại. Vui lòng thử lại.');
            }
        } catch (error) {
            console.error('Reset password error:', error);
            setError('Đặt lại mật khẩu thất bại. Vui lòng thử lại.');
        }
    };

    return (
        <div className="login-wrapper" id="login-content">
            <div className="login-content">
                <h3>Quên mật khẩu</h3>
                <form onSubmit={handleResetPassword}>
                    {error && <p className="error">{error}</p>}
                    {success && <p className="success">{success}</p>}
                    <div className="row">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="row">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="row">
                        <label htmlFor="new-password">Mật khẩu mới:</label>
                        <input type="password" id="new-password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    </div>
                    <div className="row">
                        <label htmlFor="confirm-password">Xác nhận mật khẩu mới:</label>
                        <input type="password" id="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <div className="row">
                        <button type="submit">Đặt lại mật khẩu</button>
                    </div>
                </form>
                <p className='if'>
                    <button className="switch-to-login" onClick={() => navigate('/login')}>Đăng nhập tại đây</button>.
                </p>
            </div>
        </div>
    );
}

export default ForgotPassword;
