const Dev = require('../models/Dev');
const Proc = require('../models/Proc');

module.exports = {
  async store(req, res) {
    console.log(req.io, req.connectedUsers);

    const { user } = req.headers;
    const { devId } = req.params;

    const loggedDev = await Dev.findById(user);
    let targetDev = null

    try {
      targetProc = await Proc.findById(devId);
    } catch (error) {
      return res.status(400).json({ error: 'Proc not exists' });
    }

    loggedDev.likes.push(targetProc._id);

    await loggedDev.save();

    return res.json(loggedDev);
  }
};