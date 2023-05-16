import BancoEmMemoria from "./BancoEmMemoria.ts"
import InverterSenha from "./InverterSenha.ts";

export default class RegistarUsuario {

    private banco = new BancoEmMemoria()
    private inverterSenha = new InverterSenha()

    executar(nome: string, email: string, senha: string) {
        const senhaCripto = this.inverterSenha.criptografar(senha)
        const usuario = {
            id: Math.random(), nome, email, senha: senhaCripto
        }

        this.banco.inserir(usuario)
        return usuario
    }
}