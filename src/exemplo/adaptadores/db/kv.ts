import "https://deno.land/x/dotenv@v3.2.2/load.ts";
import Usuario from "../../app/usuario/Usuario.ts";
import ColecaoUsuario from "../../app/usuario/ColecaoUsuario.ts";

export default class ColecaoUsuarioDB implements ColecaoUsuario {
    async inserir(usuario: Usuario) {
        const nameTable = Deno.env.get("DATABASE") 
        const kv = await Deno.openKv();
        await kv.set([nameTable!, usuario.email], usuario)
        kv.close()
    }

    async buscarPorEmail(email: string): Promise<Usuario|null> {
        const nameTable = Deno.env.get("DATABASE") 
        const kv = await Deno.openKv();
        const res = await kv.get([nameTable!, email])
        const usuario = res.value as Usuario
        kv.close()
        return Promise.resolve(usuario || null)
    }
}