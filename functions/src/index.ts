import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

admin.initializeApp();

function fromAdminRecord(user: admin.auth.UserRecord): any {
  const adminRecord = {...user} as any;

  delete adminRecord.passwordHash;
  delete adminRecord.passwordSalt;

  adminRecord.metadata = {...user.metadata};
  adminRecord.providerData =
    user.providerData.map(
      (providerData: admin.auth.UserInfo) => ({...providerData})
    );

  // Switch field default from null to {}
  if (!adminRecord.customClaims) {
    adminRecord.customClaims = {};
  }

  return adminRecord;
}

function setCustomUserClaims(uid: string, claims: any): Promise<void> {
  return admin.auth().setCustomUserClaims(uid, claims);
}

function validateAdmin(context: functions.https.CallableContext) {
  if (!context.auth || !context.auth.token.admin) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "This API must be called while authenticated as an admin.");
  }
}

export const listUsers = functions.https.onCall(
  async (
    _data: any,
    context: functions.https.CallableContext
  ): Promise<any[]> => {
    validateAdmin(context);

    return admin.auth()
      .listUsers()
      .then((listUsersResult: admin.auth.ListUsersResult) => {
        const users: any[] = [];

        listUsersResult.users.forEach((userRecord: admin.auth.UserRecord) => {
          users.push(fromAdminRecord(userRecord));
        });

        return users;
      })
      .catch((error) => {
        throw new functions.https.HttpsError("internal", error.message);
      });
  });

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
