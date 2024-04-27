import {Request, Response} from 'express'
import { CreateCardService } from '../../services/cartoes/CreateCardService';

declare module "express-serve-static-core" {
    interface Request {
      user_id: string;
    }
  }

class CreateCardController{
    async handle(req: Request, res: Response){
        const {numero, nomeProprietario, validade, digitoSeguranca} = req.body;
        const usuario = req.user_id;

        const createCardService = new CreateCardService();

        const card = await createCardService.execute({numero, nomeProprietario, validade, digitoSeguranca, usuario});
        return res.json(card);
    }
}

export{CreateCardController};