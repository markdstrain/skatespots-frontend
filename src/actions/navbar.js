import { SET_NAVBAR } from "./types"


export const setCurrentNavbar = (admin) => ({
    type: SET_NAVBAR,
    payload: admin,
})