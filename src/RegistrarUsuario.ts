import Colecao from "./Colecao.ts";
import InverterSenha from "./InverterSenha.ts";

export default class RegistarUsuario {

    private inverterSenha = new InverterSenha()

    constructor(
        private colecao: Colecao
    ) {}

    executar(nome: string, email: string, senha: string) {
        const senhaCripto = this.inverterSenha.criptografar(senha)
        const usuario = {
            id: Math.random(), nome, email, senha: senhaCripto
        }

        this.colecao.inserir(usuario)
        return usuario
    }
}