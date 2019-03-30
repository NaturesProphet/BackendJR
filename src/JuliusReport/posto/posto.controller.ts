import { Controller } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';


@ApiUseTags( 'Postos de combustível' )
@Controller( 'posto' )
export class PostoController {


}

