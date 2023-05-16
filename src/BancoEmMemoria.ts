export default class BancoEmMemoria {
    // deno-lint-ignore no-explicit-any
    private static items: any[] = []

    // deno-lint-ignore no-explicit-any
    inserir(item: any) {
        BancoEmMemoria.items.push(item)
        return item
    }
}