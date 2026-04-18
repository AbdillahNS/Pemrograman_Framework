import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import bcrypt from "bcrypt";
import app from "./firebase";
import {
  LocalUserInput,
  OAuthUserInput,
  UserRecord,
  UserRole,
} from "@/types/User.type";

const db = getFirestore(app);
const usersCollection = collection(db, "users");

const mapDocumentToUser = (snapshotDoc: any): UserRecord => ({
  id: snapshotDoc.id,
  ...snapshotDoc.data(),
});

const normalizeRole = (role?: string): UserRole => {
  if (role === "admin" || role === "editor") {
    return role;
  }

  return "user";
};

const findUsersByEmail = async (email: string) => {
  const q = query(usersCollection, where("email", "==", email));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(mapDocumentToUser);
};

export const findUserByEmail = async (email: string) => {
  const users = await findUsersByEmail(email);

  return users[0] ?? null;
};

export const registerUser = async (userData: LocalUserInput) => {
  const existingUser = await findUserByEmail(userData.email);

  if (existingUser) {
    return {
      status: "error",
      message: "User already exists",
    };
  }

  const payload: UserRecord = {
    email: userData.email,
    fullname: userData.fullname,
    password: await bcrypt.hash(userData.password, 10),
    role: normalizeRole(userData.role),
  };

  await addDoc(usersCollection, payload);

  return {
    status: "success",
    message: "User registered successfully",
  };
};

export const syncOAuthUser = async (userData: OAuthUserInput) => {
  if (!userData.email) {
    return {
      status: false,
      message: "OAuth email is required",
    };
  }

  const existingUser = await findUserByEmail(userData.email);
  const basePayload = {
    email: userData.email,
    fullname: userData.fullname,
    image: userData.image || "",
    provider: userData.provider,
    type: userData.provider,
  };

  if (existingUser) {
    const storedPayload = {
      ...basePayload,
      role: normalizeRole(existingUser.role),
    };

    await updateDoc(doc(db, "users", existingUser.id as string), storedPayload);

    return {
      status: true,
      message: "User logged in with OAuth",
      data: {
        ...existingUser,
        ...storedPayload,
      },
    };
  }

  const newUser: UserRecord = {
    ...basePayload,
    role: "user",
  };

  await addDoc(usersCollection, newUser);

  return {
    status: true,
    message: "User registered and logged in with OAuth",
    data: newUser,
  };
};