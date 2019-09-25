 
const NotifyClient = require("notifications-node-client").NotifyClient;
const key = process.env.API_KEY;
const baseUrl = process.env.API_BASE_URL;
const notifyClient =
  process.env.NODE_ENV != "test" ? new NotifyClient(baseUrl, key) : false;

const sendNotification = async (params = { email, templateId, options }) => {
  const { templateId, email, options } = params;

  if (!templateId || !email) {
    console.error("no template ID or email was passed");
    return false;
  }

  try {
    const response = await notifyClient.sendEmail(templateId, email, options);
    return response.body;
  } catch (err) {
    console.error(err)
    return false;
  }
};

module.exports = {
  sendNotification,
  notifyClient
};