import { useRouter } from "next/router"
import { Fragment } from "react"
import TodoForm from "../../components/todoForm/TodoForm"

const AddTodo = () => {

    const router = useRouter()
    const addTodoHandler = async (data: any) => {
        console.log("sending data::"+data)
        const response = await fetch("/api/new-todo", {
            method: "POST", 
            body: JSON.stringify(data),
            headers: {
                "content-Type" : "application/json"
            }
        }) 

        const res = await response.json()
        router.push("/")
    }

    return (
        <Fragment>
            <TodoForm addTodoHandler={addTodoHandler} />
        </Fragment>
    )

}

export default AddTodo