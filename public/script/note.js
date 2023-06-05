import { fetchData, getCurrentUser} from './main.js'
class Note{
    constructor(note,userID) {
       this.note = note;
       this.userID = userID;
    }
    getComments(){
       return this.note; 
     }
     getUserID(){
      return this.userID;
     }
    }


    let comment = document.getElementById("comments");
    if (comment) comment.addEventListener("submit",note1);

    function note1(e){
       e.preventDefault();

       let feedback = document.getElementById("notetaking").value;
       let user = getCurrentUser();
       let note = new Note(feedback,user.userID);
       console.log(note);
  fetchData("/note/create", note, "POST")
  .then((data) => {
   console.log(data)
    window.location.href = "note.html";
  })
  .catch((err) => {
   console.log(err);
  }) 
}    

let user = getCurrentUser();
if (user && comment) showAllNotes();

function showAllNotes(){
    let user = getCurrentUser();
    let userid = user.userID;
    console.log(userid);
    
    fetchData("/note/", user, "POST")
    .then((data) => {
        let ul=document.getElementById("allnotes");    
       
        data.forEach((note)=>{
            let li=document.createElement('li');
            let text=document.createTextNode(note.note);
            li.appendChild(text);
            ul.appendChild(li);
            console.log(note);
        })

    })
    .catch((err)=>{
        console.log(`Error! ${err}`)
    });
    

}
