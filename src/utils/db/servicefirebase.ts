import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import app from "./firebase";
import type { LocalUserInput } from "@/types/User.type";
import {
  findUserByEmail,
  registerUser,
  syncOAuthUser,
} from "./user.service";

const db = getFirestore(app);

export async function retrieveProducts(collectionName: string) {
  const snapshot = await getDocs(collection(db, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

export async function retrieveDataByID(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(db, collectionName, id));
  const data = snapshot.data();
  return data;
}

export async function signIn (
  email: string,
) {
  return findUserByEmail(email);
}

export async function signUp(
  userData: LocalUserInput,
  callback: Function,
) {
  const result = await registerUser(userData);
  callback(result);
}

export async function signInWithGoogle(userData: any, callback: any) {
  const result = await syncOAuthUser({
    fullname: userData.fullname,
    email: userData.email,
    image: userData.image,
    provider: "google",
  });

  callback(result);
  return result;
}

export async function signInWithGitHub(userData: any, callback: any) {
  const result = await syncOAuthUser({
    fullname: userData.fullname,
    email: userData.email,
    image: userData.image,
    provider: "github",
  });

  callback(result);
  return result;
}

export { syncOAuthUser };
