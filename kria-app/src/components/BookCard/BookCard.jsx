import { useEffect, useState } from "react";
import StarService from "../../service/StarService/StarService";

function BookCard({ book }) {
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchAllRatings = async () => {
      try {
        if (book && book.id) { // Check if book and book.id are defined
          // Fetch all ratings for the book
          const response = await StarService.getStarsbybookId(book.id);
          console.log("All ratings:", response);

          // Calculate the average rating
          if (response.length > 0) {
            const ratings = response.map(item => item.starRatings); // Extract ratings
            const sum = ratings.reduce((acc, rating) => acc + rating, 0); // Calculate sum
            const averageRating = sum / ratings.length; // Calculate average
            setAverageRating(averageRating);
          } else {
            setAverageRating(0); // Set the average rating to 0 if no ratings found
          }
        }
      } catch (error) {
        console.error('Error fetching ratings:', error);
        setAverageRating(0); // Set the average rating to 0 in case of an error
      }
    };

    fetchAllRatings();
  }, [book]); // Add book as a dependency

  return (
    <li className="border p-4 rounded-lg shadow-md flex flex-col">
      {book && ( // Check if book is defined
        <>
          <img
            src={book.photo}
            alt={book.name}
            className="h-48 w-full object-cover rounded-lg mb-4"
          />
          <div className="flex flex-col justify-between flex-1">
            <div>
              <h1 className="text-xl font-bold mb-4 mt-8">{book.name}</h1>
              <div className="flex items-center mt-2">
                <span className="text-yellow-500 text-xl">★★★★★</span>
                <span className="ml-2 text-sm text-gray-600 flex">
                  {book.rating}
                  <h1 className="text-yellow-500">({averageRating})</h1>
                  <h1 className="text-yellow-500">★)</h1>
                </span>
              </div>
              <p className="mt-2 text-gray-700  mb-4 line-clamp-3">{book.description}</p>
            </div>
            <div className="mt-4">
              <h1 className="text-sm text-gray-500">Pages: {book.pages}</h1>
              <h1 className="text-sm text-gray-500">Category: {book.category}</h1>
            </div>
          </div>
        </>
      )}
    </li>
  );
}

export default BookCard;
