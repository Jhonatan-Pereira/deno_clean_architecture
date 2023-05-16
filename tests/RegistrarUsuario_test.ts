import { assertExists, assertEquals } from "https://deno.land/std@0.187.0/testing/asserts.ts";
import RegistarUsuario from "../src/RegistrarUsuario.ts";
import Colecao from "../src/Colecao.ts";
import BancoEmMemoria from "../src/BancoEmMemoria.ts";

Deno.test("Deve registrar um usuário", () => {
    const colecao: Colecao = new BancoEmMemoria()
    const casoDeUso = new RegistarUsuario(colecao)
    const usuario = casoDeUso.executar('João da silva', 'joao@gmail.com', '12345')

    assertExists(usuario.id)
    assertEquals(usuario.nome, 'João da silva');
});