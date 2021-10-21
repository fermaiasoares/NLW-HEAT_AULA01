import { httpServer } from "./app";

httpServer.listen(process.env.PORT || 3333, () => {
    console.log(`🚀 Server is running on PORT ${process.env.PORT || 3333}`)
});
