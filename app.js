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

UI.prototype.removeTask = function(element){
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

UI.prototype.showAlert = function(message, type){

    this.clearAlert()

    const div = document.createElement("div");

    div.className = `alert alert-${type}`;

    div.innerHTML = message;

    document.querySelector(".show-alert").appendChild(div)

    setTimeout(function(){
        document.querySelector(".alert").remove()
    },1000)
}

UI.prototype.clearAlert = function(){
    const currentAlert = document.querySelector(".alert")

    if(currentAlert){
        currentAlert.remove();
    }
}


document.querySelector("#book-form").addEventListener("submit", function(e){

    e.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;

    const ui = new UI()

    if(title === "" || author === "" || isbn === ""){
        ui.showAlert("Please Fill the Fields", "danger");
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

    if(document.querySelector("#book-list").children.length === 0){
        ui.showAlert("Book Lists are empty doesn't delete", "warning");

    }
    else{
        ui.clearTask();
        ui.showAlert("All the Book Lists deleted Successfully", "danger");
    }
    
});

document.querySelector("#book-list").addEventListener("click", function(e){

    if(e.target.classList.contains("delete")){

        const ui = new UI();
        ui.removeTask(e.target);

    }

});




