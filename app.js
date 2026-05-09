function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

function UI(){}

UI.prototype.addBookToList = function(book){

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

UI.prototype.clearField = function(){
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
}

UI.prototype.clearTask = function(){
    document.querySelector("#book-list").innerHTML = "";
    setTimeout(function(){
    
    },1000);
}

UI.prototype.removeTask = function(element,message,className){
    element.parentElement.parentElement.remove();
    this.showAlert("Book Deleted Successfully", "danger");

}

UI.prototype.checkDuplicate = function(isbn){

    const books = document.querySelectorAll("#book-list tr");

    let duplicate = false;

    books.forEach(function(book){

        const bookIsbn = book.children[2].textContent;

        if(bookIsbn === isbn){

            duplicate = true;

        }

    });

    return duplicate;

    setTimeout(function(){
        
    }, 1000);

}

UI.prototype.showAlert = function(message, className){

    const container = document.querySelector(".container");

    const form = document.querySelector("#book-form");

    const div = document.createElement("div");

    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));

    container.insertBefore(div, form);

    setTimeout(function(){
        div.remove();
    }, 1000);

}


document.querySelector("#book-form").addEventListener("submit", function(e){

    e.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;

    const ui = new UI()

    if(title === "" || author === "" || isbn === ""){
        alert("Please fill all fields");
    }
    else if(ui.checkDuplicate(isbn)){

    ui.showAlert("Duplicate ISBN Not Allowed", "warning");

   }

    else{

        const ui = new UI();
        const book = new Book(title, author, isbn);

        ui.addBookToList(book);
        ui.clearField();
        ui.showAlert("Book Added Successfully", "success");
        

    }

});

document.querySelector("#clear-task").addEventListener("click", function(){

    const ui = new UI();
    ui.clearTask();
    ui.showAlert("All the Book Lists deleted Successfully", "danger")
});

document.querySelector("#book-list").addEventListener("click", function(e){

    if(e.target.classList.contains("delete")){

        const ui = new UI();
        ui.removeTask(e.target);

    }

});




