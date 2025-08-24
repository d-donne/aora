import { Client, Account, ID, Databases, Avatars, Query, Role } from "react-native-appwrite";

const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  projectId: "6772ec80003b028af208",
  platform: "com.d-donne.aora",
  databaseId: "6772ef2e000396025cab",
  userCollectionId: "6772efb600211a554635",
  videoCollectionId: "6772f348000fee19e23e",
};

const client = new Client().setEndpoint(config.endpoint).setProject(config.projectId).setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email: string, password: string, username: string) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, username);

    if (!newAccount) throw new Error();

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(config.databaseId, config.userCollectionId, ID.unique(), {
      accountId: newAccount.$id,
      email,
      username,
      avatar: avatarUrl,
    });

    return newUser;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw new Error();

    const currentUser = await databases.listDocuments(config.databaseId, config.userCollectionId, [Query.equal("accountId", currentAccount.$id)]);
    if (!currentUser) throw new Error();

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(config.databaseId, config.videoCollectionId);
    return posts.documents;
  } catch (error) {
    throw new Error(error as string);
  }
};
