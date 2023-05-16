import Colecao from "../portas/Colecao.ts";
import ProvedorCriptografia from "../portas/ProvedorCriptografia.ts";
import Usuario from "./Usuario.ts";
export default class RegistarUsuario {

    constructor(
        private colecao: Colecao,
        private provedorCripto: ProvedorCriptografia,
    ) {}

    executar(nome: string, email: string, senha: string): Usuario {
        const senhaCripto = this.provedorCripto.criptografar(senha)
        const usuario: Usuario = {
            id: `${Math.random()}`, nome, email, senha: senhaCripto
        }

        this.colecao.inserir(usuario)
        return usuario
    }
}