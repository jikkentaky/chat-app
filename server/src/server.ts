import mongoose from "mongoose";
import app from './app'
import config from './config'
import { setupSocket } from "./socket";

const main = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("Database is connected");
    const server = app.listen(config.port, () => {
      console.log(`application listening on port ${config.port}`)
    })

    setupSocket(server)
  } catch (error) {
    console.log(error)
  }
}

main()
