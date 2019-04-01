export class Posto {

    id: number;

    dataregistro: Date;

    atualizadoem: Date;

    nome: string;

    bandeira: string;

    local: string;


    public static async find ( obj ) {
        if ( !obj ) {
            return [
                {
                    id: 1,
                    dataregistro: '2019 - 04 - 01T03: 28: 47.632Z',
                    atualizadoem: '2019 - 04 - 01T03: 28: 47.632Z',
                    nome: 'Posto ALE em campo grande',
                    bandeira: 'ALE',
                    local: 'Campo Grande'
                },
                {
                    id: 2,
                    dataregistro: '2019 - 04 - 01T03: 29: 24.876Z',
                    atualizadoem: '2019 - 04 - 01T03: 29: 24.876Z',
                    nome: 'Shell da BR 262',
                    bandeira: 'Shell',
                    local: 'BR 262'
                }
            ];
        } else {
            if ( obj.nome == 'Shell da BR 262' || obj.nome == 'Posto ALE em campo grande' ) {
                return [ {}, {}, {} ];
            } else {
                return [];
            }
        }
    }


    public static async save ( dto ) {
        let posto: Posto = new Posto();
        Object.assign( Posto, dto );
        posto.dataregistro = new Date();
        posto.atualizadoem = new Date();
        posto.id = 1;
        return posto;
    }


}
