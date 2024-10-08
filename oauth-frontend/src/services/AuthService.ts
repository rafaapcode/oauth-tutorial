type ResponseSignIn = {
  error: boolean;
  data: {
    message: string;
    token?: string;
    user?: {
      email: string;
      name: string;
    };
  }
}

export class AuthService {
  static async SignIn(code: string): Promise<ResponseSignIn> {
    try {
      const res = await fetch(`http://localhost:8001/auth?code=${code}`);
      const data = await res.json();
      console.log("Return front-end",data);
      return {
        error: false,
        data: {
          message: "Usuário recuperado com sucesso",
          user: data.data
        }
      }
    } catch (error: any) {
      return {
        error: true,
        data: {
          message: error.message,
        }
      }
    }
  } 
};