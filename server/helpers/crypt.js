const crypto = require('crypto')

const SECRET_KEY = process.env.SECRET_KEY
const ALGO = process.env.ALGO
const IV = crypto.randomBytes(16);

class Crypt {
  /**
   * encrypt function
   * @param {String} payload
   * @returns {Object}
   */
  static async encrypt(payload) {
    const generatedCipher = await crypto.createCipheriv(ALGO, SECRET_KEY, IV);
    const encryptedValue = Buffer.concat([generatedCipher.update(payload), generatedCipher.final()]);

    return {
      iv: IV.toString('hex'),
      encryptedContent: encryptedValue.toString('hex')
    }
  }
  /**
   * decrypt function
   * @param {Object} encrypted data
   */
  static async decrypt(encryptedData) {
    const decipheredVi = await crypto.createDecipheriv(ALGO, SECRET_KEY, Buffer.from(encryptedData.iv, 'hex'));
    const decrpytedContent = Buffer.concat([decipheredVi.update(Buffer.from(encryptedData.encryptedContent, 'hex')), decipheredVi.final()]);

    return decrpytedContent.toString();
  }
  /**
   * create md5 hash from payload
   * @param {Object} payload
   */
  static hash(payload) {
    return crypto.createHash('md5').update(JSON.stringify(payload)).digest("hex");
  }
}

module.exports = Crypt;
