const genUserNotification = (query) => ({
  title: "Your query has an update.",
  body: query.title,
  queryId: `${query.id}`,
});

const genAdminNotification = (query, newQuery) => ({
  title: newQuery ? "A new query has been posted." : "A query has an update.",
  body: query.title,
  queryId: `${query.id}`,
});

const USER_NOTIF_TOPIC = "CliJEO_User";

const ADMIN_NOTIF_TOPIC = "CliJEO_Admin";

module.exports = { genUserNotification, genAdminNotification, USER_NOTIF_TOPIC, ADMIN_NOTIF_TOPIC };
