import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import {ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const NotePage = (props) => {

    let {id} = useParams();

    const history = useNavigate()
    // const match  = {params: useParams()};
    // console.log(id)

    let [note, setNote] = useState(null)

    useEffect ( () => {
        getNote()
    }, [id])

    let getNote = async () => {
        // let noteId = id
        if (id === 'new') return
        let response = await fetch("/api/notes/" + id)
        let data = await response.json()
        // console.log(data)
        setNote(data)
    }

    let createNote = async () => {
        fetch('/api/notes/create/', {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            }, 
            body: JSON.stringify(note)
        })
    }

    let updateNote = async () => {
        fetch('/api/notes/' + id + '/update/', {
            method: "PUT",
            headers: {
                'Content-Type' : 'application/json'
            }, 
            body: JSON.stringify(note)
        })
    }

    let deleteNote = async () => {
        fetch('/api/notes/' + id + '/delete/', {
            method: "DELETE",
            headers: {
                'Content-Type' : 'application/json'
            } 
        })
        history('/')
    }

    let handleSubmit = () => {
        if (id !== 'new' && note.body === ""){
            deleteNote()
        }else if (id !== 'new'){
            updateNote()
        }else if (id === 'new' && id !== null){
            createNote()
        }
        history('/')
    }
    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    {/* <Link to='/'><ArrowLeft/> </Link>  */}
                    <ArrowLeft onClick={handleSubmit}/>
                </h3>
                    {id !== 'new' ? (
                        <button onClick={deleteNote}>Delete</button>
                    ): (
                        <button onClick={handleSubmit}>Done</button>
                    )}
            </div>
            <textarea onChange={(e) => {setNote({...note, 'body': e.target.value})}} value={note?.body}></textarea>
        </div>
  )
}

export default NotePage
