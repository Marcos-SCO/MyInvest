class AuthError extends Error {
  
  constructor(message: string) {
    super(message);
  }
}

export default AuthError;