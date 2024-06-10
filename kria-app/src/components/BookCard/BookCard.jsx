

function BookCard({ book }) {
    return (
      <li className="border p-4 rounded-lg shadow-md flex flex-col">
        <img
          src={book.photo}
          alt={book.name}
          className="h-48 w-full object-cover rounded-lg mb-4"
        />
        <div className="flex flex-col justify-between flex-1">
          <div>
            <h1 className="text-xl font-bold">{book.name}</h1>
            <div className="flex items-center mt-2">
              <span className="text-yellow-500 text-xl">★★★★★</span>
              <span className="ml-2 text-sm text-gray-600">{book.rating}(1)</span>
            </div>
            <p className="mt-2 text-gray-700  mb-4 line-clamp-3">{book.description}</p>
          </div>
          <div className="mt-4">
            <h1 className="text-sm text-gray-500">Pages: {book.pages}</h1>
            <h1 className="text-sm text-gray-500">Category: {book.category}</h1>
          </div>
        </div>
      </li>
    );
}

export default BookCard;