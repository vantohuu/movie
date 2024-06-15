// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { verifyAccount } from '../../Utils/api';
// // import './OTPVerification.css';

// const OTPVerification = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [otp, setOTP] = useState('');
//   const [error, setError] = useState('');

//   //get emaildk from state
//   const emaildk = location.state.emaildk;


//   const handleVerifyOTP = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await verifyAccount(emaildk, otp, '', ''); // roleId và newPass có thể truyền giá trị mặc định tại backend
//       console.log('OTP verification success:', response);
//       navigate('/login');
//     } catch (error) {
//       console.error('OTP verification error:', error);
//       setError('Xác thực OTP thất bại. Vui lòng thử lại.');
//     }
//   };

//   return (




//     <div className="otp-verification-wrapper">
//       <div className="otp-verification-content">

//         <h3>Xác thực OTP</h3>
//         <p> {emaildk} </p>
//         {error && <p className="error">{error}</p>}
//         <p>Vui lòng nhập mã OTP đã được gửi đến email của bạn.</p>
//         <form onSubmit={handleVerifyOTP}>
//           <div className="row">
//             <label htmlFor="otp">Mã OTP:</label>
//             <input type="text" id="otp" value={otp} onChange={(e) => setOTP(e.target.value)} />
//           </div>
//           <div className="row">
//             <button type="submit">Xác thực</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default OTPVerification;

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyAccount } from '../../Utils/api';
import './OTPVerification.css';
const OTPVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [otp, setOTP] = useState('');
  const [error, setError] = useState('');

  // Get emaildk and new password from state
  const emaildk = location.state.emaildk;
  const newPassword = location.state.newPassword;

 

  const handleVerifyOTP = async (event) => {
    event.preventDefault();
    try {
      
      const response = await verifyAccount(emaildk, otp, (newPassword?newPassword:'')); // roleId và newPass có thể truyền giá trị mặc định tại backend
      if (response.success) {
        console.log('OTP verification success:', response);
        //Thong bao xac thuc thanh cong
        alert('Xác thực thành công.');
        setTimeout(() => navigate('/login'), 1000); 
        console.error('OTP verification error:', response);
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      setError('Xác thực OTP thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <div className="otp-verification-wrapper">
      <div className="otp-verification-content">
        <h3>Xác thực OTP</h3>
        <p>{emaildk}</p>
        
        <p>Vui lòng nhập mã OTP đã được gửi đến email của bạn.</p>
        <form onSubmit={handleVerifyOTP}>
          <div className="row">
            <label htmlFor="otp">Mã OTP:</label>
            <input type="text" id="otp" value={otp} onChange={(e) => setOTP(e.target.value)} />
          </div>
          <div className="row">
            <button type="submit">Xác thực</button>
          </div>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default OTPVerification;
