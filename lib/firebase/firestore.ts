import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  Timestamp,
  increment,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';
import { db } from './config';

// Post operations
export const createPost = async (postData: {
  title: string;
  body: string;
  authorId: string;
  episodeSlug?: string;
  isPinned?: boolean;
}) => {
  try {
    const docRef = await addDoc(collection(db, 'posts'), {
      ...postData,
      score: 0,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      commentCount: 0
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const updatePost = async (postId: string, updates: any) => {
  try {
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, {
      ...updates,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    throw error;
  }
};

export const deletePost = async (postId: string) => {
  try {
    await deleteDoc(doc(db, 'posts', postId));
  } catch (error) {
    throw error;
  }
};

export const getPost = async (postId: string) => {
  try {
    const docSnap = await getDoc(doc(db, 'posts', postId));
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const getPosts = async (episodeSlug?: string, limitCount = 10) => {
  try {
    let q = query(
      collection(db, 'posts'),
      orderBy('score', 'desc'),
      limit(limitCount)
    );

    if (episodeSlug) {
      q = query(
        collection(db, 'posts'),
        where('episodeSlug', '==', episodeSlug),
        orderBy('score', 'desc'),
        limit(limitCount)
      );
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    throw error;
  }
};

// Comment operations
export const createComment = async (commentData: {
  body: string;
  authorId: string;
  postId: string;
  parentId?: string;
}) => {
  try {
    const docRef = await addDoc(collection(db, 'comments'), {
      ...commentData,
      score: 0,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });

    // Increment comment count on the post
    const postRef = doc(db, 'posts', commentData.postId);
    await updateDoc(postRef, {
      commentCount: increment(1)
    });

    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getComments = async (postId: string) => {
  try {
    const q = query(
      collection(db, 'comments'),
      where('postId', '==', postId),
      orderBy('score', 'desc')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    throw error;
  }
};

// Vote operations
export const voteOnPost = async (postId: string, userId: string, voteType: 'up' | 'down') => {
  try {
    const voteRef = doc(db, 'votes', `${userId}_${postId}`);
    const postRef = doc(db, 'posts', postId);

    // Check if user has already voted
    const existingVote = await getDoc(voteRef);
    
    if (existingVote.exists()) {
      const currentVote = existingVote.data().type;
      
      if (currentVote === voteType) {
        // Remove vote
        await deleteDoc(voteRef);
        await updateDoc(postRef, {
          score: increment(voteType === 'up' ? -1 : 1)
        });
      } else {
        // Change vote
        await updateDoc(voteRef, { type: voteType });
        await updateDoc(postRef, {
          score: increment(voteType === 'up' ? 2 : -2)
        });
      }
    } else {
      // New vote
      await addDoc(collection(db, 'votes'), {
        userId,
        postId,
        type: voteType,
        createdAt: Timestamp.now()
      });
      await updateDoc(postRef, {
        score: increment(voteType === 'up' ? 1 : -1)
      });
    }
  } catch (error) {
    throw error;
  }
};

// User operations
export const createUserProfile = async (userId: string, userData: {
  email: string;
  username: string;
  avatar?: string;
  bio?: string;
}) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      ...userData,
      createdAt: Timestamp.now(),
      karma: 0,
      postCount: 0,
      commentCount: 0
    });
  } catch (error) {
    throw error;
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const docSnap = await getDoc(doc(db, 'users', userId));
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    throw error;
  }
};