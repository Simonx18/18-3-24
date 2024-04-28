const url = "https://striveschool-api.herokuapp.com/books";
const params = new URLSearchParams(window.location.search)
const id = params.get("id")

const getBookDetails = async () => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data

    } catch (error) {
        console.log();
    }
}

getBookDetails().then(res => {
    res.map(book =>{
        if (book.asin === id) {
            console.log(book);
            createBookDetails(book.asin, book.img, book.title, book.price, book.category)
        };
    })
})

const createBookDetails = (asin, img, title, price, category) =>{
    const container = document.querySelector("#book-details")
    const bookContainer = document.createElement("div");
    const bookImg = document.createElement("img");
    const cardBody = document.createElement("div");
    const bookTitle = document.createElement("p");
    const bookCategory = document.createElement("p");
    const bookPrice = document.createElement("p");
    const buyBook = document.createElement("button");

    bookImg.src = img;
    bookTitle.textContent = title;
    bookCategory.textContent = category;
    bookPrice.textContent = price + "€";
    buyBook.textContent = "Add to cart";

    bookContainer.classList.add("card-details", "mb-3", "rounded-3", "shadow", "d-flex");
    cardBody.classList.add("card-body");
    buyBook.classList.add("btn", "btn-primary");

    cardBody.append(bookTitle, bookCategory, bookPrice, buyBook);
    bookContainer.append(bookImg, cardBody);
    container.append(bookContainer);

    // buyBook.addEventListener("click", () => {
    //     addCart(asin, title, price);
    // })

}