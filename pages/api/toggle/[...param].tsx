import { MongoClient, ObjectId } from "mongodb"

async function handler(req: any, resp: any){

    if(req.method !== 'GET') return
    
    var query = { _id: new ObjectId(req.query.param[0].toString())};
    const options = {upsert: true }
    const updateTodo = {
         $set: { done: req.query.param[1] } 
      };

    const client = await MongoClient.connect("mongo db connection string")
    const db = client.db()
    const collection = db.collection("todos")
    const result = await collection.updateOne(query, updateTodo, options);
    client.close()

    console.log("updated record::::"+result)

    return resp.json({
        todo: result,
        message: "To do updated!"
    })
}

export default handler
