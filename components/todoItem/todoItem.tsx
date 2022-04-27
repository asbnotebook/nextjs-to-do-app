import { Fragment } from "react"
import { useRouter } from 'next/router'


function TodoItem(props: any) {

    const { id, heading, description, done } = props
    const router = useRouter()

    
    //delete todo:
    const deleteTodo = async (todoId: any) =>{
        
        const resp = await fetch(`/api/delete/${todoId}`, {
          method: 'DELETE'
        })
        .then(res => console.log("SUCCESS:: "+ res.json()))
        .catch(e => console.log("ERROR:" + e))
        
        router.push("/")
    }

    //togle todo:
    const togleDone = async (todoId: any, done: any) =>{
        
        const resp = await fetch(`/api/toggle/${todoId}/${done}`, {
          method: 'GET'
        })
        .then(res => console.log("SUCCESS:: "+ res.json()))
        .catch(e => console.log("ERROR:" + e))
        router.push("/")
    }
    

    return (
        <Fragment>
            <td className="py-5 font-bold text-blue-600">{heading}</td>
            <td className="py-5">{description}</td>
            <td className="py-5">
            {
            (done === "true") ? 
            (<img width="25" src="../../check.png" onClick={() => togleDone(id, "false")} />) 
            :
            (<img width="25" src="../../uncheck.jpeg" onClick={() => togleDone(id, "true")} />)}
            
            </td>
            <td className="px-4 py-2 my-1 font-semibold text-red-700 bg-transparent border border-red-500 rounded hover:bg-red-500 hover:text-white hover:border-transparent">
                <button className="id" 
                onClick={() => deleteTodo(id)} >Delete</button>
            </td>
        </Fragment>
    )
}

export default TodoItem