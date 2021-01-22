const Secret = require('../models/secret');
const { encrypt, decrypt, hash } = require('../helpers/crypt');

class SecretController {
  /**
   * get a secret by hash
   * @param {RequestObject} req
   * @param {ResponseObject} res
   */
  static async getSecret(req, res) {
    const { id } = req.params
    const secret = await Secret.findOne({ hash: id }).then(secret => secret)
    if (!secret) {
      return res.status(200).json({ error: true, message: 'This isn\'t a secret' })
    }
    if (secret.remainingViews === 0) {
      return res.status(200).json({ message: 'Sorry, too many eyes saw this secret' })
    }
    const today = new Date();
    if ((today > secret.expiresAt) && secret.expiresAt !== 0) {
      return res.status(200).json({ message: 'Sorry, this secret is no longer available' })
    }

    secret.remainingViews -= 1;
    await secret.save()

    return res.json({
      hash: secret.hash,
      secretText: await decrypt(secret.secret),
      createdAt: secret.createdAt,
      expiresAt: secret.expiresAt,
      remainingViews: secret.remainingViews
    })
  }
  /**
   * create a new secret
   * @param {RequestObject} req
   * @param {ResponseObject} res
   */
  static async makeSecret(req, res) {
    const { expireAfterViews, expireAfter, secret } = req.body;
    const encryptedData = await encrypt(secret);

    const payload = {
      hash: hash(encryptedData),
      secret: encryptedData,
      remainingViews: expireAfterViews,
      expiresAt: expireAfter
    }

    const newSecret = await Secret.create(payload);

    return res.status(200).json({
      hash: payload.hash,
      secretText: secret,
      createdAt: newSecret.createdAt,
      expiresAt: newSecret.expiresAt,
      remainingViews: newSecret.remainingViews
    });
  }
}

module.exports = SecretController
