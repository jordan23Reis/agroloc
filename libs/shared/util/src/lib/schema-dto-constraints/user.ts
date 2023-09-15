

enum UsuarioSchemaDtoRestraints {
    
    tamMinNome = 3,
    tamMaxNome = 50,

    tamMinSobrenome = 3,
    tamMaxSobrenome = 100,

    tamMinSexo = 3,
    tamMaxSexo = 15,

    tamMinNumeroTelefone = 11,
    tamMaxNumeroTelefone = 20,

    tamMinCpf = 14,
    tamMaxCpf = 14,

    tamMinCnpj = 18,
    tamMaxCnpj = 20,

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

}

export {UsuarioSchemaDtoRestraints}