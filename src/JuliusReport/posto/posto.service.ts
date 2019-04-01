import { Injectable } from '@nestjs/common';
import { PostoDto } from './posto.dto';
import { Posto } from './posto.model';



@Injectable()
export class PostoService {

    public async salva ( posto: PostoDto ): Promise<Posto> {
        if (
            posto.bandeira
            && posto.local
            && posto.nome
        ) {
            let novo = new Posto();
            novo.bandeira = posto.bandeira;
            novo.nome = posto.nome;
            novo.local = posto.local;

            let teste = await Posto.find( { nome: posto.nome } );
            if ( teste.length == 0 ) {
                return await Posto.save( novo );
            } else {
                throw new Error( "Este nome já existe." );
            }
        } else {
            throw new Error( 'Dados invalidos' );
        }
    }

    public async getPostos (): Promise<Posto[]> {
        return await Posto.find();
    }

}
