import Usuario from "./Usuario.ts";

export default interface ColecaoUsuario {
    inserir(usuario: Usuario): Promise<void>
}