class ApiError extends Error {
    constructor(statusCode, message, errors, stack) {
      super(message);
      this.statusCode = statusCode;
      this.errors = errors;
      this.message = message;
      this.data = null;
      this.success = false;
      //this.type = type;
  
      if (stack) {
        this.stack = stack;
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }
  export {ApiError}


























// class ApiError extends Error{
//  constructor(
//     statusCode ,
//     message = "An error occurred while processing your request",
//     errors=[],
//     stack = " ",
//  ){
//     super(message),
//     this.statusCode = statusCode,
//     this.errors= errors,
//     this.message = message,
//     this.data = null,
//     this.success = false

//     if(stack){
//         this.stack = stack
//     }
//     else{
//         Error.captureStackTrace(this, this.constructor)
//     }

//  }
// }

// export {ApiError}