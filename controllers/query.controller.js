const sequelize = require("../db");
const unlinkAsync = require("util").promisify(require("fs").unlink);

async function create(req, res) {
  const user = req.user;
  const content = req.body.content;
  const title = req.body.title;
  const files = req.files || [];

  // title - 50 characters / 10 words
  // content - 1250 characters / 250 words max
  if (!title || !content || title.length > 50 || content.length > 1250) {
    // delete all the received files
    for (const file of req.files) {
      await unlinkAsync(file.path);
    }
    return res.status(400).json({ message: "Title or content not within limits." });
  }

  let query;
  try {
    query = await sequelize.models.query.create(
      {
        userId: user.id,
        title,
        content,
        media: files.map(({ filename }) => ({ filename })),
      },
      { include: [sequelize.models.media] }
    );
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  return res.json({ ok: true });
}

async function close(req, res) {
  try {
    await sequelize.models.query.update({ closed: true }, { where: { id: req.params.id } });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }

  return res.json({ ok: true });
}

async function getOne(req, res) {
  const query = await sequelize.models.query.findByPk(req.params.id, {
    include: [
      { model: sequelize.models.media, attributes: ["filename"] },
      { model: sequelize.models.user, attributes: ["name", "profilePicture"] },
      {
        model: sequelize.models.response,
        attributes: ["content", "timestamp"],
        order: [["timestamp", "ASC"]],
        include: {
          model: sequelize.models.admin,
          attributes: ["name", "profilePicture"],
        },
      },
    ],
  });

  if (!(query && (req.admin || req.user.id == query.userId))) {
    return res.status(400).json({ message: "Cannot access this query" });
  }

  return res.json(query.get({ plain: true }));
}

async function getPending(req, res) {
  const pendingQueries = await sequelize.models.query.findAll({
    attributes: ["id", "title", "timestamp"],
    where: { closed: false },
    order: [["timestamp", "DESC"]],
    include: { model: sequelize.models.user, attributes: ["name", "profilePicture"] },
  });

  return res.json(pendingQueries.map((q) => q.get({ plain: true })));
}

module.exports = { create, close, getOne, getPending };
