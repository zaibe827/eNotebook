
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  //  const host="http://localhost:5000";

    const notesInitial=[
        
        {
            "_id":"1",
            "title":"MyTitle 1",
            "description":"Hello Guyz 1!",
            "tag":"My tag 1"
        },
        {
            "_id":"2",
            "title":"MyTitle 2",
            "description":"Hello Guyz 2!",
            "tag":"My tag 2"
        },
        {
            "_id":"3",
            "title":"MyTitle 3",
            "description":"Hello Guyz 3!",
            "tag":"My tag 3"
        },
        {
            "_id":"4",
            "title":"MyTitle 4",
            "description":"Hello Guyz 4!",
            "tag":"My tag 4"
        }
    ]
    // const s1 = {
    //     "name": "zuhaib",
    //     "class": "1A"
    // }
    // const [state, setState] = useState(s1);
    // const update = () => {
    //     setTimeout(() => {
    //         setState({
    //             "name": "zaibe",
    //             "class": "2A"
    //         })
    //     }, 1000);
    // }
   
    const[notes,setNotes]=useState(notesInitial);

    //Add a Note
    const addNote=(title,description,tag)=>{
        //TODO API call
          //video number 65 CWH React(remaining backend some work)
        console.log("Adding a new note");
        const note=  {
           
            "_id":new Date().getTime().toString(),
            "title":title,
            "description":description,
            "tag":tag
        };
        setNotes(notes.concat(note));
    }

    //Delete a Note
    const deleteNote=(id)=>{
         //TODO API call
        //video number 65 CWH React(remaining backend some work)
        console.log("Deleting the node with id "+id)
        const newNotes=notes.filter ((note)=>{return note._id!==id});
        setNotes(newNotes);

    }

    //Edit a Note
    const editNote=async(id,title,description,tag)=>{
        //API Call
        //the url is left for endpoint which I have not added yet(endpoint that is made earlier in the course using thunder client)
        //the url come between `${host}...${id}`
          //video number 65 CWH React(remaining backend some work)
          /*
        const response = await fetch(`${host}${id}`, {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
             
            },
           
            body: JSON.stringify(title,description,tag),
          });
          */
        
          let newNotes=JSON.parse(JSON.stringify(notes));
        //Logic to edit in client
        for (let index = 0; index < notes.length; index++) {
            const element = newNotes[index];
            if(element._id===id){
                newNotes[index].title=title;
                newNotes[index].description=description;
                newNotes[index].tag=tag;
                break;    
            }
        }
        setNotes(newNotes);
    }
    return (
        <NoteContext.Provider value={{ notes,setNotes,addNote, deleteNote,editNote }}>
            {props.children}
        </NoteContext.Provider>)
}

export default NoteState;