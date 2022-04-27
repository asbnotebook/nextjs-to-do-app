import Link from "next/link"
import { Fragment } from "react"


const Navigation = () => {
    return (
        <Fragment>
            <ul className="flex bg-red-300">
                <li className="mr-6 px-4 my-5 font-bold hover:text-white">
                   <Link href="/">To Do APP</Link>
                </li>
                <li className="mr-6 px-4 my-5 font-bold hover:text-white">
                   <Link href="/add-todo">Add To Do</Link>
                </li>
            </ul>
        </Fragment>
    )
}

export default Navigation