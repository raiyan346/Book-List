class Book {

    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {

    addBookToList(book) {
        const list = document.querySelector("#book-list");

        const row = document.createElement("tr");

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td>
            <span class="btn btn-danger delete">X</span>
        </td>
    `;

        list.append(row);
    }

    clearField() {
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#isbn").value = "";
    }

    clearTask() {
        document.querySelector("#book-list").innerHTML = "";
        setTimeout(function () {

        }, 1000);
    }

    removeTask(element) {
        element.parentElement.parentElement.remove();
        this.showAlert("Book Deleted Successfully", "danger");
    }

    checkDuplicate(isbn) {
        const books = document.querySelectorAll("#book-list tr");

        let duplicate = false;

        books.forEach(function (book) {

            const bookIsbn = book.children[2].textContent;

            if (bookIsbn === isbn) {

                duplicate = true;

            }

        });

        return duplicate;

        setTimeout(function () {

        }, 1000);

    }

    showAlert(message, type) {
        this.clearAlert()

        const div = document.createElement("div");

        div.className = `alert alert-${type}`;

        div.innerHTML = message;

        document.querySelector(".show-alert").appendChild(div)

        setTimeout(function () {
            document.querySelector(".alert").remove()
        }, 1000)

    }

    clearAlert() {
        const currentAlert = document.querySelector(".alert")

        if (currentAlert) {
            currentAlert.remove();
        }
    }
}

class Storage {
    getBook() {

        let books;

        if (localStorage.getItem("books") === null) {
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem("books"));
        }

        return books;

    }

    addBooks(book) {
        const books = this.getBook();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books))
    }

    displayBook() {
        const books = this.getBook();

        books.forEach(function (book) {
            const ui = new UI();
            ui.addBookToList(book)
        })
    }

    removeBook(isbn) {
        const books = this.getBook();

        books.forEach(function (book, index) {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        })
        localStorage.setItem("books", JSON.stringify(books))
    }
}


document.querySelector("#book-form").addEventListener("submit", function (e) {

    e.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;

    const ui = new UI()

    const storage = new Storage();

    if (title === "" || author === "" || isbn === "") {
        ui.showAlert("Please Fill the Fields", "danger");
    }
    else if (ui.checkDuplicate(isbn)) {

        ui.showAlert("Duplicate ISBN Not Allowed", "warning");

    }

    else {

        const ui = new UI();
        const book = new Book(title, author, isbn);

        ui.addBookToList(book);
        ui.clearField();
        ui.showAlert("Book Added Successfully", "success");
        storage.addBooks(book)
    }

});

document.querySelector("#clear-task").addEventListener("click", function () {

    const ui = new UI();

    if (document.querySelector("#book-list").children.length === 0) {
        ui.showAlert("Book Lists are empty doesn't delete", "warning");

    }
    else {
        ui.clearTask();
        ui.showAlert("All the Book Lists deleted Successfully", "danger");
    }

});


document.querySelector("#book-list").addEventListener("click", function (e) {

    if (e.target.classList.contains("delete")) {

        const isbn = e.target.parentElement.previousElementSibling.innerHTML;

        const ui = new UI();
        const storage = new Storage();

        ui.removeTask(e.target);
        storage.removeBook(isbn)

    }

});