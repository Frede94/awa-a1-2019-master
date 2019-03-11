import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

//https://us-central1-morsecode-frede-2.cloudfunctions.net/helloWorld
// https://us-central1-morsecode-frede-2.cloudfunctions.net/users

admin.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
exports.uploadNewUserImage = functions.storage.object().onFinalize((object) => {
  return new Promise((resolve, reject) => {
    if(object && object.name && object.metadata) {
      const fileMeta = {
        lastModified: object.updated,
        name: object.metadata.originalName,
        type: 'image/png',
        size: object.size
      };
      const docName = object.name.split('/')[1];
      admin.firestore().collection('files')
        .doc(docName)
        .set(fileMeta)
        .then(value => resolve(value))
        .catch(err => reject(err))
    } else {
      reject('Error happened, not enough metadata or file data');
    }
  });
});

exports.users = functions.https.onRequest((request, response) => {
  admin.firestore().collection('users')
    .get().then(users => {
    const listOfUsers: any = [];
    users.forEach(user => {
      let us = user.data();
      us.id = user.id;
      listOfUsers.push(us);
    });
    response.send(listOfUsers);
  }).catch(err => console.log(err));
});
