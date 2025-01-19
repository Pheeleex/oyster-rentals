// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { deleteObject, getDownloadURL, getStorage, listAll, ref, uploadBytes, } from "firebase/storage"
import { Firestore, addDoc, collection, deleteDoc, doc, getFirestore, 
  updateDoc,query, getDocs, orderBy, where, startAfter, limit as firestoreLimit, 
  setDoc,
  getDoc} from "firebase/firestore"
import { CarSpecProps, FilterProps, SetCars } from "@/types";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET,
  messagingSenderId: "829543640892",
  appId: process.env.NEXT_PUBLIC_FB_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FB_MESSENGER_ID
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
export const auth = getAuth()
export const storage = getStorage(app)
export const db = getFirestore(app)
export const provider = new GoogleAuthProvider()


const fetchCars = async (filters: FilterProps, lastVisible: any = null): 
Promise<{ cars: CarSpecProps[], lastVisible: any }> => {
    try {
      const { manufacturer, model, limit:fetchLimit } = filters;
  
      const carCollectionRef = collection(db, "Cars");
  
      let carsQuery = query(carCollectionRef, orderBy("id"));
  
      // Apply the manufacturer filter if it's provided
      if (manufacturer) {
        carsQuery = query(carsQuery, where("Make", "==", manufacturer.toLowerCase()));
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


export const addCars = async(car: CarSpecProps, imageFiles: File [], ImagePath: string): Promise<void> => {
  try {
    const carRef = collection(db, 'Cars')
    const { imageFiles: removedImageFiles, ...carData } = car;

    const docRef = await addDoc(carRef, carData)
if(imageFiles && imageFiles.length > 0){
  for(let i=0; i < imageFiles.length; i++ ){
    const file = imageFiles[i];
    const storageRef = ref(storage, `${ImagePath}/${ImagePath}${i + 1}`);
    await uploadBytes(storageRef, file);
  }
}
  } catch (error) {
    console.log(error)
  }
}


export const updateCars = async(carId: string, updatedData: Partial<CarSpecProps>): Promise<void> => {
try {
    const CarRef = doc(db, 'Cars', carId);
    await updateDoc(CarRef, updatedData);
} catch (error) {
  console.error('Error updating car: ', error);
    throw error;
}
}

export const deleteCars = async(id: string, ImagePath:string, setCars:SetCars): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'Cars', id))

    //Delete associated property image from Firebase storage
    const imageListRef = ref(storage, `${ImagePath}/`);
    const imageList = await listAll(imageListRef);
    const deletePromises = imageList.items.map((item) => deleteObject(ref(storage, item.fullPath)));

    await Promise.all(deletePromises);

    setCars((prevCars) => prevCars.filter((car) => car.id !== id ));
  } catch (error) {
    console.error(`Error deleting car with id ${id}:`, error)
  }
}


export const SaveBooking = async(carId: string, confirmDates: object) => {
  try {
    await setDoc(doc(db, 'bookings', carId), confirmDates)
  } catch (error) {
    console.error('Error saving booking details:', error);
      alert('Failed to save booking details. Please try again.');
  }
}

