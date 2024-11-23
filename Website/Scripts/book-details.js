// Utility Function: Get Query Parameter by Name
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = 'Book-Listing.html'; // Fallback URL
    }
}

// Fetch book details from the JSON file
fetch('books.json')
    .then(response => response.json())
    .then(books => {
        // Get Book ID from URL (ensure it is a valid number)
        const bookId = parseInt(getQueryParam("id"));
        const selectedBook = books.find(book => book.id === bookId);

        // Reference the Containers
        const bookCoverContainer = document.getElementById("book-cover");
        const bookInfoContainer = document.querySelector(".info");

        if (selectedBook) {
            // Set the book cover
            bookCoverContainer.src = selectedBook.image;
            bookCoverContainer.alt = selectedBook.title;

            // Populate the book information
            const categoriesList = selectedBook.categories?.length
                ? selectedBook.categories.join(", ")
                : "No categories available";

            bookInfoContainer.innerHTML = `
                <h1>${selectedBook.title}</h1>
                <p><strong>Author:</strong> ${selectedBook.author}</p>
                <p><strong>Categories:</strong> ${categoriesList}</p>
                <p><strong>Price:</strong> ${selectedBook.price}</p>
                <p><strong>Description:</strong> ${selectedBook.description}</p>
                <button id="rent-btn">Rent Now</button>
                <button onclick="goBack();" id="close-btn">Go Back</button>
            `;
        } else {
            bookInfoContainer.innerHTML = `
                <p>Book not found. Please go back to the <a href="Book-Listing.html">book listing page</a>.</p>
            `;
        }
    })
.catch(error => {
    console.error("Error loading book data:", error);
});