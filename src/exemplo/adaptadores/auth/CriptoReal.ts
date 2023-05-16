import * as bcrypt from 'https://deno.land/x/bcrypt@v0.4.1/mod.ts'
import ProvedorCriptografia from "../../app/portas/ProvedorCriptografia.ts";

export default class CriptoReal implements ProvedorCriptografia {
    criptografar(senha: string): string {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(senha, salt)
    }
    comparar(senha: string, senhaCripto: string): boolean {
        return bcrypt.compareSync(senha, senhaCripto)
    }
}