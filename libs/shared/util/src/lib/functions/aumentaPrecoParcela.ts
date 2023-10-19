import { asaasConfigs } from "../configs";

function aumentaPrecoParcela(precoIntegro:number){
    const precoParcela = precoIntegro + ((precoIntegro / 100) * asaasConfigs.porcentualParcela);
    return precoParcela;
}

export {aumentaPrecoParcela}