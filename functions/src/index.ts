import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

admin.initializeApp();

function setCustomUserClaims(uid: string, claims: any): Promise<void> {
  return admin.auth().setCustomUserClaims(uid, claims);
}

export const onCreate = functions.auth.user()
  .onCreate((user: admin.auth.UserRecord): Promise<void> => {
    const defaultEmail = functions.config().admin.default_email;

    if (user.email === defaultEmail &&
        user.providerData.length === 1 &&
        user.providerData[0].providerId === "password") {
      return setCustomUserClaims(user.uid, {admin: true});
    } else {
      return Promise.resolve();
    }
  });
