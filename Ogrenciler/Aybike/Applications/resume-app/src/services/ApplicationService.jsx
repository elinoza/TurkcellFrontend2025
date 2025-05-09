import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/Firebase";
import { TestService } from "./TestService";

export class ApplicationService {
  static async getApplications() {
    const querySnapshot = await getDocs(collection(db, "applications"));
    const applicationsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return applicationsData;
  }

  static async addApplication(values) {
    try {
      if (!values) throw new Error("Geçersiz başvuru verisi kankaaa");
      const docRef = await addDoc(collection(db, "applications"), {
        ...values,
        rate: 0,
      });
      return { success: true, message: "Başvuru başarıyla eklendi broo :))" };
    } catch (error) {
      console.error("Başvuru eklerken boom-->", error);
      return { success: false, message: error };
    }
  }
  static async updateApplicationRate(applicationId, newRate, userInfo, questionSettings) {
    try {
      if (newRate >= 4) TestService.addNewUser(userInfo, questionSettings)
      const docRef = doc(db, "applications", applicationId);
      await updateDoc(docRef, { rate: newRate })

      return { success: true, message: "Puan başarıyla güncellendi" }
    } catch (error) {
      console.error("Puan güncellenirken hata oluştu:", error)
      return { success: false, message: error }
    }
  }
  static async getApplicationById(applicationId) {
    try {
      const docRef = doc(db, "applications", applicationId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        return { success: true, data: { id: docSnap.id, ...docSnap.data() } }
      } else {
        return { success: false, message: "Başvuru bulunamadı!" }
      }
    } catch (error) {
      console.error("Başvuru detayları alınırken hata oluştu:", error)
      return { success: false, message: error }
    }
  }

}
