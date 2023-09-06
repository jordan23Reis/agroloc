

enum MaquinaSchemaDtoRestraints {
    tamMinNomeMaquina = 3,
    tamMaxNomeMaquina = 100,

    tamMinDescricaoMaquina = 10,
    tamMaxDescricaoMaquina = 200,

    pesoMinMaquina = 0.1,
    pesoMaxMaquina = 150000,

    comprimentoMinMaquina = 0.1,
    comprimentoMaxMaquina = 70,

    larguraMinMaquina = 0.1,
    larguraMaxMaquina = 70,

    alturaMinMaquina = 0.1,
    alturaMaxMaquina = 30,

    tamMinTipo = 0,
    tamMaxTipo = 100,

    tamMinValorPorTipo = 0,
    tamMaxValorPorTipo = 100,

    tamMinCep = 9,
    tamMaxCep = 9,

    tamMinCidade = 0,
    tamMaxCidade = 100,

    tamMinBairro = 0,
    tamMaxBairro = 100,

    tamMinLogradouro = 0,
    tamMaxLogradouro = 200,

    tamMinComplemento = 0,
    tamMaxComplemento = 100,

    numeroMin = 0,
    numeroMax = 10000,

    tamMinCategoria = 0,
    tamMaxCategoria = 100,
    
    tamMinNomeDonoMaquina = 0,
    tamMaxNomeDonoMaquina = 100,

    tamMinFoto = 0,
    tamMaxFoto = 100,
}

export {MaquinaSchemaDtoRestraints};