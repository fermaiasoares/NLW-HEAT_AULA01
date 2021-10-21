import axios from "axios";
import { sign } from 'jsonwebtoken';

import prismaClient from '../prisma';
import { User } from ".prisma/client";

interface IAccessTokenResponse {
    access_token: string;
}

interface IUserResponse {
    avatar_url: string;
    login: string;
    id: null;
    name: string
}

interface IResponse {
    user: User;
    token: string;
}

class AuthenticateUserService {

    async execute(code: string): Promise<IResponse> {

        const url = "https://github.com/login/oauth/access_token";

        try {
            const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
                params:{
                    client_id: process.env.GITHUB_CLIENT_ID,
                    client_secret: process.env.GITHUB_CLIENT_SECRET,
                    code,
                },
                headers:{
                    "accept": "application/json",
                }
            });
    
            const response = await axios.get<IUserResponse>("https://api.github.com/user", {
                headers: {
                    authorization: `Bearer ${accessTokenResponse.access_token}`,
                }
            });

            const { login, id, avatar_url, name } = response.data;

            let user = await prismaClient.user.findFirst({
                where: {
                    github_id: id
                }
            }); 

            if(!user) {
                user = await prismaClient.user.create({
                    data: {
                        github_id: id,
                        login,
                        avatar_url,
                        name
                    }
                })
            }

            const token = sign(
                {
                    user:{
                        name: user.name,
                        avatar_url: user.avatar_url,
                        id: user.id
                    }
                },
                process.env.JWT_SECRET,
                {
                    subject: user.id,
                    expiresIn: "2d"
                }
            )
            
            return {
                token, user
            };
            
        } catch (error) {
            console.log(error);
        }
    }
}

export { AuthenticateUserService }
