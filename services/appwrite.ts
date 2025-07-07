import { Client, Databases, ID, Query, Account } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const COLLECTION_ID_2 = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID_2!;
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;

const client = new Client();

client.setEndpoint("https://cloud.appwrite.io/v1").setProject(PROJECT_ID);

const database = new Databases(client);
const account = new Account(client);

export const subscribeToSavedMovies = (
  callback: (movie: SavedMovie[]) => void
) => {
  const channelId = `databases.${DATABASE_ID}.collections.${COLLECTION_ID_2}.documents`;
  const unsubscribe = client.subscribe(channelId, async (response) => {
    const movies = await getSavedMovies();
    if (movies) {
      callback(movies);
    }
  });
  return unsubscribe;
};

export const UpdateSearchCount = async (searchQuery: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", searchQuery),
    ]);
    console.log("Appwrite result:", result);

    if (result.documents.length > 0) {
      const existingDocument = result.documents[0];
      console.log("Found existing document:", existingDocument.$id);

      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingDocument.$id,
        {
          count: existingDocument.count + 1,
        }
      );
    } else {
      console.log("Creating new document for search term:", searchQuery);
      const newDoc = await database.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          searchTerm: searchQuery,
          movie_id: movie.id,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          movieTitle: movie.title,
          count: 1,
        }
      );
      console.log("Created new document:", newDoc.$id);
    }
  } catch (error) {
    console.log("Appwrite error:", error);
    throw error;
  }
};

export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.orderDesc("count"),
      Query.limit(5),
    ]);
    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.log("Appwrite error:", error);
    throw error;
  }
};

export const saveMovie = async (movie: Movie, isSaved: boolean) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID_2, [
      Query.equal("movie_id", movie.id),
    ]);

    if (result.documents.length > 0) {
      const exitingMovie = result.documents[0];
      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID_2,
        exitingMovie.$id,
        {
          is_saved: isSaved,
        }
      );
    } else {
      const newDoc = await database.createDocument(
        DATABASE_ID,
        COLLECTION_ID_2,
        ID.unique(),
        {
          movie_id: movie.id,
          movie_title: movie.title,
          movie_poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          movie_rating: Math.round(movie.vote_average),
          is_saved: true,
        }
      );
    }
  } catch (error) {
    console.log("Appwrite error:", error);
    throw error;
  }
};

export const getSavedMovies = async (): Promise<SavedMovie[] | undefined> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID_2, [
      Query.orderDesc("is_saved"),
      Query.equal("is_saved", true),
    ]);
    return result.documents;
  } catch (error) {
    console.log("Appwrite error:", error);
    throw error;
  }
};
export const getSavedMovie = async (
  movie_id: number
): Promise<SavedMovie[] | undefined> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID_2, [
      Query.equal("movie_id", movie_id),
    ]);

    return result.documents;
  } catch (error) {
    console.log("Appwrite error:", error);
    throw error;
  }
};

export const createUser = async (email: string, password: string, username: string) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, username);
    if (!newAccount) throw new Error("Account creation failed");

    await signIn(email, password);

    // You might want to create a user document in your database here

    return newAccount;
  } catch (error) {
    console.log("Appwrite createUser error:", error);
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log("Appwrite signIn error:", error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    return await account.get();
  } catch (error) {
    // It's expected to fail if there's no session
    return null;
  }
};

export const signOut = async () => {
  try {
    return await account.deleteSession("current");
  } catch (error) {
    console.log("Appwrite signOut error:", error);
    throw error;
  }
};
