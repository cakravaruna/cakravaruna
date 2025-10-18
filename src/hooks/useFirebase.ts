import { useState, useEffect } from 'react';
import { 
  collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, orderBy 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { NewsItem, ProgramItem, GalleryItem, Comment } from '@/lib/types';

export const useFirebase = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [programs, setPrograms] = useState<ProgramItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data sekali
  const fetchData = async () => {
    setLoading(true);

    // News
    const newsSnapshot = await getDocs(query(collection(db, 'news'), orderBy('createdAt', 'desc')));
    const newsData = newsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    })) as NewsItem[];
    setNews(newsData);

    // Programs
    const programsSnapshot = await getDocs(collection(db, 'programs'));
    const programsData = programsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      programs: doc.data().programs || [],
      updatedAt: doc.data().updatedAt?.toDate(),
    })) as ProgramItem[];
    setPrograms(programsData);

    // Gallery
    const gallerySnapshot = await getDocs(query(collection(db, 'gallery'), orderBy('createdAt', 'desc')));
    const galleryData = gallerySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
    })) as GalleryItem[];
    setGallery(galleryData);

    // Comments
    const commentsSnapshot = await getDocs(query(collection(db, 'comments'), orderBy('createdAt', 'desc')));
    const commentsData = commentsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
    })) as Comment[];
    setComments(commentsData);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const uploadImage = async (file: File, path: string): Promise<string> => {
    const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  };

  const deleteImage = async (imageUrl: string) => {
    try {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  // News operations
  const addNews = async (newsData: Omit<NewsItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date();
    await addDoc(collection(db, 'news'), { ...newsData, createdAt: now, updatedAt: now });
    await fetchData();
  };

  const updateNews = async (id: string, newsData: Partial<NewsItem>) => {
    await updateDoc(doc(db, 'news', id), { ...newsData, updatedAt: new Date() });
    await fetchData();
  };

  const deleteNews = async (id: string, imageUrl?: string) => {
    if (imageUrl) await deleteImage(imageUrl);
    await deleteDoc(doc(db, 'news', id));
    await fetchData();
  };

  // Program operations
  const addProgramSie = async (programData: Omit<ProgramItem, 'id' | 'updatedAt'>) => {
    const now = new Date();
    await addDoc(collection(db, 'programs'), { ...programData, updatedAt: now });
    await fetchData();
  };

  const updateProgram = async (id: string, programData: Partial<ProgramItem>) => {
    await updateDoc(doc(db, 'programs', id), { ...programData, updatedAt: new Date() });
    await fetchData();
  };

  const deleteProgramSie = async (id: string) => {
    await deleteDoc(doc(db, 'programs', id));
    await fetchData();
  };

  // Gallery operations
  const addGalleryItem = async (galleryData: Omit<GalleryItem, 'id' | 'createdAt'>) => {
    await addDoc(collection(db, 'gallery'), { ...galleryData, createdAt: new Date() });
    await fetchData();
  };

  const deleteGalleryItem = async (id: string, imageUrl: string) => {
    await deleteImage(imageUrl);
    await deleteDoc(doc(db, 'gallery', id));
    await fetchData();
  };

  // Comment operations
  const addComment = async (commentData: Omit<Comment, 'id' | 'createdAt' | 'approved'>) => {
    await addDoc(collection(db, 'comments'), { ...commentData, createdAt: new Date(), approved: false });
    await fetchData();
  };

  const updateComment = async (id: string, approved: boolean) => {
    await updateDoc(doc(db, 'comments', id), { approved });
    await fetchData();
  };

  const deleteComment = async (id: string) => {
    await deleteDoc(doc(db, 'comments', id));
    await fetchData();
  };

  return {
    news,
    programs,
    gallery,
    comments,
    loading,
    uploadImage,
    addNews,
    updateNews,
    deleteNews,
    addProgramSie,
    updateProgram,
    deleteProgramSie,
    addGalleryItem,
    deleteGalleryItem,
    addComment,
    updateComment,
    deleteComment,
  };
};
