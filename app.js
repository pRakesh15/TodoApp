import { app } from "./index.js";
import { dbConnection } from "./data/databases.js";
const port=process.env.port;
const hostname = "127.0.0.1";

dbConnection()

app.listen(port,()=>
{
    console.log(`server started at http://${hostname}:${port} in ${process.env.NODE_ENV} mod`)
})