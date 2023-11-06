enum UsuarioSchemaDtoRestraints {
  tamMinNome = 3,
  tamMaxNome = 50,

  tamMinSobrenome = 3,
  tamMaxSobrenome = 100,

  tamMinDataNascimento = 0,
  tamMaxDataNascimento = 100000000000000000000000000000000000,

  tamMinUrlImagem = 1,
  tamMaxUrlImagem = 1000,

  tamMinIdEndereco = 0,
  tamMaxIdEndereco = 100,

  tamMinArquivoImagem = 1,
  tamMaxArquivoImagem = 1000,

  tamMinSexo = 3,
  tamMaxSexo = 15,

  tamMinNumeroTelefone = 11,
  tamMaxNumeroTelefone = 20,

  tamMinCpf = 14,
  tamMaxCpf = 14,

  tamMinCnpj = 18,
  tamMaxCnpj = 20,

  tamMinCnh = 1,
  tamMaxCnh = 5,

  tamMinCep = 8,
  tamMaxCep = 8,

  tamMinNomeCidade = 0,
  tamMaxNomeCidade = 100,

  tamMinNomeEstado = 0,
  tamMaxNomeEstado = 50,

  tamMinNomeBairro = 0,
  tamMaxNomeBairro = 100,

  tamMinLogradouro = 0,
  tamMaxLogradouro = 200,

  tamMinComplemento = 0,
  tamMaxComplemento = 100,

  tamMinNumero = 0,
  tamMaxNumero = 10000,

  tamMinNomeAutomovel = 3,
  tamMaxNomeAutomovel = 100,

  tamMinDescricaoAutomovel = 10,
  tamMaxDescricaoAutomovel = 200,

  pesoMinAutomovel = 0.1,
  pesoMaxAutomovel = 200000,

  comprimentoMinAutomovel = 0.1,
  comprimentoMaxAutomovel = 70,

  larguraMinAutomovel = 0.1,
  larguraMaxAutomovel = 70,

  alturaMinAutomovel = 0.1,
  alturaMaxAutomovel = 30,

  tamMinChavePix = 0,
  tamMaxChavePix = 200,

  tamMinTipoPix = 0,
  tamMaxTipoPix = 200,

  tamMinAgenciaContaBancaria = 0,
  tamMaxAgenciaContaBancaria = 200,

  tamMinContaContaBancaria = 0,
  tamMaxContaContabancaria = 200,

  tamMinIdMaquina = 0,
  tamMaxIdMaquina = 0,

  tamMinIdFavorito = 0,
  tamMaxIdFavorito = 0,

  tamMinIdProcessoDeAluguel = 0,
  tamMaxIdProcessoDeAluguel = 0,

  tamMinIdProcessoDeFrete = 0,
  tamMaxIdProcessoDeFrete = 0,

  tamMinIdCategoria = 0,
  tamMaxIdCategoria = 100,

  tamMinCategoria = 0,
  tamMaxCategoria = 100,

  tamMinEmail = 0,
  tamMaxEmail = 150,

  tamMinSenha = 0,
  tamMaxSenha = 100,

  tamMinTipo = 0,
  tamMaxTipo = 100,
}

export { UsuarioSchemaDtoRestraints };
