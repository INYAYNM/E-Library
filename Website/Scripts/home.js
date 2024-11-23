// Fetch book details from the JSON file
fetch('books.json')
  .then(response => response.json())
  .then(books => {

    // Reference DOM Elements
    const searchInput = document.getElementById("searchInput");
    const bookList = document.querySelector(".books");

    // Function to Render Books
    function renderBooks(bookArray) {
    bookList.innerHTML = ""; // Clear existing content

    if (bookArray.length === 0) {
      bookList.innerHTML = "<p>No books found matching your criteria.</p>";
    } else {
      bookArray.forEach((book) => {
        const bookCard = document.createElement("div");
        bookCard.className = "book-card";
        bookCard.innerHTML = `
        <img src="${book.image}" alt="${book.title}">
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <a href="Book-Detail.html?id=${book.id}" class="rent-btn">Rent Now</a>
        `;
        bookList.appendChild(bookCard);
      });
    }
    }


    // Live Search
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      const filteredBooks = books.filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
      );
      renderBooks(filteredBooks); // Display filtered books
    });

    // Initial Render
    renderBooks(books);
  })
.catch(error => {
    console.error("Error loading book data:", error);
});