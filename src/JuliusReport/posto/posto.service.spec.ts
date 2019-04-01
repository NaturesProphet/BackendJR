import { PostoService } from './posto.service';
import { PostoDto } from './posto.dto';
import { Posto } from './posto.model';

let service = new PostoService();

test( 'salva um posto', async () => {
    const posto = new PostoDto();
    posto.bandeira = 'BR';
    posto.local = 'avenida 7';
    posto.nome = 'posto malaquias';
    const postoSalvo: Posto = await service.salva( posto );
    expect( postoSalvo.id > 0 );
} );

test( 'listar os postos', async () => {
    const postos: Posto[] = await service.getPostos();
    expect( postos.length > 0 );
} );
