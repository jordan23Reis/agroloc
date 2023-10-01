
enum AvaliacaoSchemaDtoRestraints {
    minNivelAvaliacao = 1,
    maxNivelAvaliacao = 5,

    tamMinComentarioAvaliacao = 3,
    tamMaxComentarioAvaliacao = 300,

    tamMinIdUsuarioAvaliador = 0,
    tamMaxIdUsuarioAvaliador = 100,

    tamMinNome = 3,
    tamMaxNome = 100,

    tamMinUrlImagem = 1,
    tamMaxUrlImagem = 1000,

    tamMinArquivoImagem = 1,
    tamMaxArquivoImagem = 1000,
}

enum AvaliacaoTipos {
    Maquina = "Maquina",
    Freteiro = "Freteiro"
}

export {AvaliacaoSchemaDtoRestraints, AvaliacaoTipos};