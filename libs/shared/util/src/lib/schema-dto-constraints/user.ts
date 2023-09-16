enum UsuarioSchemaDtoRestraints {
  tamMinNome = 3,
  tamMaxNome = 50,

  tamMinSobrenome = 3,
  tamMaxSobrenome = 100,

  tamMinDataNascimento = 0,
  tamMaxDataNascimento = 100000000000000000000000000000000000,

  tamMinUrlImagem = 0,
  tamMaxUrlImagem = 500,

  tamMinArquivoImagem = 0,
  tamMaxArquivoImagem = 100,

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

  tamMinCep = 9,
  tamMaxCep = 9,

  tamMinNomeCidade = 3,
  tamMaxNomeCidade = 60,

  tamMinNomeBairro = 3,
  tamMaxNomeBairro = 100,

  tamMinLogradouro = 0,
  tamMaxLogradouro = 200,

  tamMinComplemento = 0,
  tamMaxComplemento = 100,

  tamMinNumero = 0,
  tamMaxNumero = 50,

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

  tamMinAutomovelImagem = 0,
  tamMaxAutomovelImagem = 100,

  tamMinUsuarioImagem = 0,
  tamMaxUsuarioImagem = 100,

  tamMinChavePix = 0,
  tamMaxChavePix = 200,

  tamMinTipoPix = 0,
  tamMaxTipoPix = 200,

  tamMinAgenciaContaBancaria = 0,
  tamMaxAgenciaContaBancaria = 200,

  tamMinContaContaBancaria = 0,
  tamMaxContaContabancaria = 200,

  tamMinIdCategoria = 0,
  tamMaxIdCategoria = 100,

  tamMinCategoria = 0,
  tamMaxCategoria = 100,

  tamMinEmail = 0,
  tamMaxEmail = 150,

  tamMinSenha = 0,
  tamMaxSenha = 100,

  tamMinSalt = 0,
  tamMaxSalt = 100,

  tamMinTipo = 0,
  tamMaxTipo = 100,
}

export { UsuarioSchemaDtoRestraints };
