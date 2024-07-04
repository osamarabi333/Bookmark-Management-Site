let bookNameInput = document.getElementById("bookMarkInput");
let UrlInput = document.getElementById("UrlInput");
let tableContent = document.getElementById("tableContent");
let errorBox = document.getElementById("errorBox");
let closeBtn = document.getElementById("closeBtn");

// To show bookmarks from localStorage
let bookMarksList;

if (localStorage.getItem("bookMarks") === null) {
  bookMarksList = [];
} else {
  bookMarksList = JSON.parse(localStorage.getItem("bookMarks"));
  displayBookMarks(bookMarksList);
}

// Function to add a website to the bookmarks list
function addWebSite() {
  if (
    bookNameInput.classList.contains("is-valid") &&
    UrlInput.classList.contains("is-valid")
  ) {
    let bookmarks = {
      WebsiteName: bookNameInput.value,
      UrlInput: UrlInput.value,
    };
    bookMarksList.push(bookmarks);
    localStorage.setItem("bookMarks", JSON.stringify(bookMarksList));
    displayBookMarks(bookMarksList);
    clearForm();
  } else {
    showErrorBox();
  }
}

// Function to display the bookmarks list in a table
function displayBookMarks(arr) {
  let cartona = "";
  for (let i = 0; i < arr.length; i++) {
    cartona += `<tr>
              <td>${i + 1}</td>
              <td>${arr[i].WebsiteName}</td>
              <td>
                <a href="${arr[i].UrlInput}" target="_blank">
                  <button class="btn btn-success px-4">
                    <i class="fa-solid fa-eye pe-2"></i>Visit
                  </button>
                </a>
              </td>
              <td>
                <button class="btn btn-danger px-4" onclick="deleteBookmark(${i})">
                  <i class="fa-solid fa-trash-can pe-3"></i>Delete
                </button>
              </td>
            </tr>`;
  }
  tableContent.innerHTML = cartona;
}

// Function to delete a bookmark
function deleteBookmark(index) {
  bookMarksList.splice(index, 1);
  localStorage.setItem("bookMarks", JSON.stringify(bookMarksList));
  displayBookMarks(bookMarksList);
}

// Function to clear input fields
function clearForm() {
  bookNameInput.value = "";
  UrlInput.value = "";
  bookNameInput.classList.remove("is-valid", "is-invalid");
  UrlInput.classList.remove("is-valid", "is-invalid");
}

// Function to validate inputs
function validateInputs(element) {
  var regex = {
    bookMarkInput: /^[A-Z][a-z]{2,9}$/,
    UrlInput: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
  };

  if (regex[element.id].test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}

// Function to show error box
function showErrorBox() {
  errorBox.classList.remove("d-none");
}

// Event listener for close button
closeBtn.addEventListener("click", function()  {
  errorBox.classList.add("d-none");
});

// Event listeners for input validation
bookNameInput.addEventListener("input", function(){validateInputs(bookNameInput)} );
UrlInput.addEventListener("input", function() {validateInputs(UrlInput)});

// Event listener for submit button
document.getElementById("btn-submit").addEventListener("click", addWebSite);
