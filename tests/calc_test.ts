import { assertEquals } from "https://deno.land/std@0.187.0/testing/asserts.ts";
import soma from "../src/calc.ts";

Deno.test("Deve somar dois numeros", () => {
    const resultado = soma(1,2)
    assertEquals(resultado, 3);
});