
PS C:\Users\carlos\Documents\Curso NodeJS\trabajos-nodeJs> node
Welcome to Node.js v20.11.1.
Type ".help" for more information.
comandos:
> .help

  Press Ctrl+C to abort current expression, Ctrl+D to exit the REPL
> const crypto = require('crypto');
  undefined
> console.log(Object.keys(crypto))
  [
  'checkPrime',
  'checkPrimeSync',
  'createCipheriv',
  'createDecipheriv',
  'createDiffieHellman',
  'createDiffieHellmanGroup',
  'createECDH',
  'createHash',
  'createHmac',
  'createPrivateKey',
  'createPublicKey',
  'createSecretKey',
  'createSign',
  'createVerify',
  'diffieHellman',
  'generatePrime',
  'generatePrimeSync',
  'getCiphers',
  'getCipherInfo',
  'getCurves',
  'getDiffieHellman',
  'getHashes',
  'hkdf',
  'hkdfSync',
  'pbkdf2',
  'pbkdf2Sync',
  'generateKeyPair',
  'generateKeyPairSync',
  'generateKey',
  'generateKeySync',
  'privateDecrypt',
  'privateEncrypt',
  'publicDecrypt',
  'publicEncrypt',
  'randomBytes',
  'randomFill',
  'randomFillSync',
  'randomInt',
  'randomUUID',
  'scrypt',
  'scryptSync',
  'sign',
  'setEngine',
  'timingSafeEqual',
  'getFips',
  'setFips',
  'verify',
  'Certificate',
  'Cipher',
  'Cipheriv',
  'Decipher',
  'Decipheriv',
  'DiffieHellman',
  'DiffieHellmanGroup',
  'ECDH',
  'Hash',
  'Hmac',
  'KeyObject',
  'Sign',
  'Verify',
  'X509Certificate',
  'secureHeapUsed',
  'constants',
  'webcrypto',
  'subtle',
  'getRandomValues'
]
  undefined
> const randomId = crypto.randomBytes(16).toString('hex');
  undefined
> console.log(randomId);
  66d9fec533a865bb1adf964ad8cf460c
  undefined