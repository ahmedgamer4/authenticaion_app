import admin from 'firebase-admin';
import url from 'url';
import path from 'path';
import fs from 'fs';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const jsonConfig = path.join(__dirname, '..', '..', 'firebaseAuth.json');
const rawData = fs.readFileSync(jsonConfig);
const firebaseJson = JSON.parse(rawData.toString());
console.log(firebaseJson);
admin.initializeApp({
    credential: admin.credential.cert(firebaseJson),
    databaseURL: "https://authenticationapp-379512-default-rtdb.firebaseio.com"
});
//# sourceMappingURL=firebase.js.map