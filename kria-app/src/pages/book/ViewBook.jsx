import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookService from "../../service/BookService/BookService";


function ViewBoook(){
    const { id } = useParams();

    const [bookData, setBookData] = useState({
        name: '',
        description: '',
        isbn: '',
        photo: '',
        pages: '',
        category: ''
    });

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
                console.error('Error fetching book or categories:', error);
            }
        }

        fetchBookById();
    }, [id]);


    return(
        <div className=" text-xl font-bold ml-24">
            <h1>{id}</h1>
            <h1>{bookData.name}</h1>
            <p>{bookData.description}</p>
            <p>{bookData.category}</p>
            <h1>{bookData.isbn}</h1>
        </div>
    )
}

export default ViewBoook;