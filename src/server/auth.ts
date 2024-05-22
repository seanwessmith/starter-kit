export interface Context {
  headers: Record<string, string>;
  isAuthed: boolean;
}

export class AuthHandler {
  constructor() {}

  async authenticate() {
    try {
      return true;
    } catch (error) {
      throw error; // Rethrow the error for the caller to handle
    }
  }
}
