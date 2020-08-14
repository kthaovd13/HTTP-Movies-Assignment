import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

const initialMovie = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: []
};

const UpdateForm = props => {
    const [ updatedMovie, setUpdatedMovie ] = useState(initialMovie)
    const { id } = useParams();
    const { push } = useHistory();

    useEffect (() => {
        axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            setUpdatedMovie(res.data)
            console.log(res.data)
        })
        .catch(err => console.log(err))
    }, [id])

    const changeHandler = (ev) => {
        ev.persist();
        let value = ev.target.value;
        if (ev.target.name === "price") {
            value = parseInt(value, 10);
        }
    
        setUpdatedMovie({
            ...updatedMovie,
            [ev.target.name]: value
        });
    };

    const submitHandler = e => {
        e.preventDefault();
        axios
        .put(`http://localhost:5000/api/movies/${id}`, updatedMovie)
        .then(res => {
            props.setMovieList(res.data);
            push('/')
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={submitHandler}>
                <input
                    id='title' 
                    type='text'
                    name='title'
                    onChange={changeHandler}
                    value={updatedMovie.title}
                    placeholder='title'
                />
                <input 
                    id='director'
                    type='text'
                    name='director'
                    onChange={changeHandler}
                    value={updatedMovie.director}
                    placeholder='director'
                />
                <input 
                    id='metascore'
                    type='text'
                    name='metascore'
                    onChange={changeHandler}
                    value={updatedMovie.metascore}
                    placeholder='metascore'
                />
                <button>Update Movie</button>
            </form>
        </div>
    )
}

export default UpdateForm
