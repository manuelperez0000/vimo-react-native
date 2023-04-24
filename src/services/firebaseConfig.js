import {initializeApp} from "firebase/app"

const firebaseConfig = {
    authDomain: process.env.NEXT_PUBLIC_authDomain,
    databaseURL: process.env.NEXT_PUBLIC_databaseURL,
    projectId: process.env.NEXT_PUBLIC_projectId,
    storageBucket: process.env.NEXT_PUBLIC_storageBucket,
    messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
    apiKey: process.env.NEXT_PUBLIC_apiKey,
    appId: process.env.NEXT_PUBLIC_appId
}

const app = initializeApp(firebaseConfig)

export default app



