var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");
var updateButton = document.getElementById("update");

var isNameValid = false;
var isURLValid = false;

var bookmarksList;

if (localStorage.getItem("bookmarks_List") != null) {
  bookmarksList = JSON.parse(localStorage.getItem("bookmarks_List"));
  displayBookmarks(bookmarksList);
} else {
  bookmarksList = [];
}

function addBookmark() {
  var bookmark = {
    name: siteName.value,
    url: siteURL.value,
  };

  if(validateBookmark(bookmark.name) && validateURL(bookmark.url) && checkExist(bookmark)) {
    bookmarksList.push(bookmark);
    localStorage.setItem("bookmarks_List", JSON.stringify(bookmarksList));
    displayBookmarks(bookmarksList);
    clearForm();
  }
}

function displayBookmarks(bookmarks) {
  var bookmarksToHTML = ``;
  for (var i = 0; i < bookmarks.length; i++) {
    bookmarksToHTML += `<tr>
          <td>${i + 1}</td>
          <td>${bookmarks[i].name}</td>
          <td>
            <a href="${
              bookmarks[i].url
            }" target="_blank" class="btn btn-primary">
              <i class="fa-solid fa-eye"></i>Visit
            </a>
          </td>
          <td>
            <button class="btn btn-danger" onclick="deleteBookmark(${i})">
            <i class="fa-solid fa-trash"></i>
            Delete</button>
          </td>
          <td>
          <button class="btn btn-warning" onclick="updateBookmark(${i})">
            <i class="fa-solid fa-pen-to-square"></i>
            Update
          </button>
          </td>
        </tr>`;
  }
  document.getElementById("BookmarksData").innerHTML = bookmarksToHTML;
}

function clearForm() {
  siteName.value = "";
  siteURL.value = "";
}

function deleteBookmark(indx) {
  bookmarksList.splice(indx, 1);
  // bookmarksList = localStorage.setItem("bookmarks_List", JSON.stringify(bookmarksList));
  localStorage.bookmarks_List = JSON.stringify(bookmarksList);
  displayBookmarks(bookmarksList);
}

function updateBookmark(indx) {
  updateButton.classList.remove("d-none");

  siteName.value = bookmarksList[indx].name;
  siteURL.value = bookmarksList[indx].url;

  updateButton.onclick = function (index) {
    updateBookmarkInfo(indx);
  };
}

function updateBookmarkInfo(indx) {
  bookmarksList[indx].name = siteName.value;
  bookmarksList[indx].url = siteURL.value;

  localStorage.setItem("bookmarks_List", JSON.stringify(bookmarksList));
  displayBookmarks(bookmarksList);
  updateButton.classList.add("d-none");
}

function validateBookmark(value) {
  //at least 3 letters and start with Capital letter
  var bookmarkNameRegex = /^[A-Z][a-z]{3,}$/;

  if (bookmarkNameRegex.test(value)) {
    return true;
  } else {
    return false;
  }
}

function validateBookmarkName() {
  var bookmarkErrorMessage = document.getElementById("errorMessage");

  if (validateBookmark(siteName.value)) {
    bookmarkErrorMessage.classList.replace("d-block", "d-none");
    siteName.classList.replace("is-invalid", "is-valid");
  } else {
    bookmarkErrorMessage.classList.replace("d-none", "d-block");
    siteName.classList.add("is-invalid");
  }
}

function validateURL(value) {
  var URLRegex = /^(http(s)?:\/\/)(www\.)?[-a-zA-Z0-9]{2,256}?\.[a-z]{2,6}$/;

  if (URLRegex.test(value)) {
    return true;
  } else {
    return false;
  }
}

function validateBookmarkURL() {
  var uRLErrorMessage = document.getElementById("errorMessageURL");

  if (validateURL(siteURL.value)) {
    uRLErrorMessage.classList.replace("d-block", "d-none");
    siteURL.classList.replace("is-invalid", "is-valid");
  } else {
    uRLErrorMessage.classList.replace("d-none", "d-block");
    siteURL.classList.add("is-invalid");
  }
}


function checkExist(bookmark) {
  var alertMessage = document.getElementById("alertMessage");
  
  for(var i=0; i < bookmarksList.length; i++) {
    if(bookmarksList[i].name.toLowerCase() == bookmark.name.toLowerCase()) {
      alertMessage.classList.replace("d-block", "d-none");
      console.log(bookmarksList[i].name.toLowerCase());
      console.log(bookmark.name.toLowerCase());
      return true;
    }
    else {
      alertMessage.classList.replace("d-none", "d-block");
      return false;
    }
  }
}