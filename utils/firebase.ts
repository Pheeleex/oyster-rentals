// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { deleteObject, getDownloadURL, getStorage, listAll, ref, uploadBytes } from "firebase/storage"
import { Firestore, addDoc, collection, deleteDoc, doc, getFirestore, updateDoc,query, getDocs, orderBy } from "firebase/firestore"
import { CarSpecProps } from "@/types";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBB7FmmCP8K1d-q6ENm6jrRginM8OOYqjI",
  authDomain: "wallet-app-6c807.firebaseapp.com",
  projectId: "wallet-app-6c807",
  storageBucket: "wallet-app-6c807.appspot.com",
  messagingSenderId: "829543640892",
  appId: "1:829543640892:web:6f23e8db6393f313ec3839",
  measurementId: "G-4CCHTYMKFX"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
export const auth = getAuth()
export const storage = getStorage(app)
export const db = getFirestore(app)


const fetchProperties = async (): Promise <CarSpecProps[]> => {
    try {
      const carCollectionRef = collection(db, 'Cars');
      const orderedQuery = query(carCollectionRef, orderBy('id'));
      const querySnapshot = await getDocs(orderedQuery);
      const carData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as CarSpecProps[];
  
      const propertiesWithImages = await Promise.all(carData.map(async (car) => {
        let images: string[] = [];
        const imagePath = car.ImagePath || car.id;  // Check for imagePath, default to property.id if not available
        const imageListRef = ref(storage, `${imagePath}/`);
        
  
        try {
          const imageList = await listAll(imageListRef);
          images = await Promise.all(imageList.items.map(async (item) => {
            const url = await getDownloadURL(item);
            return url;
          }));
        } catch (error) {
          console.error(`Error fetching images for property ${car.id}:`, error);
        }
  
        return { ...car, images };
      }));
  
      
     
      return propertiesWithImages;
    } catch (error) {
      console.error('Error fetching properties:', error);
      return [];
    }
  };
  
  export default fetchProperties;