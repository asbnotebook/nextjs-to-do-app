import { MongoClient } from "mongodb"

async function handler(req: any, resp: any){

    if(req.method !== 'POST') return

    const {heading, description} = req.body
    const done = "false"

    if(!heading || !description) return
    
    const client = await MongoClient.connect("mongo connection string")
    const db = client.db()
    const collection = db.collection("todos")
    const result = await collection.insertOne({heading, description, done})
    client.close()

    resp.status(201).json({
        todo: result,
        message: "To do created"
    })
}

export default handler