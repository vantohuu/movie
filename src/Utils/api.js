import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


export const getAuthToken = () => {
    return window.localStorage.getItem('token');
};

export const setAuthHeader = (token) => {
    if (token !== null) {
        window.localStorage.setItem("token", token);
    } else {
        window.localStorage.removeItem("token");
    }
};

axios.defaults.baseURL = 'http://localhost';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const request = async (method, url, data) => {
    let headers = {};
    if (getAuthToken() !== null && getAuthToken() !== "null") {
        headers = {'Authorization': `Bearer ${getAuthToken()}`};
    }

    try {
        const response = await axios({
            method: method,
            url: url,
            headers: headers,
            data: data
        });
        return response.data.data;
    } catch (error) {
        console.error('API Request Error:', error);
        throw error;
    }
};

const createAxiosRequest = async (method, url) => {
    try {
        const token = getAuthToken();
        const response = await axios.get(url, { headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } });
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching ${url}:`, error);
        throw error;
    }
};



export const register = async (username, password, email) => {
    try {
      const response = await axios.post(`api/login/signup`, { username, password, email, roleId: 1 });
      return response.data;
    } catch (error) {
        console.error('Error signup', error);
      throw error.response.data;
    }
  };


export const login = async (username, password, email) => {
    try {
        const response = await axios.post('/api/login/signin', { username, password, email });
        const responseData = response.data;

        if (responseData.success) {
            const token = responseData.data;
            setAuthHeader(token);

            // Giải mã token để lấy thông tin người dùng
            const userInfo = await getUserInfo(token);

            // Lưu token và thông tin người dùng vào localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('userInfo', JSON.stringify(userInfo));

            return responseData;
        } else {
            throw new Error('Invalid credentials'); // Xử lý lỗi đăng nhập không hợp lệ
        }
    } catch (error) {
        if (error.response) {
            // Lỗi từ server
            console.error('Login Error:', error.response.data);
        } else if (error.request) {
            // Yêu cầu đã được gửi nhưng không có phản hồi
            console.error('No response received:', error.request);
        } else {
            // Một lỗi khác đã xảy ra khi thiết lập yêu cầu
            console.error('Error setting up request:', error.message);
        }
        throw error;
    }
};



export const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        return false;
    }

    const decodedToken = jwtDecode(token); // Giải mã token để lấy thông tin payload
    const tokenExpiration = decodedToken.exp * 1000; // Chuyển giây thành mili-giây

    const currentTime = Date.now();
    if (currentTime > tokenExpiration) {
        return false;
    }

    return true;
};


export const getUserInfo = async () => {
    try {
        const token = getAuthToken();
        const decodedToken = jwtDecode(token);
        const id = decodedToken.sub;

        const response = await axios.get(`/api/movie-user/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching user info:', error);
        throw error;
    }
};

export const uploadUserAvatar = async (formData) => {
    try {
      const response = await axios.post(`/api/movie-user/upload`, formData, {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      // Cập nhật lại thông tin người dùng trong localStorage
      const token = getAuthToken();
      const userInfo = await getUserInfo(token);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
  
      return response.data.data;
    } catch (error) {
      throw error;
    }
  };

  export const updateUserInfo = async (userData) => {
    try {
        const response = await axios.put(`/api/movie-user/update`, userData, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`,
                'Content-Type': 'application/json'
            }
        });

        // Cập nhật lại thông tin người dùng trong localStorage
        const token = getAuthToken();
        const userInfo = await getUserInfo(token);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        return response.data;
    } catch (error) {
        throw error;
    }
};




export const getMoviesForHomePage = async (loaiPhim) => {
    try {
        const response = await request('GET', `/api/movie/get-phim-trang-chu/${loaiPhim}`);
        return response;
    } catch (error) {
        console.error('Error fetching movies for homepage:', error);
        throw error;
    }
};


export const getAllMovies = async () => createAxiosRequest('GET', '/api/movie/get-all');
export const getMovieDetail = async (movieId) => createAxiosRequest('GET', `/api/movie/${movieId}`);

export const getAllMoviesByCategory = async (category_id) => createAxiosRequest('GET', `/api/movie/get-all-by-category?category_id=${category_id}`);
export const getAllMoviesByCountry = async (country_id) => createAxiosRequest('GET', `/api/movie/get-all-by-country?country_id=${country_id}`);
export const getNewMovies = async (top) => createAxiosRequest('GET', `/api/movie/get-new-movies?top=${top}`);
export const getMoviesRandom = async (top) => createAxiosRequest('GET', `/api/movie/get-random?top=${top}`);
export const getAllCountries = async () => createAxiosRequest('GET', '/api/country/get-all');
export const getCountryDetail = async (countryId) => createAxiosRequest('GET', `/api/country/${countryId}`);
export const getAllCategories = async () => createAxiosRequest('GET', '/api/category/get-all');

export const getAllPersons = async () => createAxiosRequest('GET', '/api/person/get-all');
export const getPersonDetail = async (personId) => createAxiosRequest('GET', `/api/person/${personId}`);


export const getCategoryNameById = async (category_id) => {
    try {
        const token = getAuthToken();
        const category = await createAxiosRequest('GET', `/api/category/${category_id}`, token);
        return category.name;
    } catch (error) {
        console.error('Error fetching category name:', error);
        throw error;
    }
};


export const getCountryNameById = async (country_id) => {
    try {
        const token = getAuthToken();
        const country = await createAxiosRequest('GET', `/api/country/${country_id}`, token);
        return country.name;
    } catch (error) {
        console.error('Error fetching country name:', error);
        throw error;
    }
};

export const saveMovieToCollection = async (movieCollection) => {
    try {
        const token = getAuthToken();
        const response = await axios.post('/api/movie-collection/create', movieCollection, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error saving movie to collection:', error);
        throw error;
    }
};

export const checkMovieCollectionExists = async (movieId, username) => {
    try {
        const response = await axios.get(`/api/movie-collection/check-exists-collection`, {
            params: {
                movieId: movieId,
                username: username
            },
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data.data;
    } catch (error) {
        console.error('Error checking movie purchase:', error);
        throw error;
    }
};

export const deleteCollectionByMovieAndUser = async (movieId, username) => {
    try {
        const response = await axios.delete(`/api/movie-collection/delete-by-movie-and-user`, {
            params: {
                movieId: movieId,
                username: username
            },
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting movie collection:', error);
        throw error;
    }
};

// Thêm hàm mới để lấy phim đã lưu của người dùng hiện tại
export const getAllMoviesByUser = async (username) => {
    try {
        const response = await axios.get(`/api/movie-collection/get-all-by-user?username=${username}`, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching movies by user:', error);
        throw error;
    }
};



  
  export const verifyAccount = async (email, otp, newPass) => {
    try {
      const response = await axios.get(`api/login/verify-account`, { params: { email, otp, newPass, roleId:1 } });
      return response.data;
    } catch (error) {
        console.error('Error verify account', error);
      throw error.response.data;
    }
  };
// export const verifyAccount = async (email, otp, newPass) => {
//     try {
//       const response = await axios.get('/api/login/verify-account', {
//         params: {
//           email,
//           otp,
//           newPass,
//           roleId:1
//         },
//       });
//       return response.data; // Giả sử response.data chứa đối tượng ResponseData
//     } catch (error) {
//       throw new Error(error.response.data.message || 'OTP verification failed');
//     }
//   };

export const resetPassword = async (username,email, newPassword) => {
    try {
        const response = await axios.put('/api/login/change-pass-otp', { username,email, newPassword });
        return response.data;
    } catch (error) {
        console.error('API reset password error:', error);
        return { success: false, error: 'Có lỗi xảy ra. Vui lòng thử lại.' };
    }
};




export const createComment = async (commentData) => {
    try {
        const response = await axios.post('/api/comment/create', commentData, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating comment:', error);
        throw error;
    }
};

export const getCommentsByMovie = async (movieId, offset = 0, pageSize = 10) => {
    try {
        const token = getAuthToken();
        const response = await axios.get(`/api/comment/get-page-by-movie?movieId=${movieId}&offset=${offset}&pageSize=${pageSize}`, {
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json' 
            }
        });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching comments by movie:', error);
        throw error;

    }
};



// Thanh tìm kiếm
export const searchMovies = async (searchTerm) => {
    try {
        const response = await request('GET', `/api/movie/get-all?searchContent=${searchTerm}`);
        return response;
    } catch (error) {
        console.error('Error searching movies:', error);
        throw error;
    }
};



// Thêm API mua phim
export const createMoviePurchase = async (movieBuyDTO) => {
    try {
        const token = getAuthToken();
        const response = await axios.post('/api/movie-buy/create', movieBuyDTO, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating movie purchase:', error);
        throw error;
    }
};

export const checkMoviePurchaseExists = async (movieId, username) => {
    try {
        const response = await axios.get(`/api/movie-buy/check-exists-buy`, {
            params: {
                movieId: movieId,
                username: username
            },
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data.data;
    } catch (error) {
        console.error('Error checking movie purchase:', error);
        throw error;
    }
};




//Bought Movies
export const getAllMoviesBoughtByUser = async (username) => {
    try {
        const response = await axios.get(`/api/movie-buy/get-all-by-user?username=${username}`, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching movies bought by user:', error);
        throw error;
    }
};

export const buyMovie = async (movieBuyData) => {
    try {
        const response = await axios.post('/api/movie-buy/create', movieBuyData, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error buying movie:', error);
        throw error;
    }
};

export const deleteMovieBuy = async (movieId, username) => {
    try {
        const response = await axios.delete(`/api/movie-buy/delete-by-movie-and-user?movieId=${movieId}&username=${username}`, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting movie buy:', error);
        throw error;
    }
};




//vnpay
export const createVNPayPayment = async (paymentData) => {
    try {
        const response = await axios.post('/api/payment/vnpay/create', paymentData, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
                // 'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating VNPay payment:', error);
        throw error;
    }
};

export const verifyVNPayPayment = async (paymentData) => {
    try {
        const response = await axios.post('/api/payment/vnpay/return', paymentData, {
            headers: {
                Authorization: `Bearer ${getAuthToken()}`,
                // 'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error verifying VNPay payment:', error);
        throw error;
    }
};


export const changeUserPassword = async (username, oldPass, newPass) => {
    try {
        const response = await axios.post('/api/movie-user/change-pass', {
            username: username,
            password: oldPass,
            newPassword: newPass
        }, {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Request failed with status code', error.response.status);
            console.error('Response data:', error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
        throw error;
    }
};

