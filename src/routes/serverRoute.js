const environment = process.env.NEXT_PUBLIC_ENV;
const LOCAL = "http://localhost:3000/"
const PROD =  "https://vimo-app.vercel.app"
const serverRoute = environment === 'dev' ? LOCAL : PROD;
export default serverRoute
