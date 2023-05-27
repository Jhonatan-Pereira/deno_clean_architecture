import ProvedorCriptografia from "../../core/usuario/ProvedorCriptografia.ts";

export default class SenhaComEspaco implements ProvedorCriptografia {
    comparar(senha: string, senhaCripto: string): boolean {
        const senhaFornecida = this.criptografar(senha)
        return senhaFornecida === senhaCripto
    }
    criptografar(senha: string): string {
        return senha.split('').join(' ')
    }
}