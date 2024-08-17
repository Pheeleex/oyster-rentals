// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { deleteObject, getDownloadURL, getStorage, listAll, ref, uploadBytes, } from "firebase/storage"
import { Firestore, addDoc, collection, deleteDoc, doc, getFirestore, 
  updateDoc,query, getDocs, orderBy, where, startAfter, limit as firestoreLimit } from "firebase/firestore"
import { CarSpecProps, FilterProps } from "@/types";
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


const fetchCars = async (filters: FilterProps, lastVisible: any = null): 
Promise<{ cars: CarSpecProps[], lastVisible: any }> => {
    try {
      const { manufacturer, model, limit:fetchLimit } = filters;
  
      const carCollectionRef = collection(db, "Cars");
  
      let carsQuery = query(carCollectionRef, orderBy("id"));
  
      // Apply the manufacturer filter if it's provided
      if (manufacturer) {
        carsQuery = query(carsQuery, where("Make", "==", manufacturer.toLowerCase()));
        console.log('manufacturer query', carsQuery)
      }
  
      // Apply the model filter if it's provided
      if (model) {
        carsQuery = query(carsQuery, where("Model", "==", model));
      }
  
      // Start after the last visible document for pagination
      if (lastVisible) {
        carsQuery = query(carsQuery, startAfter(lastVisible));
      }
  
      // Apply the limit to the number of documents retrieved
     if(fetchLimit){
      carsQuery = query(carsQuery, firestoreLimit(fetchLimit));
     }
  
      const querySnapshot = await getDocs(carsQuery);
     console.log(carsQuery, 'query')
     console.log(`Number of cars found: ${querySnapshot.docs.length}`);
      // Capture the last visible document for the next page
      const newLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
  
      const carData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as CarSpecProps[];
  
      const carWithImages = await Promise.all(
        carData.map(async (car) => {
          let images: string[] = [];
          const imagePath = car.ImagePath || car.id;
  
          const imageListRef = ref(storage, `${imagePath}/`);
          try {
            const imageList = await listAll(imageListRef);
            images = await Promise.all(
              imageList.items.map(async (item) => {
                const url = await getDownloadURL(item);
                return url;
              })
            );
          } catch (error) {
            console.error(`Error fetching images for car ${car.id}:`, error);
          }
  
          return { ...car, images };
        })
      );
  
      return { cars: carWithImages, lastVisible: newLastVisible };
    } catch (error) {
      console.error("Error fetching cars:", error);
      return { cars: [], lastVisible: null };
    }
  };
  
  export default fetchCars;
export const addCars = () => {

}