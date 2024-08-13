import { firestore } from "@/firebase/init";
import { Version } from "@/types/models/version";
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  doc,
  setDoc,
} from "firebase/firestore";

// createもこれを使う
export const updateVersion = async (updatedVersion: Version): Promise<void> => {
  const _docRef = doc(firestore, "version", updatedVersion.id).withConverter(
    versionConverter
  );
  await setDoc(_docRef, updatedVersion);
};

export const versionConverter: FirestoreDataConverter<Version> = {
  toFirestore: (student: Version): DocumentData => {
    const newDoc: Partial<Version> = { ...student };
    delete newDoc.id;
    return newDoc;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot): Version => {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      createdAt: data.createdAt ?? 0,
      updatedAt: data.updatedAt ?? 0,
    };
  },
};
