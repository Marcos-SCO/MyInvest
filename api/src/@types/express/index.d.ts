declare namespace Express {
  interface Request {
    user: {
      id: string
      token: string
    }
  }
}