import ID from "../shared/id.ts";
import ProvedorCriptografia from "../usuario/ProvedorCriptografia.ts";
import ColecaoUsuario from "./ColecaoUsuario.ts";
import Usuario from "./Usuario.ts";
export default class RegistarUsuario {

    constructor(
        private colecao: ColecaoUsuario,
        private provedorCripto: ProvedorCriptografia,
    ) {}

    executar(nome: string, email: string, senha: string): Usuario {
        const senhaCripto = this.provedorCripto.criptografar(senha)
        const usuario: Usuario = {
            id: ID.gerarToken(), 
            nome, 
            email, 
            senha: senhaCripto
        }

        this.colecao.inserir(usuario)
        return usuario
    }
}