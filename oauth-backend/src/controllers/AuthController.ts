import axios from "axios";
import { Request, Response } from "express";

export class AuthController {
  async SignIn(req: Request, res: Response) {
    const { code } = req.query;
    if (!code) {
      res.status(403).json({ error: true, message: "Code is required" });
      return;
    }
    const accessToken = await this.getAccessToken(code.toString());
    if (accessToken.error) {
      console.log(accessToken);
      res.status(500).json({ error: true, message: "Internal Error" });
      return;
    }
    const userData = await this.getUserData(accessToken.accessToken!);

    if (userData.error) {
      res.status(500).json({ error: true, message: "Internal Error" });
      return;
    }

    const revokeToken = await this.revokeToken(accessToken.accessToken!);

    if (revokeToken.error) {
      res.status(500).json({ error: true, message: "Internal Error" });
      return;
    }
    res.status(200).json({ error: false, data: userData.user });
  }

  private async getAccessToken(
    code: string
  ): Promise<{ error: boolean; message?: string; accessToken?: string }> {
    try {
      const body = `code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_SECRET_ID}&redirect_uri=${process.env.REDIRECT_URI}&grant_type=authorization_code`;
      const { data } = await axios.post(
        "https://oauth2.googleapis.com/token",
        body,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      return {
        error: false,
        accessToken: data.access_token,
      };
    } catch (error: any) {
      return {
        error: true,
        message: error.message,
      };
    }
  }

  private async getUserData(accessToken: string): Promise<{
    error: boolean;
    message?: string;
    user?: { email: string; name: string };
  }> {
    try {
      const { data } = await axios.get(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      if (!data.verified_email) {
        return {
          error: true,
          message: "Google account is not verified",
        };
      }

      return {
        error: false,
        user: {
          email: data.email,
          name: data.name,
        },
      };
    } catch (error: any) {
      return {
        error: true,
        message: error.message,
      };
    }
  }

  private async revokeToken(
    token: string
  ): Promise<{ error: boolean; message: string }> {
    try {
      await axios.post(
        "https://oauth2.googleapis.com/revoke",
        `token=${token}`,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      return {
        error: false,
        message: "Token revoke with success !",
      };
    } catch (error: any) {
      return {
        error: true,
        message: "Erro ao buscar o access token",
      };
    }
  }
}
