import { useState, useEffect } from 'react';
import BookService from '../service/BookService/BookService';
import BookCard from '../components/BookCard/BookCard';
import { Link } from 'react-router-dom';

function AllBooks() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    filterBooks();
  }, [searchQuery, selectedCategory, books]);

  const fetchBooks = async () => {
    try {
      const booksData = await BookService.getAllBooks();
      setBooks(booksData);
      setFilteredBooks(booksData); // Initialize filteredBooks with all books
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setSelectedCategory(''); // Reset selected category when typing in the search bar
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSearchQuery(''); // Reset search query when changing the category
  };

  const filterBooks = () => {
    const query = searchQuery.toLowerCase();
    const filtered = books.filter((book) => {
      const matchesQuery = book.name.toLowerCase().includes(query);
      const matchesCategory = selectedCategory ? book.category === selectedCategory : true;
      return matchesQuery && matchesCategory;
    });
    setFilteredBooks(filtered);
  };

  // Extract unique categories from books for the dropdown
  const uniqueCategories = [...new Set(books.map(book => book.category))];

  return (
    <div className="font-poppins container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mt-6 mb-10">All Books</h1>

      <div className="mb-6 flex">
        <select
          className='bg-primary text-white font-bold'
          name="categories"
          id="categories"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option className='text-black' value="">Select a category</option>
          {uniqueCategories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-3 border-2 border-black"
        />
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <Link to={`/view-book/${book.id}`} className='transition ease-in-out hover:scale-110 cursor-pointer'>
            <BookCard book={book} />
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default AllBooks;
