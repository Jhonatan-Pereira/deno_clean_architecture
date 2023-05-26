import ColecaoUsuario from "../../app/usuario/ColecaoUsuario.ts";
import Usuario from "../../app/usuario/Usuario.ts";

export default class UsuarioEmMemoria implements ColecaoUsuario {
    private static items: Usuario[] = []

    // deno-lint-ignore require-await
    async inserir(item: Usuario): Promise<void> {
        UsuarioEmMemoria.items.push(item)
    }
}