const Secret = require('../models/secret');
const crypto = require('crypto');

class SecretController {
  /**
   * get a secret by hash
   * @param {RequestObject} req
   * @param {ResponseObject} res
   */
  static async getSecret(req, res) {

  }
  /**
   * create a new secret
   * @param {RequestObject} req
   * @param {ResponseObject} res
   */
  static async makeSecret(req, res) {
    const { body } = req;
    const payload = {
      hash: crypto.createHash('md5').update(data).digest("hex"),
      remainingViews: body.expireAfterViews,
      secretText: body.secret,
      expiresAt: body.expireAfter
    }

    const newSecret = await Secret.create(body);
    return res.status(200).json(newSecret)
  }
}

module.exports = SecretController
