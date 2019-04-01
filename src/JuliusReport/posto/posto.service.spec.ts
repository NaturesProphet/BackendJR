import { PostoService } from './posto.service';
import { PostoDto } from './posto.dto';
import { Posto } from './posto.model';
jest.mock( './posto.model' );


let service = new PostoService();

test( 'salva um posto', async () => {
    const posto = new PostoDto();
    posto.bandeira = 'BR';
    posto.local = 'avenida 7';
    posto.nome = 'posto malaquias';
    const postoSalvo: Posto = await service.salva( posto );
    expect( postoSalvo.id > 0 );
} );

test( 'tenta salvar um posto que já existe', async () => {
    const posto = new PostoDto();
    posto.bandeira = 'BR';
    posto.local = 'avenida 7';
    posto.nome = 'Shell da BR 262';
    let errorMsg: string;
    try {
        await service.salva( posto );
    } catch ( err ) {
        errorMsg = err.message;
    }
    expect( errorMsg ).toBe( 'Este nome já existe.' );
} );


test( 'tenta salvar um posto inválido', async () => {
    const posto = new PostoDto();
    posto.bandeira = null;
    posto.local = null;
    posto.nome = null;
    let errorMsg: string;
    try {
        await service.salva( posto );
    } catch ( err ) {
        errorMsg = err.message;
    }
    expect( errorMsg ).toBe( 'Dados invalidos' );
} );


test( 'listar os postos', async () => {
    const postos: Posto[] = await service.getPostos();
    expect( postos.length > 0 );
} );
