// Fetch book details from the JSON file
fetch('books.json')
    .then(response => response.json())
    .then(books => {

        // References
        const searchInput = document.getElementById("searchInput");
        const bookList = document.querySelector(".books");
        const categoryFilter = document.getElementById("category");

        // Render Books Function
        function renderBooks(filteredBooks) {
            bookList.innerHTML = ""; // Clear existing content
            
            if (filteredBooks.length === 0) {
                bookList.innerHTML = "<p>No books found matching your criteria.</p>";
            } else {
                filteredBooks.forEach(book => {
                    const bookCard = document.createElement("div");
                    bookCard.className = "book-card";
                    bookCard.innerHTML = `
                        <img src="${book.image}" alt="${book.title}">
                        <h3>${book.title}</h3>
                        <p>Author: ${book.author}</p>
                        <p>Categories: ${book.categories.join(", ")}</p>
                        <p>Rental Price: ${book.price}</p>
                        <a href="Book-Detail.html?id=${book.id}" class="details-btn">View Details</a>
                    `;
                    bookList.appendChild(bookCard);
                });
            }
        }

        // Category Filter Logic
        categoryFilter.addEventListener("change", () => {
            const selectedCategory = categoryFilter.value;
            filterAndRenderBooks(selectedCategory);
        });

        // Live Search Logic
        searchInput.addEventListener("input", () => {
            const query = searchInput.value.toLowerCase();
            const selectedCategory = categoryFilter.value;
            filterAndRenderBooks(selectedCategory, query);
        });

        // Filter Books by Category and Search Query
        function filterAndRenderBooks(categoryFilterValue, searchQuery = "") {
            let filteredBooks = books;

            // Filter by Category
            if (categoryFilterValue !== "all") {
                filteredBooks = filteredBooks.filter(book => book.categories.includes(categoryFilterValue));
            }

            // Filter by Search Query
            if (searchQuery) {
                filteredBooks = filteredBooks.filter(book => 
                    book.title.toLowerCase().includes(searchQuery) ||
                    book.author.toLowerCase().includes(searchQuery)
                );
            }

            // Render the filtered books
            renderBooks(filteredBooks);
        }

        // Initial Render (with all books displayed)
        filterAndRenderBooks("all");
    })
.catch(error => {
    console.error("Error loading book data:", error);
});