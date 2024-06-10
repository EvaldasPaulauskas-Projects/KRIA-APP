import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart, faThumbsUp, faThumbsDown, faUser,faEdit  } from '@fortawesome/free-solid-svg-icons';
import BookService from "../../service/BookService/BookService";
import CommentService from "../../service/CommentService/CommentService";
import UserService from "../../service/UserService/UserService"; // Import the UserService


function ViewBook() {
    const { id } = useParams();

    const [bookData, setBookData] = useState({
        name: '',
        description: '',
        isbn: '',
        photo: '',
        pages: '',
        category: ''
    });
    const [rating, setRating] = useState(0);
    const [favorites, setFavorites] = useState([]);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [userProfile, setUserProfile] = useState(null);

    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedCommentText, setEditedCommentText] = useState('');

    useEffect(() => {
        async function fetchBookById() {
            try {
                const book = await BookService.getBookById(id);
                setBookData({
                    name: book.name,
                    description: book.description,
                    isbn: book.isbn,
                    photo: book.photo,
                    pages: book.pages,
                    category: book.category
                });
            } catch (error) {
                console.error('Error fetching book:', error);
            }
        }

        async function loadComments() {
            try {
                const comments = await CommentService.getAllComments();
                const filterdOutComments = comments.filter(comment  => comment.bookId == id);

                console.log(filterdOutComments, "ADDD")
                setComments(filterdOutComments);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        }

        async function fetchUserProfile() {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const profile = await UserService.getYourProfile(token);
                    setUserProfile(profile.ourUsers);
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        }

        fetchBookById();
        loadComments();
        fetchUserProfile();
    }, [id]);

    const handleAddComment = async (event) => {
        event.preventDefault();
        try {
            const commentData = {
                userId: userProfile.id,
                bookId: id,
                username: userProfile.name,
                comment: commentText
            };
            const newComment = await CommentService.addComment(commentData, userProfile.token);
            setComments([...comments, newComment]);
            setCommentText('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await CommentService.deleteComment(commentId);
            const updatedComments = comments.filter(comment => comment.id !== commentId);
            setComments(updatedComments);
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    const handleEditComment = async (commentId, newCommentText) => {
        try {
            const editedComment = await CommentService.editComment(commentId, { comment: newCommentText });
            const updatedComments = comments.map(comment => {
                if (comment.id === commentId) {
                    return { ...comment, comment: editedComment.comment };
                }
                return comment;
            });
            setComments(updatedComments);
            setEditingCommentId(null); // Reset editing state
        } catch (error) {
            console.error('Error editing comment:', error);
        }
    };

    return (
        <div className="">
            <div className=" flex items-center">
                <div className="ml-48 my-20">
                    <img src={bookData.photo} alt={bookData.name} className="w-[35rem] h-auto border-4 border-black" />
                    <div className="flex gap-8 mt-4">
                        <p className="text-xl">Category: {bookData.category}</p>
                        <p className="text-xl">ISBN: {bookData.isbn}</p>
                    </div>
                </div>
                <div className="ml-16 flex gap-8 flex-col mb-36">
                    <h1 className="text-4xl font-bold">{bookData.name}</h1>
                    <p className="text-2xl">{bookData.description}</p>
    
                    <div className="mt-8 flex flex-col gap-2">
                        <h2 className="text-2xl font-bold">Rate this book</h2>
                        <div>
                            {[1, 2, 3, 4, 5].map((value) => (
                                <button key={value} onClick={() => setRating(value)} className={`focus:outline-none ${value <= rating ? 'text-yellow-500' : 'text-gray-300'}`}>
                                    <FontAwesomeIcon icon={faStar} className="text-2xl" />
                                </button>
                            ))}
                        </div>
                    </div>
    
                    <button onClick={() => setFavorites(!favorites)} className={`font-bold py-2 px-4 rounded mt-4 text-xl border-2 border-black w-96 ${favorites ? 'text-red-500' : 'text-black'}`}>
                        {favorites ? 'Remove from Favorites' : 'Add to Favorites'} <FontAwesomeIcon icon={favorites ? faHeart : faHeart} />
                    </button>
                </div>
            </div>
    
            <div>
                <div>
                    <div className="w-full bg-white rounded-lg pl-44 pr-24 p-12">
                        <h3 className="font-bold">Comments</h3>
                        <form onSubmit={handleAddComment}>
                            <div className="w-full px-3 my-2">
                                <textarea
                                    className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                                    placeholder='Type Your Comment' required value={commentText} onChange={(e) => setCommentText(e.target.value)}></textarea>
                            </div>
                            <div className="w-full flex justify-end px-3">
                                <button type='submit' className="px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500">Post Comment</button>
                            </div>
                        </form>
    
                        {comments.map((comment, index) => (
                            <div key={index} className="border rounded-md p-3 ml-3 my-3">
                                <div className="flex gap-3 items-center">
                                    <FontAwesomeIcon icon={faUser} className="text-gray-400" />
                                    <h3 className="font-bold">{comment.username}</h3>
                                    {comment.userId === userProfile.id && (
                                        <>
                                            <button onClick={() => handleDeleteComment(comment.id)} className="text-red-500 hover:text-blue-500">Delete</button>
                                            {editingCommentId === comment.id ? (
                                                <>
                                                    <button onClick={() => handleEditComment(comment.id, editedCommentText)} className="text-green-500 hover:text-blue-500">Save</button>
                                                    <button onClick={() => setEditingCommentId(null)} className="text-gray-500 hover:text-blue-500">Cancel</button>
                                                </>
                                            ) : (
                                                <button onClick={() => {
                                                    setEditingCommentId(comment.id);
                                                    setEditedCommentText(comment.comment);
                                                }} className="text-yellow-500 hover:text-blue-500"><FontAwesomeIcon icon={faEdit} /> Edit</button>
                                            )}
                                        </>
                                    )}
                                </div>
                                {editingCommentId === comment.id ? (
                                    <textarea
                                        className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                                        value={editedCommentText}
                                        onChange={(e) => setEditedCommentText(e.target.value)}
                                    ></textarea>
                                ) : (
                                    <p className="text-gray-600 mt-2">{comment.comment}</p>
                                )}
                                <div className="flex gap-3 mt-2">
                                    <button onClick={() => CommentService.likeComment(comment.id)} className="text-gray-500 hover:text-blue-500"><FontAwesomeIcon icon={faThumbsUp} /> Likes: {comment.likes}</button>
                                    <button onClick={() => CommentService.dislikeComment(comment.id)} className="text-gray-500 hover:text-blue-500"><FontAwesomeIcon icon={faThumbsDown} /> Dislikes: {comment.dislikes}</button>
                                </div>
                                <p className="text-gray-600 mt-2">Date: {new Date(comment.date).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default ViewBook;
