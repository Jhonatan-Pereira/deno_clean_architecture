import ColecaoUsuario from "../../core/usuario/ColecaoUsuario.ts";
import Usuario from "../../core/usuario/Usuario.ts";

export default class UsuarioEmMemoria implements ColecaoUsuario {
    private items: Usuario[] = []

    // deno-lint-ignore require-await
    async inserir(item: Usuario): Promise<void> {
        this.items.push(item)
    }

    buscarPorEmail(email: string): Promise<Usuario|null> {
        const usuario = this.items.find(item => item.email === email)
        return Promise.resolve(usuario || null)
    }
}