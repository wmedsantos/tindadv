const Dev = require('../models/Dev');
const Proc = require('../models/Proc');

module.exports = {
  async store(req, res) {
    const { user } = req.headers;
    const { devId } = req.params;

    const loggedDev = await Dev.findById(user);
    let targetProc = null

    try {
      targetProc = await Proc.findById(devId);
    } catch (error) {
      return res.status(400).json({ error: 'Proc not exists' });
    }
    

    loggedDev.dislikes.push(targetProc._id);

    await loggedDev.save();

    return res.json(loggedDev);
  }
};