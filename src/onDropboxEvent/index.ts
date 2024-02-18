import { Dropbox } from "dropbox";
export default async function onDropboxEvent(body: WebhookBody) {
  // Validate body
  if (!body || !body.list_folder) {
    console.warn("No body.list_folder in request");
    return;
  }

  // Bail if the webhook is not for the expected user ID
  if (!validateUserId(body)) return;

  const dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN });

  try {
    const accounts = body.list_folder.accounts;
    for (const accountId of accounts) {
      const response = await dbx.filesListFolder({ path: "" });
      response.result.entries.forEach((entry) => {
        console.log(entry);
        if (entry[".tag"] === "file") {
          console.log(`New file: ${entry.name}`);
        }
      });
    }
  } catch (error) {
    console.error("Error listing changes from Dropbox:", error);
  }
}

/**
 * HELPER FUNCTION:
 * Checks if the userId in the webhook matches the one specified in the .env file
 */
function validateUserId(body: { list_folder?: { accounts?: string[] } } = {}) {
  const requestUserIds =
    body.list_folder?.accounts?.map((id: string) => id) || [];
  const expectedUserId = process.env.DROPBOX_USER_ID || "";
  const valid = requestUserIds.includes(expectedUserId);
  if (!valid) {
    console.warn("UNKNOWN USER ID:", requestUserIds);
    console.warn(
      `If this is you, add DROPBOX_USER_ID=${requestUserIds[0]} to your .env file`,
    );
  }
  return valid;
}

/**
 * TYPES:
 * These types are used to validate the webhook request body
 */
type WebhookBody = {
  list_folder?: {
    accounts: string[];
  };
};
