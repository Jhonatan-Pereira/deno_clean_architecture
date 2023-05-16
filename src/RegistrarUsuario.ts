export default class RegistarUsuario {

    // deno-lint-ignore no-explicit-any
    usuarios: any[] = []

    executar(nome: string, email: string, senha: string) {
        const senhaCripto = senha.split('').reverse().join('')
        const usuario = {
            id: Math.random(), nome, email, senha: senhaCripto
        }
        this.usuarios.push(usuario)
        return usuario
    }
}