export const logIn = ({dispatch}, token) => {
    dispatch('CHANGE_TOKEN', token)
}

export const logOut = ({dispatch}) => {
    dispath('REMOVE_TOKEN')
}

export const changeBoard = ({dispatch}, board) => {
    dispatch('CHANGE_BOARD', board)
}