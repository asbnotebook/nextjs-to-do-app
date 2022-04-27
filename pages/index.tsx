import { MongoClient } from 'mongodb'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import TodoItem from '../components/todoItem/todoItem'

const Home: NextPage = (props: any) => {  

  return (
    <Fragment>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
          rel="stylesheet" />
      </Head>
      
      <div className="container mx-auto px-4 sm:px-8">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-5 border-b-2 border-blue-200 bg-blue-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">To Do</th>
              <th className="px-5 py-5 border-b-2 border-blue-200 bg-blue-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Desc.</th>
              <th className="px-5 py-5 border-b-2 border-blue-200 bg-blue-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Done</th>
              <th className="px-5 py-5 border-b-2 border-blue-200 bg-blue-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody>
            {
              props.todos.map((todo: any) => (
                <tr key={todo.id} className="px-5 py-5 border-b-2 border-black-200">
                <TodoItem
                  id = {todo.id}
                  heading={todo.heading}
                  description={todo.description}
                  done={todo.done} />
               </tr>
              )
              )
            }
          </tbody>
        </table>
      </div>
    </Fragment>
  )
}

export async function getStaticProps(context: any){

  const client = await MongoClient.connect("mongo connection string")
  const todoCollection = client.db().collection("todos")
  const todoArray = await todoCollection.find().toArray()
  client.close()

  return {
    props:{
      todos : todoArray.map(todo => ({
        heading: todo.heading,
        description: todo.description,
        done: todo.done,
        id: todo._id.toString()
      }))
    },
    revalidate: 3600
  }
}

export default Home