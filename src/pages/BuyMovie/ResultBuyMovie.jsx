import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { verifyVNPayPayment } from '../../Utils/api';

const ResultBuyMovie = () => {
    const location = useLocation();
    const [status, setStatus] = useState('loading');
    
    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const vnp_Amount = query.get('vnp_Amount');
        const vnp_ResponseCode = query.get('vnp_ResponseCode');
        const vnp_TxnRef = query.get('vnp_TxnRef');
        const vnp_OrderInfo = query.get('vnp_OrderInfo');

        const paymentData = {
            vnp_Amount,
            vnp_ResponseCode,
            vnp_TxnRef,
            vnp_OrderInfo
        };
        // if (vnp_ResponseCode === "00") {
        //     setStatus('success');
        // }
        // paymentData.vnp_ResponseCode === "00"

        verifyVNPayPayment(paymentData)
            .then(response => {
                if (response.vnp_ResponseCode === '00') {
                    setStatus('success');
                } else {
                    setStatus('failure');
                }
            })
            .catch(error => {
                console.error('Payment verification failed:', error);
                setStatus('failure');
            });
    }, [location.search]);

//     const verifyPayment = async () => {
//         try {
//             const response = await verifyVNPayPayment(paymentData);
//             // response.vnp_ResponseCode = "00"
//             if (response.vnp_ResponseCode === '00') {
//                 setStatus('success');
//             } else {
//                 setStatus('failure');
//             }
//         } catch (error) {
//             console.error('Payment verification failed:', error);
//             setStatus('failure');
//         }
//     };

//     verifyPayment();
// }, [location.search]);
// setStatus('success');
    // };

    

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {status === 'success' ? (
                <div>
                    <h1>Payment Successful!</h1>
                    <p>We received your purchase request; we'll be in touch shortly!</p>
                </div>
                //button to go to home page

            ) :
            status === 'failure' ? 
            (
                <div>
                
                    <h1>Thanh toán thất bại</h1>
                    <p>There was an issue processing your payment; please try again later!</p>
                </div>
            ):(<div>Something went wrong</div>)
                
                }
        </div>
    );
};

export default ResultBuyMovie;


// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';

// const PaymentResult = () => {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const vnp_Amount = searchParams.get('vnp_Amount');
//   const vnp_ResponseCode = searchParams.get('vnp_ResponseCode');
//   const vnp_TxnRef = searchParams.get('vnp_TxnRef');
//   const vnp_OrderInfo = searchParams.get('vnp_OrderInfo');
//   const [htmlContent, setHtmlContent] = useState('');

//   useEffect(() => {
    
//     // const verifyPayment = async () => {
//     //           try {
//     //               const response = await verifyVNPayPayment(paymentData);
//     //               // response.vnp_ResponseCode = "00"
//     //               if (response.vnp_ResponseCode === '00') {
//     //                   setStatus('success');
//     //               } else {
//     //                   setStatus('failure');
//     //               }
//     //           } catch (error) {
//     //               console.error('Payment verification failed:', error);
//     //               setStatus('failure');
//     //           }
//     //       };
//     const fetchPaymentResult = async () => {
//       try {
//         const response = await axios.get(`/api/payment/vnpay/return`, {
//           params: {
//             vnp_Amount,
//             vnp_ResponseCode,
//             vnp_TxnRef,
//             vnp_OrderInfo
//           },
//           responseType: 'text' 
//         });

//         setHtmlContent(response.data);
//       } catch (error) {
//         setHtmlContent('<h1>Đã xảy ra lỗi, vui lòng thử lại sau.</h1>');
//       }
//     };

//     fetchPaymentResult();
//   }, [vnp_Amount, vnp_ResponseCode, vnp_TxnRef, vnp_OrderInfo]);

//   return (
//     <div className="payment-result" dangerouslySetInnerHTML={{ __html: htmlContent }} />
//   );
// };

// export default PaymentResult;
