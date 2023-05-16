import Colecao from "./Colecao.ts";
import ProvedorCriptografia from "./ProvedorCriptografia.ts";
export default class RegistarUsuario {

    constructor(
        private colecao: Colecao,
        private provedorCripto: ProvedorCriptografia,
    ) {}

    executar(nome: string, email: string, senha: string) {
        const senhaCripto = this.provedorCripto.criptografar(senha)
        const usuario = {
            id: Math.random(), nome, email, senha: senhaCripto
        }

        this.colecao.inserir(usuario)
        return usuario
    }
}