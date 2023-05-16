import Colecao from "./Colecao.ts";

export default class BancoEmMemoria implements Colecao {
    // deno-lint-ignore no-explicit-any
    private static items: any[] = []

    // deno-lint-ignore no-explicit-any
    inserir(item: any) {
        BancoEmMemoria.items.push(item)
        return item
    }
}