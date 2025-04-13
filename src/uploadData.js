import { useEffect } from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import kidsData from "../firebase-uploader/kids.json";
import menData from "../firebase-uploader/men.json";

const UploadData = () => {
  useEffect(() => {
    const uploadProducts = async () => {
      try {
        const uploadSection = async (dataArray, sectionName) => {
          for (const item of dataArray) {
            await addDoc(collection(db, sectionName), {
              ...item,
              category: sectionName,
            });
          }
          console.log(`✅ ${sectionName} products uploaded`);
        };

        await uploadSection(kidsData.collection.kids, "kids");
        await uploadSection(menData.collection.men, "men");
      } catch (error) {
        console.error("❌ Error uploading data:", error);
      }
    };

    uploadProducts();
  }, []);

  return <div>Uploading data to Firestore... Check your console 🔥</div>;
};

export default UploadData;
