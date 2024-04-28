const url = "https://striveschool-api.herokuapp.com/books";
const cardSection = document.querySelector("#cardSection");
let totalCart = document.querySelector("#total")

const getBookCard = async () => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return data

    } catch (error) {
        console.log();
    }
}

getBookCard().then(res => {
    cardSection.innerHTML = res
    .map((book) => {
        return /* HTML */ `<div class="col-12 col-md-3">
        <div id="book-${book.asin}" class="card mb-3 rounded-3 shadow">
            <a href="dettagli.html?id=${book.asin}"><img src="${book.img}" alt=""></a>
            <div class="card-body">
                <p class="text-truncate book-title"> ${book.title} </p>
                <p class="book-price"> ${book.price}€</p>
                <button class="btn btn-primary" onclick="addCart('${book.asin}', '${book.title}', '${book.price}')">Aggiungi al Carrello</button>
                <button class="btn btn-primary" onclick="hideBook('${book.asin}')">Salta</button>
            </div>
        </div>
    </div>`
    }).join("")
    // let btnCart = document.querySelectorAll(".card-body button");
    // btnCart = Array.from(btnCart)
    // console.log(cardSection);
    // btnCart.forEach(btn => {
    //     btn.addEventListener("click", function (){
    //         const bookID = this.parentElement.parentElement.id
    //         const bookTitle = document.querySelector(".card-body .book-title").textContent
    //         const bookPrice = document.querySelector(".card-body .book-price").textContent
    //         addCart(bookID, bookTitle, bookPrice)
    //     })
    // })
})

const addCart = (asin, title, price) => {
    const bookList = document.querySelector("#cart-products");
    const bookCard = document.querySelector("#book-" + asin)
    bookCard.classList.add("book-purchased");

    bookList.innerHTML += `<li class="d-flex align-items-center">${title} ${price} 
    <button class="btn btn-danger" onclick="removeChart(event, ${price}, '${asin}')">Rimuovi dal carrello</button></li>`
    totalCart.innerHTML = (Number(totalCart.innerText) + Number(price)).toFixed(2)
}

const emptyAllCart = () => {
    document.querySelector("#cart-products").innerHTML = "";
    let allCard = document.querySelectorAll(".card")
    allCard = Array.from(allCard).forEach(card => card.classList.remove("book-purchased"))
    totalCart.textContent = "0"
}

const removeChart = (event, price, asin) => {
    event.target.closest("li").remove()
    totalCart.innerText = (Number(totalCart.innerText) - Number(price)).toFixed(2)
    const card = document.querySelector("#book-" + asin)
    console.log(card);
    card.classList.remove("book-purchased")
}

const hideBook = (asin) => {
    const book = document.querySelector("#book-" + asin)
    book.classList.add("hide-book");
}