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

  tamMinImagem = 1,
  tamMaxImagem = 1000,

  tamMinTipo = 0,
  tamMaxTipo = 100,

  ValorPorTipoMin = 0,
  ValorPorTipoMax = 10000000,

  tamMinCep = 9,
  tamMaxCep = 9,

  tamMinIdEndereco = 0,
  tamMaxIdEndereco = 100,

  tamMinEstado = 0,
  tamMaxEstado = 50,

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
  tamMaxFoto = 10000,
}

enum MaquinaUsuarioTipos {
  Comum = 'Comum',
  Freteiro = 'Freteiro',
}

export { MaquinaSchemaDtoRestraints, MaquinaUsuarioTipos };
