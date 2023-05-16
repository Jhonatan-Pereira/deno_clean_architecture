import ProvedorCriptografia from "./ProvedorCriptografia.ts";

export default class InverterSenha implements ProvedorCriptografia {
    criptografar(senha: string): string {
        return senha.split('').reverse().join('')
    }
}