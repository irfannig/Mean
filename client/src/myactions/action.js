import { connect } from "react-redux"

export const handleInputAction = (input) => {
    return {
        type: 'UPDATE_INPUT',
        payload: input
    }
}


export const fetchWishAction = () => {
    return (dispatch) => {
        fetch('/data')
            .then(res => res.json())
            .then(res2 => {
                dispatch({
                    type: 'GET_WISH',
                    payload: res2
                })
            })
    }
}

export const handleSubmitAction = (e) => {
    return (dispatch) => {
        e.preventDefault();
        // const url = "http://localhost:5000/sent-data";

        var data = new URLSearchParams();
        console.log(e.target)
        for (const pair of new FormData(e.target)) {
            // console.log(pair)
            data.append(pair[0], pair[1])
        }

        fetch('/sent', {
            method: "post",
            body: data
        }).then(res => res.json())
            .then(res2 => {
                dispatch({
                    type: 'ADD_WISH',
                    payload: res2
                })
            });
    }
}

export const handleDeleteAction = (id) => {
    return (dispatch) => {
        fetch('/remove/' + id, { method: "delete" })
            .then(res => res.json())
            .then(res2 => {
                dispatch({
                    type: 'DELETE_WISH',
                    payload: res2
                })
            })
    }
}