export class Veiculo {

    id: number;

    dataregistro: Date;

    atualizadoem: Date;

    placa: string;

    cor: string;

    marca: string;

    modelo: string;

    anoFrabricacao: number;

    anoModelo: number;

    observacoes: string;

    usuario_id: number;

    public static save ( veiculo: Veiculo ) {
        veiculo.id = 69;
        veiculo.atualizadoem = new Date();
        veiculo.dataregistro = new Date();
        return veiculo;
    }

    public static find ( options ) {
        if ( options.placa == 'placa existente' ) {
            return [ new Veiculo() ]
        }
        if ( options.usuario_id == 69 ) {
            let veiculo = new Veiculo();
            veiculo.cor = 'preto';
            veiculo.marca = 'WolksWagen';
            veiculo.modelo = 'fuscão';
            veiculo.placa = "KGB-6666";
            veiculo.usuario_id = 69;
            veiculo.anoFrabricacao = 1972;
            veiculo.anoModelo = 1973;
            veiculo.id = 69;
            return [ veiculo ];
        } else {
            return [];
        }
    }
}
