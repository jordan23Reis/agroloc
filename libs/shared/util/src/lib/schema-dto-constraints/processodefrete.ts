enum ProcessoDeFreteSchemaDtoRestraints {
    tamMinDataInicio = 0,
    tamMaxDataInicio = 100000000000000000000000000000000000,

    tamMinDataTermino = 0,
    tamMaxDataTermino = 100000000000000000000000000000000000,

    tamMinStatus = 3,
    tamMaxStatus = 100,

    tamMinStatusPagamento=0,
    tamMaxStatusPagamento=100,
    
    tamMinTipoRecebimento=0,
    tamMaxTipoRecebimento=100,

    minQuantificadorPreco=0,
    maxQuantificadorPreco=999999999999999,

    minValorPagamento=0,
    maxValorPagamento=999999999999999,

    tamMinLinkPagamento=0,
    tamMaxLinkPagamento=300,

    tamMinContaPagamento=0,
    tamMaxContaPagamento=200,

    tamMinAgenciaPagamento=0,
    tamMaxAgenciaPagamento=200,

    tamMinTipoPix=0,
    tamMaxTipoPix=200,

    tamMinChavePix=0,
    tamMaxChavePix=200,

    minValorPorTipoPreco=0,
    maxValorPorTipoPreco=999999999999999,

    tamMinNomeMaquina=3,
    tamMaxNomeMaquina=100,

    tamMinIdMaquina=0,
    tamMaxIdMaquina=150,

    tamMinNomeFreteiro=0,
    tamMaxNomeFreteiro=200,

    tamMinIdFreteiro=0,
    tamMaxIdFreteiro=150,
    
    tamMinNomeSolicitante=0,
    tamMaxNomeSolicitante=200,

    tamMinIdSolicitante=0,
    tamMaxIdSolicitante=150,

    tamMinIdProcessoDeAluguel=0,
    tamMaxIdProcessoDeAluguel=150,

    tamMinNomeArquivoImagem=1,
    tamMaxNomeArquivoImagem=1000,

    tamMinUrlImagem=1,
    tamMaxUrlImagem=1000,

    tamMinNomeTipo=3,
    tamMaxNomeTipo=150,

    tamMinIdTipo=0,
    tamMaxIdTipo=150,

    tamMinIdVeiculo=0,
    tamMaxIdVeiculo=150,

    tamMinNomeVeiculo=3,
    tamMaxNomeVeiculo=100,

    tamMinCep=8,
    tamMaxCep=8,

}

enum ProcessoDeFreteTiposRecebimento{
    Pix='Pix',
    ContaBancaria='ContaBancaria',
}

export {ProcessoDeFreteSchemaDtoRestraints, ProcessoDeFreteTiposRecebimento};