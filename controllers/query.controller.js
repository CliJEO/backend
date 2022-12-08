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
    query = await sequelize.models.query.create({
      userId: user.id,
      title,
      content,
    });

    await sequelize.models.media.bulkCreate(
      files.map(
        (file) => ({
          filename: file.filename,
          queryId: query.id,
        }),
        { validate: true }
      )
    );
  } catch (err) {
    if (query) {
      for (const file of req.files) {
        await unlinkAsync(file.path);
      }
      await sequelize.models.media.destroy({ where: { queryId: query.id } });
    }

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
  const query = await sequelize.models.query.findByPk(req.params.id, { raw: true });

  if (!(query && (req.admin || req.user.id == query.userId))) {
    return res.status(400).json({ message: "Cannot access this query" });
  }

  const user = req.user || (await sequelize.models.user.findByPk(query.userId), { raw: true });

  const media = await sequelize.models.media.findAll({
    where: { queryId: query.id },
    attributes: ["filename"],
    raw: true,
  });

  const responses = await sequelize.models.response.findAll({
    where: { parentId: query.id },
    attributes: ["content", "adminResponder", "timestamp"],
    order: [["timestamp", "ASC"]],
    raw: true,
  });

  const adminResponders = {};
  for (const r of responses) {
    if (r.adminResponder && !adminResponders[r]) {
      adminResponders[r] = await sequelize.models.admin.findByPk(r.adminResponder, { raw: true });
    }
  }

  const blownResponses = responses.map((r) => {
    const isAdmin = !!r.adminResponder;
    const responder = isAdmin ? adminResponders[r.adminResponder] : user;

    return {
      content,
      timestamp: new Date(r.timestamp).getTime(),
      author: {
        isAdmin,
        name: responder.name,
        avatar: responder.profilePicture,
      },
    };
  });

  return res.json({
    ...query,
    timestamp: new Date(query.timestamp).getTime(),
    media: media.map((m) => ({ url: `/media/${m.filename}` })),
    responses: blownResponses,
  });
}

async function getPending(req, res) {
  const pendingQueries = await sequelize.models.query.findAll({
    attributes: ["id", "title", "timestamp", "userId"],
    where: { closed: false },
    order: [["timestamp", "DESC"]],
    raw: true,
  });

  const users = {};

  for (const q of pendingQueries) {
    if (!users[q.userId]) {
      users[q.userId] = await sequelize.models.user.findByPk(q.userId, {
        attributes: ["name", ["profilePicture", "avatar"]],
        raw: true,
      });
    }
  }

  return res.json(
    pendingQueries.map((q) => ({
      ...q,
      timestamp: new Date(q.timestamp).getTime(),
      userId: undefined,
      user: users[q.userId],
    }))
  );
}

module.exports = { create, close, getOne, getPending };
