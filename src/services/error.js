const Error = (error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error)
    alert(errorMessage)
}
export default Error