export const GET_ERRORS = "GET_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

export const getError = (error) => ({
    type: GET_ERRORS,
    payload: error
})

export const clearErrors = () => ({
    type: CLEAR_ERRORS,
})