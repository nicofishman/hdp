const characters = 'CDEFHJKMNPRTVWXY23456789';

export const generateShortCode = () => {
    const rand = new Uint32Array(1);
    crypto.getRandomValues(rand);
    let codeNumber = rand[0];

    let code = '';
    while (codeNumber > 0) {
        const index = codeNumber % characters.length;
        code = characters[index] + code;
        codeNumber = (codeNumber - index) / characters.length;
    }
    return code;
};
