import bcrypt from 'bcryptjs';

export const passwordCheck = async (password, hashedPassword) => {
    const valid = await bcrypt.compare(password, hashedPassword);
    return valid;
}