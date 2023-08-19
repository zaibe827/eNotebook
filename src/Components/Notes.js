import React, { useContext, useRef, useState } from 'react'
import noteContext from '../Context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';

const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes,editNote } = context;

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
        
    }

    const ref = useRef(null);
    const refClose = useRef(null);

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" });

    const onChange = (e) => {
        //properties that are inside the 'note' object will remain the same but properties written after that may change or update
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const handleClick = (e) => {
        console.log("Updating the node...", note)
        editNote(note.id,note.etitle,note.edescription,note.etag);
        refClose.current.click();
        props.showAlert("Updated  Sucessfully", "success"); 
    }

    return (
        <>
            <AddNote showAlert={props.showAlert} />

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Update Notes
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange}  minLength={4} required/>

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" onChange={onChange} value={note.edescription} minLength={4} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} value={note.etag} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button disabled={note.etitle.length<5 || note.edescription.length<5 } ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3" >
                <h2>Your Notes</h2>
                <div className='container mx-1'>

                {notes.length===0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert} />;
                })}
            </div>
        </>

    )
}

export default Notes
