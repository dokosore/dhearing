// version.ts
import { firestore } from './firebase'; // firebase 初期化ファイルをインポート

const db = firestore();
const versionsCollection = db.collection('versions');

interface Version {
  createdAt: FirebaseFirestore.Timestamp;
}

// Create
export const createVersion = async (version: Version) => {
  const versionRef = await versionsCollection.add(version);
  return versionRef.id;
};

// Read
export const getVersion = async (id: string) => {
  const versionDoc = await versionsCollection.doc(id).get();
  return versionDoc.exists ? versionDoc.data() : null;
};

// Update
export const updateVersion = async (id: string, version: Partial<Version>) => {
  await versionsCollection.doc(id).update(version);
};

// Delete
export const deleteVersion = async (id: string) => {
  await versionsCollection.doc(id).delete();
};
