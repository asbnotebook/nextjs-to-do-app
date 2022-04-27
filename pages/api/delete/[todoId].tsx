import { MongoClient, ObjectId } from "mongodb"

async function handler(req: any, resp: any){
    
    const {todoId} = req.query

    if(req.method !== 'DELETE') return
    
    const client = await MongoClient.connect("mongo connection string")
    const db = client.db()
    const collection = db.collection("todos")
    const result = await (await collection.deleteOne({_id: new ObjectId(todoId)})).deletedCount;
    client.close()

    console.log("deleted count::::"+result)

    return resp.json({
        todo: result,
        message: "To do deleted"
    })
}

export default handler
