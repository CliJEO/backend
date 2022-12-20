const admin = require("firebase-admin");
const serviceAccount = require("../firebase-adminkey.json");
const {
  genUserNotification,
  genAdminNotification,
  ADMIN_NOTIF_TOPIC,
  USER_NOTIF_TOPIC,
} = require("../config/notifications");
const sequelize = require("../db");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = {
  registerNewToken: async (token, userType) => {
    let topic;
    if (userType == "user") {
      topic = USER_NOTIF_TOPIC;
    } else if (userType == "admin") {
      topic = ADMIN_NOTIF_TOPIC;
    } else {
      return;
    }

    try {
      await admin.messaging().subscribeToTopic([token], topic);
    } catch (error) {
      console.log("Error subscribing to topic:", error);
    }
  },
  notifyUserAboutUpdate: async (query, user) => {
    const fcmTokens = await sequelize.models.fcmToken.findAll({
      where: { userId: user.id },
      attributes: ["token"],
    });
    const userTokensArr = fcmTokens.map((o) => o.token);

    const response = await admin.messaging().sendMulticast({ data: genUserNotification(query), tokens: userTokensArr });
    if (response.failureCount > 0) {
      const failedTokens = [];
      response.responses.forEach((resp, index) => {
        if (!resp.success && resp.error.code == "messaging/registration-token-not-registered") {
          failedTokens.push(fcmTokens[index]);
        }
      });
      for (const t of failedTokens) {
        t.destroy();
      }
    }
  },
  notifyAllAdmins: async (query, isNewQuery) => {
    try {
      await admin.messaging().send({ data: genAdminNotification(query, isNewQuery), topic: ADMIN_NOTIF_TOPIC });
    } catch (err) {
      console.log("Admin Notification Failed: " + err.message);
    }
  },
};
