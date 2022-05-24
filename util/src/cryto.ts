import * as forge from 'node-forge'
import * as utf8 from 'utf8'
const base64_endcode = (text: any) => {
    let endcodeText = text;
    endcodeText = endcodeText.replaceAll("+", ".");
    endcodeText = endcodeText.replaceAll("/", "_");
    endcodeText = endcodeText.replaceAll("=", "-");
    return endcodeText;
};

const base64_decode = (text: any) => {
    let decodeText = text;
    decodeText = decodeText.replaceAll(".", "+");
    decodeText = decodeText.replaceAll("_", "/");
    decodeText = decodeText.replaceAll("-", "=");
    return decodeText;
};
export const encrypt3DES = (key: string, text: string) => {
    key = utf8.encode(key);
    var cipher = forge.cipher.createCipher(
        "3DES-CBC",
        forge.util.createBuffer(key)
    );
    cipher.start({ iv: "00000000" });
    cipher.update(forge.util.createBuffer(text));
    cipher.finish();
    var encrypted = forge.util.encode64(cipher.output.getBytes()); //cipher.output.toHex();
    encrypted = base64_endcode(encrypted);
    return encrypted;
};
export const decrypt3DES = (key: string, encrypted_text: string): string => {
    try {
        key = utf8.encode(key);
        var decipher = forge.cipher.createDecipher(
            "3DES-CBC",
            forge.util.createBuffer(key)
        );

        let encrypted_text_decode = base64_decode(encrypted_text);
        encrypted_text_decode = forge.util.decode64(encrypted_text_decode);
        decipher.start({ iv: "00000000" });
        decipher.update(forge.util.createBuffer(encrypted_text_decode));
        decipher.finish();

        var decrypted = decipher.output.toString();
        return decrypted;
    } catch (err) {
        throw err;
    }
};