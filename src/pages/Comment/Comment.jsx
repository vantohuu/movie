import React, { useState, useEffect } from 'react';
import { getCommentsByMovie, createComment } from '../../Utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Comment = ({ movieId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [rating, setRating] = useState(0);
    const [showRatingAlert, setShowRatingAlert] = useState(false);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const commentsData = await getCommentsByMovie(movieId);
                // setComments(commentsData.reverse()); // Sắp xếp danh sách bình luận từ mới nhất đến cũ nhất
                setComments(commentsData);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [movieId]);

    const handleCommentSubmit = async () => {
        if (rating === 0) {
            setShowRatingAlert(true);
            return;
        }

        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const newCommentData = {
                movieId,
                username: userInfo.username,
                name: userInfo.name,
                avatar: userInfo.avatar,
                comment: newComment,
                value: rating,
                date: new Date()
            };

            const response = await createComment(newCommentData);
            setComments([response.data, ...comments]); // Thêm bình luận mới vào đầu mảng để hiển thị đầu danh sách
            setNewComment('');
            setRating(0);
            setShowRatingAlert(false);
        } catch (error) {
            console.error('Error creating comment:', error);
        }
    };

    const renderStars = (value) => {
        return (
            <>
                {[...Array(value)].map((_, index) => (
                    <FontAwesomeIcon key={index} icon={faStar} className="star-filled" />
                ))}
                {[...Array(5 - value)].map((_, index) => (
                    <FontAwesomeIcon key={index} icon={faStar} className="star-empty" />
                ))}
            </>
        );
    };

    const handleStarClick = (value) => {
        setRating(value);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <div className='list-comment'>
            <h2 className='text' style={{ textAlign: 'center' }}>Bình luận</h2>
            <div className="comment-section">
                <div className="new-comment">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Nhập bình luận của bạn..."
                    />
                    <br />
                    <div className="rating">
                        {[1, 2, 3, 4, 5].map((value) => (
                            <FontAwesomeIcon
                                key={value}
                                icon={faStar}
                                className={value <= rating ? 'star-filled' : 'star-empty'}
                                onClick={() => handleStarClick(value)}
                            />
                        ))}
                    </div>
                    {showRatingAlert && <p>Vui lòng đánh giá ít nhất 1 sao trước khi gửi bình luận</p>}
                    <button onClick={handleCommentSubmit}>Gửi</button>
                </div>
                {comments.length > 0 ? (
                    <ul className="comment-list">
                        {comments.map(comment => (
                            <li key={comment.idComment} className="comment-item">
                                <div className="comment-header">
                                    <img src={`${process.env.REACT_APP_UPLOAD_URL}/${comment.avatar}`} alt={comment.name} className="comment-avatar" />
                                    <span className="comment-name">{comment.name}</span>
                                    <span className="comment-date">{formatDate(comment.date)}</span>
                                    <div className="comment-rating">{renderStars(comment.value)}</div>
                                </div>
                                <div className="comment-content">{comment.comment}</div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-comment">Không có bình luận</p>
                )}
            </div>
        </div>
    );
};

export default Comment;
