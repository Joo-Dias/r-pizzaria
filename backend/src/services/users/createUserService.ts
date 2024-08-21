import prismaClient from "../../prisma"; 

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

        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: password
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