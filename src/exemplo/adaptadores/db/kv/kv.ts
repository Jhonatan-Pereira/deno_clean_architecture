import "https://deno.land/x/dotenv@v3.2.2/load.ts";
import ColecaoUsuario from "../../../app/usuario/ColecaoUsuario.ts";
import Usuario from "../../../app/usuario/Usuario.ts";

export default class ColecaoUsuarioDB implements ColecaoUsuario {

    async inserir(usuario: Usuario) {
        const nameTable = Deno.env.get("DATABASE") 
        const kv = await Deno.openKv();
        await kv.set([nameTable!, usuario.id], usuario)
        kv.close()
    }

}