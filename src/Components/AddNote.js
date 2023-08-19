import React, { useState } from 'react'
import { useContext } from 'react'
import noteContext from '../Context/notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    // eslint-disable-next-line
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        props.showAlert("Added  Sucessfully", "success"); 
    }

    const onChange = (e) => {
        //properties that are inside the 'note' object will remain the same but properties written after that may change or update
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className="container my-3" >
            <h2>Add a Note </h2>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} minLength={4} required value={note.title} />

                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange} minLength={4} required  value={note.description}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} value={note.tag} />
                </div>

                <button disabled={note.title.length<5 || note.description.length<5 } type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote;
