import prismaClient from "../../prisma"; 
import { hash } from "bcryptjs";

interface UserRequest{
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute({name, email, password} : UserRequest){
        // Verificar se ele enviou um e-mail
        if(!email) {
            throw new Error("E-mail incorrect!");
        }

        // Verificar se o e-mail já está cadastrado na plataforma
        const userAlredyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        if(userAlredyExists) {
            throw new Error("User alredy exists!");
        }

        // Criptografando a senha
        const passwordHash = await hash(password, 8)

        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        });

        return user;
    }
}

export {CreateUserService }