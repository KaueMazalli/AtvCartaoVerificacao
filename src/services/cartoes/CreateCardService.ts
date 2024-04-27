import prismaClient from "../../prisma";


interface CartaoRequest{
    numero: string
    nomeProprietario:string
    validade:string
    digitoSeguranca:string
    usuario:string
}

class CreateCardService {
    async execute({numero, nomeProprietario, validade, digitoSeguranca, usuario}: CartaoRequest){
        if (!numero) {
            throw new Error("Numero do cartão não enviado");
        }
        if (!nomeProprietario) {
            throw new Error("Nome do proprietario não enformado");
        }
        if (!validade) {
            throw new Error("Validade não informada");
        }
        if (!digitoSeguranca) {
            throw new Error("Digito de seguranca não enviado");
        }
       
        const CardAreadyExists = await prismaClient.cartao.findFirst(
            {
                where:{
                    numero:numero
                }
            }
        )
        if(CardAreadyExists){
            throw new Error('Cartão já cadastrado!');
        }

        
        const card = await prismaClient.cartao.create({
            data:{
                numero:numero,
                nomeProprietario:nomeProprietario,
                validade:validade,
                digitoSeguranca:digitoSeguranca,
                id_usuario: usuario

            },
            select:{
                numero:true,
                nomeProprietario:true,
                validade:true,
                id_usuario: true
            }
        })
        return card;
    }
}
export {CreateCardService};