import { assertExists, assertEquals, assert, assertRejects } from "https://deno.land/std@0.187.0/testing/asserts.ts";
import { faker } from "https://deno.land/x/deno_faker@v1.0.3/mod.ts";
import UsuarioEmMemoria from "../src/adaptadores/db/UsuarioEmMemoria.ts";
import RegistarUsuario from "../src/core/usuario/RegistrarUsuario.ts";
import SenhaComEspaco from "../src/adaptadores/auth/SenhaComEspaco.ts";
import CriptoReal from "../src/adaptadores/auth/CriptoReal.ts";
import InverterSenha from "../src/adaptadores/auth/InverterSenha.ts";
import ColecaoUsuarioDB from "../src/adaptadores/db/kv.ts";

Deno.test("Deve registrar um usuário invertendo a senha", async () => {
    const colecao = new UsuarioEmMemoria()
    const provedorCripto = new InverterSenha()
    const casoDeUso = new RegistarUsuario(colecao, provedorCripto)
    const usuario = await casoDeUso.executar('João da silva', 'joao@gmail.com', '12345')

    assertExists(usuario.id)
    assertEquals(usuario.nome, 'João da silva');
    assertEquals(usuario.senha, '54321');
});

Deno.test("Deve registrar um usuário com senha com espaços", async () => {
    const colecao = new UsuarioEmMemoria()
    const provedorCripto = new SenhaComEspaco()
    const casoDeUso = new RegistarUsuario(colecao, provedorCripto)
    const usuario = await casoDeUso.executar('João da silva', 'joao@gmail.com', '12345')

    assertExists(usuario.id)
    assertEquals(usuario.nome, 'João da silva');
    assertEquals(usuario.senha, '1 2 3 4 5');
});

Deno.test("Deve registrar um usuário com senha criptografada", async () => {
    const colecao = new UsuarioEmMemoria()
    const provedorCripto = new CriptoReal()
    const casoDeUso = new RegistarUsuario(colecao, provedorCripto)
    const usuario = await casoDeUso.executar('João da silva', 'joao@gmail.com', '12345')

    assertExists(usuario.id)
    assertEquals(usuario.nome, 'João da silva');
    assert(provedorCripto.comparar('12345', usuario.senha!));
});

Deno.test("Deve registrar um usuário no banco real", async () => {
    const colecao = new ColecaoUsuarioDB()
    const provedorCripto = new CriptoReal()
    const casoDeUso = new RegistarUsuario(colecao, provedorCripto)
    const email = faker.internet.email()
    const usuario = await casoDeUso.executar('João da silva', email, '12345')

    assertExists(usuario.id)
    assertEquals(usuario.nome, 'João da silva');
    assert(provedorCripto.comparar('12345', usuario.senha!));
});

Deno.test("Deve lançar erro ao cadastrar usuário já cadastrado", async () => {
    const colecao = new UsuarioEmMemoria()
    const provedorCripto = new CriptoReal()
    const casoDeUso = new RegistarUsuario(colecao, provedorCripto)
    const nome = 'João da silva'
    const email = 'joao@gmail.com'
    const senha = '12345'
    await casoDeUso.executar(nome, email, senha)
    const exec = () => casoDeUso.executar(nome, email, senha)

    await assertRejects(exec, Error, 'Usuário já existe.')
});