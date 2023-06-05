import { 
    getCurrentUser, fetchData, removeCurrentUser, setCurrentUser
  } from "./main.js";
  
  let user = getCurrentUser(); 
  if(!user) window.location.href = "login.html";
  
  console.log(user);
  
  let userID = user.userID; 
  console.log(userID);
  /*
  let note = {
    userID: userID,
    noteContent: "dsfs",
  }
  
  fetchData("/notes/getNotes", note, "POST")
  
  */
  
  let deleteBtn = document.getElementById("delete-account");
  if(deleteBtn) deleteBtn.addEventListener('click', deleteAccount);
  
  function deleteAccount() {
  
    if(confirm("Are you sure you want to delete your account???")) {
      fetchData("/user/delete", user, "DELETE")
      .then((data) => {
        removeCurrentUser();
      })
      .catch((err) => {
        let p = document.querySelector('.error');
        p.innerHTML = err.message;
      })
    } 
  }
  
  let editForm = document.getElementById("edit-form");
  if(editForm) editForm.addEventListener('submit', editUser);
  
  function editUser(e) {
    e.preventDefault();
  
    let username = document.getElementById('username').value;
    user.userName = username;
  
    fetchData("/user/edit", user, "PUT")
    .then((data) => {
      setCurrentUser(data)
      window.location.href = "profile.html"
    })
    .catch((err)=> {
      let p = document.querySelector('.error');
      p.innerHTML = err.message;
    })
  }
  