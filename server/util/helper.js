import { compare, hash } from "bcrypt";

export async function hashPassword(value) {
    const hashedPassword = await hash(value, 10)
    return hashedPassword;
}

export async function compareHash(value, hash) {
    return await compare(value, hash)
}
