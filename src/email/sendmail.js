import { logError } from "../utils/logger" ;
import { NotifyClient } from "notifications-node-client";

const key = process.env.NOTIFICATION_API_KEY;
if (key === '' || typeof key === 'undefined') {
  throw 'NOTIFICATION_API_KEY environment variable not found'
}
const baseUrl = process.env.NOTIFICATION_API_BASE_URL;
if (baseUrl === '' || typeof baseUrl === 'undefined') {
  throw 'NOTIFICATION_API_BASE_URL environment variable not found'
}
const notifyClient =
  process.env.NODE_ENV != "test" ? new NotifyClient(baseUrl, key) : false;

export const sendNotification = async (params = { email, templateId, options }) => {
  const { templateId, email, options } = params;

  if (!templateId || !email) {
    logError("no template ID or email was passed");
    return false;
  }

  try {
    const response = await notifyClient.sendEmail(templateId, email, options);
    return response.body;
  } catch (err) {
    logError(err)
    return false;
  }
};
