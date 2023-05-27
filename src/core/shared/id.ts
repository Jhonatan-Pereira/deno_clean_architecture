import { generate } from "https://deno.land/std@0.85.0/uuid/v4.ts";

export default class ID {
    static gerarToken(): string {
        return generate();
    }
}