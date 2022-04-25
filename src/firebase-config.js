import { initializeApp } from "firebase/app";

import { getFirestore} from "@firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyAAz43pmS6Cmyihf0ohQq-14xbUJZydeAI",
    authDomain: "todo-app-8ba8e.firebaseapp.com",
    projectId: "todo-app-8ba8e",
    storageBucket: "todo-app-8ba8e.appspot.com",
    messagingSenderId: "692896987393",
    appId: "1:692896987393:web:a6c265d71a25baa3a94300",
    measurementId: "G-6MDYYRXGWD"
  };


  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app);