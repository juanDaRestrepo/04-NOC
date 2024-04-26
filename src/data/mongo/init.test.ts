
import { MongoDatabase } from "./init"
import mongoose from "mongoose"

describe('init MongoDB', () => {

    afterAll(() => {
        mongoose.connection.close();
    })

    test('Should connect to MongoDB', async() => {

        const connected = await MongoDatabase.connect({
            dbName: process.env.MONGO_DB_NAME!,
            mongoUrl: process.env.MONGO_URL!
        });

        expect(connected).toBe(true)
    });

    test('Should throw an error', async() => {
        try {
            await MongoDatabase.connect({
                dbName: process.env.MONGO_DB_NAME!,
                mongoUrl: "mongodb://juan:1234569@localhost:270172",
            });
            expect(true).toBe(false);
        } catch (error) {
            /* console.log("fuckkk:",error);
            expect(true).toBe(true); */
        }
        

        
    })
})