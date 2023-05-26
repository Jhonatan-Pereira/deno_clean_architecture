import { assertExists, assertEquals, assert } from "https://deno.land/std@0.187.0/testing/asserts.ts";
import RegistarUsuario from "../src/exemplo/app/usuario/RegistrarUsuario.ts";
import InverterSenha from "../src/exemplo/adaptadores/auth/InverterSenha.ts";
import SenhaComEspaco from "../src/exemplo/adaptadores/auth/SenhaComEspaco.ts";
import CriptoReal from "../src/exemplo/adaptadores/auth/CriptoReal.ts";
import UsuarioEmMemoria from "../src/exemplo/adaptadores/db/UsuarioEmMemoria.ts";
import ColecaoUsuarioDB from "../src/exemplo/adaptadores/db/kv/kv.ts";

Deno.test("Deve registrar um usuário invertendo a senha", () => {
    const colecao = new UsuarioEmMemoria()
    const provedorCripto = new InverterSenha()
    const casoDeUso = new RegistarUsuario(colecao, provedorCripto)
    const usuario = casoDeUso.executar('João da silva', 'joao@gmail.com', '12345')

    assertExists(usuario.id)
    assertEquals(usuario.nome, 'João da silva');
    assertEquals(usuario.senha, '54321');
});

Deno.test("Deve registrar um usuário com senha com espaços", () => {
    const colecao = new UsuarioEmMemoria()
    const provedorCripto = new SenhaComEspaco()
    const casoDeUso = new RegistarUsuario(colecao, provedorCripto)
    const usuario = casoDeUso.executar('João da silva', 'joao@gmail.com', '12345')

    assertExists(usuario.id)
    assertEquals(usuario.nome, 'João da silva');
    assertEquals(usuario.senha, '1 2 3 4 5');
});

Deno.test("Deve registrar um usuário com senha criptografada", () => {
    const colecao = new UsuarioEmMemoria()
    const provedorCripto = new CriptoReal()
    const casoDeUso = new RegistarUsuario(colecao, provedorCripto)
    const usuario = casoDeUso.executar('João da silva', 'joao@gmail.com', '12345')

    assertExists(usuario.id)
    assertEquals(usuario.nome, 'João da silva');
    assert(provedorCripto.comparar('12345', usuario.senha!));
});

Deno.test("Deve registrar um usuário no banco real", () => {
    const colecao = new ColecaoUsuarioDB()
    const provedorCripto = new CriptoReal()
    const casoDeUso = new RegistarUsuario(colecao, provedorCripto)
    const usuario = casoDeUso.executar('João da silva', 'joao@gmail.com', '12345')

    assertExists(usuario.id)
    assertEquals(usuario.nome, 'João da silva');
    assert(provedorCripto.comparar('12345', usuario.senha!));
});