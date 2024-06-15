// import React, { useState, useRef } from 'react';
// import { uploadUserAvatar, updateUserInfo } from '../../../Utils/api';
// import defaultAvatar from '../../../assets/img/default-avatar.jpg';
// import './Profile.css';

// import Header from '../../../components/Header/Header';
// import Footer from '../../../components/Footer/Footer';

// const Profile = () => {
//   const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')));
//   const [avatarFile, setAvatarFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [updatedUserInfo, setUpdatedUserInfo] = useState({
//     username: userInfo.username,
//     password: userInfo.password,
//     name: userInfo.name,
//     email: userInfo.email,
//     avatar: userInfo.avatar,
//     money: userInfo.money,
//     roleId: userInfo.roleId // Ensure roleId is included
//   });
//   const [editMode, setEditMode] = useState(false);
//   const [previewSrc, setPreviewSrc] = useState(null);
//   const fileInputRef = useRef(null);

//   const handleAvatarChange = (event) => {
//     const file = event.target.files[0];
//     setAvatarFile(file);
//     if (file) {
//       const previewURL = URL.createObjectURL(file);
//       setPreviewSrc(previewURL);
//     } else {
//       setPreviewSrc(null);
//     }
//   };

//   const handleUpload = async () => {
//     try {
//       setUploading(true);
//       const formData = new FormData();
//       formData.append('fileUpload', avatarFile);
//       formData.append('username', userInfo.username);

//       const response = await uploadUserAvatar(formData);
//       if (response.success) {
//         setUserInfo({ ...userInfo, avatar: response.avatar });
//         localStorage.setItem('userInfo', JSON.stringify({ ...userInfo, avatar: response.avatar }));
//         setPreviewSrc(null);
//       } else {
//         console.error('Error uploading avatar:', response.message);
//       }
//     } catch (error) {
//       console.error('Error uploading avatar:', error);
//     } finally {
//       setUploading(false);
//       setAvatarFile(null);
//     }
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setUpdatedUserInfo({
//       ...updatedUserInfo,
//       [name]: value
//     });
//   };

//   const handleUpdateUserInfo = async () => {
//     // const updateUserInfo1 = {
//     //   username: userInfo.username,
//     //   name: updatedUserInfo.name,
//     //   email: updatedUserInfo.email,
//     //   password: updatedUserInfo.password,
//     //   money: updatedUserInfo.money,
//     //   avatar: userInfo.avatar,
//     //   roleId: userInfo.roleId
//     // };
//     try {
//       const response = await updateUserInfo(updatedUserInfo);
//       if (response.success) {
//         setUserInfo({
//           ...userInfo,
//           username: updatedUserInfo.username,
//           name: updatedUserInfo.name,
//           email: updatedUserInfo.email,
//           password: updatedUserInfo.password,
//           money: updatedUserInfo.money,
//           avatar: updatedUserInfo.avatar,
//           roleId: updatedUserInfo.roleId

//         });

//         setEditMode(false);
//         localStorage.setItem('userInfo', JSON.stringify({
//           ...userInfo,
//           username: updatedUserInfo.username,
//           name: updatedUserInfo.name,
//           email: updatedUserInfo.email,
//           // money: updatedUserInfo.money
//         }));
//       } else {
//         console.error('Error updating user info:', response.message);
//       }
//     } catch (error) {
//       console.error('Error updating user info:', error);
//     }
//   };

//   return (
//     <div className='mainBodyUser'>
//       <Header />
//       <div className="profile-container">
//         <div className="avatar-section">
//           {uploading ? (
//             <div className="loading-spinner"></div>
//           ) : (
//             <img
//               src={previewSrc || (userInfo?.avatar ? `${process.env.REACT_APP_UPLOAD_URL}/${userInfo.avatar}` : defaultAvatar)}
//               alt="Avatar"
//               className="avatar"
//             />
//           )}
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleAvatarChange}
//             ref={fileInputRef}
//             style={{ display: 'none' }}
//           />
//           <button onClick={() => fileInputRef.current.click()}>Đổi</button>
//           {avatarFile && <button onClick={handleUpload} disabled={uploading}>Tải lên</button>}
//         </div>
//         <div className="info-section">
//           <h2>Thông tin tài khoản</h2>
//           {editMode ? (
//             <div className="edit-form">
//               <label>
//                 <span>Tên:</span>
//                 <input type="text" name="name" value={updatedUserInfo.name} onChange={handleInputChange} />
//               </label>
//               <label>
//                 <span>Email:</span>
//                 <input type="email" name="email" value={updatedUserInfo.email} onChange={handleInputChange} />
//               </label>

//               <button className="change-avatar" onClick={handleUpdateUserInfo}>Lưu</button>
//               <button className="cancel" onClick={() => setEditMode(false)}>Huỷ</button>
//             </div>
//           ) : (
//             <div className="user-info">
//               <p><strong>Username:</strong> {userInfo?.username}</p>
//               <p><strong>Email:</strong> {userInfo?.email}</p>
//               <p><strong>Tên:</strong> {userInfo?.name}</p>
//               <button onClick={() => setEditMode(true)}>Sửa</button>
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Profile;



import React, { useState, useRef } from 'react';
import { uploadUserAvatar, updateUserInfo, changeUserPassword } from '../../../Utils/api';
import defaultAvatar from '../../../assets/img/default-avatar.jpg';
import './Profile.css';

import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';

const Profile = () => {
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')));
  const [avatarFile, setAvatarFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [updatedUserInfo, setUpdatedUserInfo] = useState({
    username: userInfo.username,
    password: userInfo.password,
    name: userInfo.name,
    email: userInfo.email,
    avatar: userInfo.avatar,
    money: userInfo.money,
    roleId: userInfo.roleId // Ensure roleId is included
  });
  const [editMode, setEditMode] = useState(false);
  const [changePasswordMode, setChangePasswordMode] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [previewSrc, setPreviewSrc] = useState(null);
  const fileInputRef = useRef(null);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setAvatarFile(file);
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreviewSrc(previewURL);
    } else {
      setPreviewSrc(null);
    }
  };

  const handleUpload = async () => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('fileUpload', avatarFile);
      formData.append('username', userInfo.username);

      const response = await uploadUserAvatar(formData);
      if (response.success) {
        setUserInfo({ ...userInfo, avatar: response.avatar });
        localStorage.setItem('userInfo', JSON.stringify({ ...userInfo, avatar: response.avatar }));
        setPreviewSrc(null);
      } else {
        console.error('Error uploading avatar:', response.message);
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
    } finally {
      setUploading(false);
      setAvatarFile(null);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedUserInfo({
      ...updatedUserInfo,
      [name]: value
    });
  };

  const handleUpdateUserInfo = async () => {
    try {
      const response = await updateUserInfo(updatedUserInfo);
      if (response.success) {
        setUserInfo({
          ...userInfo,
          username: updatedUserInfo.username,
          name: updatedUserInfo.name,
          email: updatedUserInfo.email,
          password: updatedUserInfo.password,
          money: updatedUserInfo.money,
          avatar: updatedUserInfo.avatar,
          roleId: updatedUserInfo.roleId
        });

        setEditMode(false);
        localStorage.setItem('userInfo', JSON.stringify({
          ...userInfo,
          username: updatedUserInfo.username,
          name: updatedUserInfo.name,
          email: updatedUserInfo.email,
          password: updatedUserInfo.password,
          money: updatedUserInfo.money,
          avatar: updatedUserInfo.avatar,
          roleId: updatedUserInfo.roleId
        }));
      } else {
        console.error('Error updating user info:', response.message);
      }
    } catch (error) {
      console.error('Error updating user info:', error);
    }
  };

  const handleChangePassword = async () => {
    try {
      console.log("userInfo.username", userInfo.username)
      console.log("oldPassword", oldPassword)
      console.log("newPassword", newPassword)
      const response = await changeUserPassword(userInfo.username, oldPassword, newPassword);
      if (response.success) {
        alert('Đổi mật khẩu thành công!');
        setChangePasswordMode(false);
        setOldPassword('');
        setNewPassword('');
      } else {
        alert('Đổi mật khẩu thất bại: ' + response.message);
      }
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Đổi mật khẩu thất bại');
    }
  };

  return (
    <div className='mainBodyUser'>
      <Header />
      <div className="profile-container">
        <div className="avatar-section">
          {uploading ? (
            <div className="loading-spinner"></div>
          ) : (
            <img
              src={previewSrc || (userInfo?.avatar ? `${process.env.REACT_APP_UPLOAD_URL}/${userInfo.avatar}` : defaultAvatar)}
              alt="Avatar"
              className="avatar"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
          <button onClick={() => fileInputRef.current.click()}>Đổi</button>
          {avatarFile && <button onClick={handleUpload} disabled={uploading}>Tải lên</button>}
        </div>
        <div className="info-section">
          <h2>Thông tin tài khoản</h2>
          {editMode ? (
            <div className="edit-form">
              <label>
                <span>Tên:</span>
                <input type="text" name="name" value={updatedUserInfo.name} onChange={handleInputChange} />
              </label>
              <label>
                <span>Email:</span>
                <input type="email" name="email" value={updatedUserInfo.email} onChange={handleInputChange} />
              </label>
              <button className="change-avatar" onClick={handleUpdateUserInfo}>Lưu</button>
              <button className="cancel" onClick={() => setEditMode(false)}>Huỷ</button>
            </div>
          ) : (
            <div className="user-info">
              <p><strong>Username:</strong> {userInfo?.username}</p>
              <p><strong>Email:</strong> {userInfo?.email}</p>
              <p><strong>Tên:</strong> {userInfo?.name}</p>
              <button onClick={() => setEditMode(true)}>Sửa</button>
              <button onClick={() => setChangePasswordMode(true)}>Đổi mật khẩu</button>
            </div>
          )}
          {changePasswordMode && (
            <div className="change-password-form">
              <label>
                <span>Mật khẩu cũ:</span>
                <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
              </label>
              <label>
                <span>Mật khẩu mới:</span>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              </label>
              <button onClick={handleChangePassword}>Xác nhận</button>
              <button onClick={() => setChangePasswordMode(false)}>Huỷ</button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
