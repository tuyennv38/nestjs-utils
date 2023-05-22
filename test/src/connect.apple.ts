
import jwt, { SignOptions } from 'jsonwebtoken'
const issuerId = '83857287-9ce8-43dc-9874-c6409fd3acd9';
const apiKey = 'BY9Q5Z34D6';
const privateKey = '-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgvwy6Fo5tnQoOnNVP\nBj9CY5eOXQwLhbbEDlJNoDZS3digCgYIKoZIzj0DAQehRANCAATEWKyvj6+tveKM\nyS84MiDnvl/8hwGP4aAO5mRkpUY76Sl/NeiRlmE5xV26lM8gP5+M+JjQAIJj6fmI\nMa67bDkQ\n-----END PRIVATE KEY-----';

(async () => {
    const now = Math.round(new Date().getTime() / 1000);
    const expirationTime = now + 20 * 60;
    const headers:SignOptions = {
        algorithm: "ES256",
        header: {
            alg: "ES256",
            kid: apiKey,
            typ: "JWT",
        },

    };
    const payload = {
        iss: issuerId,
        exp: expirationTime,
        aud: "appstoreconnect-v1",
    };
    const token = jwt.sign(payload, privateKey, headers);
    console.log('token',token)
})()
