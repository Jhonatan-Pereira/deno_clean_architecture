import { assertExists, assertEquals } from "https://deno.land/std@0.187.0/testing/asserts.ts";
import RegistarUsuario from "../src/exemplo/app/usuario/RegistrarUsuario.ts";
import BancoEmMemoria from "../src/exemplo/adaptadores/db/BancoEmMemoria.ts";
import InverterSenha from "../src/exemplo/adaptadores/auth/InverterSenha.ts";
import SenhaComEspaco from "../src/exemplo/adaptadores/auth/SenhaComEspaco.ts";

Deno.test("Deve registrar um usuário invertendo a senha", () => {
    const colecao = new BancoEmMemoria()
    const provedorCripto = new InverterSenha()
    const casoDeUso = new RegistarUsuario(colecao, provedorCripto)
    const usuario = casoDeUso.executar('João da silva', 'joao@gmail.com', '12345')

    assertExists(usuario.id)
    assertEquals(usuario.nome, 'João da silva');
    assertEquals(usuario.senha, '54321');
});

Deno.test("Deve registrar um usuário com senha com espaços", () => {
    const colecao = new BancoEmMemoria()
    const provedorCripto = new SenhaComEspaco()
    const casoDeUso = new RegistarUsuario(colecao, provedorCripto)
    const usuario = casoDeUso.executar('João da silva', 'joao@gmail.com', '12345')

    assertExists(usuario.id)
    assertEquals(usuario.nome, 'João da silva');
    assertEquals(usuario.senha, '1 2 3 4 5');
});