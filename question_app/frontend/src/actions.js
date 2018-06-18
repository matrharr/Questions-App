export const selectOption = option => ({
    type: 'SELECT_OPTION',
    option,
})

export const nextQuestion = () => ({
    type: 'NEXT_QUESTION',
})

export const prevQuestion = () => ({
    type: 'PREV_QUESTION',
})

export const loadRequestData = data => ({
    type: 'LOAD_REQUEST_DATA',
    data,
})

export const dropOption = (id, option) => ({
    type: 'DROP_OPTION',
    payload: {
        id,
        ...option,
    }
})

export const arrowRight = () => ({
    type: 'ARROW_RIGHT',
})

export const arrowLeft = () => ({
    type: 'ARROW_LEFT',
})

export const arrowDown = () => ({
    type: 'ARROW_DOWN',
})

export const arrowUp = () => ({
    type: 'ARROW_UP',
})

export const reset = () => ({
    type: 'RESET',
})

export const fetchQuestions = () => {
    return (dispatch) => {
        return fetch('/api/questions')
            .then(response => response.json())
            .then(data => dispatch(loadRequestData(data)))
    }
}
