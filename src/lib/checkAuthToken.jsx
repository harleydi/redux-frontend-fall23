import { setHeaderToken } from "./setHeaderToken"

export const checkAuthToken = () => {
    let token = localStorage.getItem('reduxToken')
    if (token) {
        // set auth headers
        setHeaderToken(token)
        return true
    } else {
        // delete headers
        setHeaderToken()
        return false
    }
}