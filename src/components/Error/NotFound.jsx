import React from 'react';
import { Link } from 'react-router-dom';
// import svg404 from '../assets/Images/404.svg';

const NotFound = () => {
  return (
      <>
          <div className="cont-404">
              <img src={'https://admiral.digital/wp-content/uploads/2023/08/404_page-not-found.png'} alt="svg" style={{ width: '1000px' }}/>
              <div style={{ marginLeft: '500px' }}>
                <Link to="/">
                    <button>Về trang chủ</button>
                </Link>
                </div>

             
          </div>

          
      </>
  );
};

export default NotFound;
