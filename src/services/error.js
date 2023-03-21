const Error = (error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage)
    alert(errorMessage)
}
export default Error