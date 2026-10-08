import { useEffect, useState } from "react"
import { FormUser } from "../FormUser"


type UserPublic = {
    id: number,
    nome: string
    email: string
    idade: number
}
type UserDelete = {
    id: number
}
type ResponseUsers = UserPublic[]


export function ShowUser() {
    const [users, setUsers] = useState<UserPublic[]>([])
    const [chamarAdicionarUser, setChamarAdicionarUser] = useState<boolean>(false)
    const [chamarMostrarUser, setChamarMostrarUser] = useState<boolean>(true)
    const [atualizarUsers, setAtualizarUsers] = useState<number>(0)


    useEffect(() => {
        async function getUsers() {
            const response = await fetch('http://localhost:3000/users/')
            const users: ResponseUsers = await response.json()
            setUsers(users)
        }
        getUsers()
    }, [atualizarUsers])

    function AlterarVisibilidade() {
        setChamarAdicionarUser(!chamarAdicionarUser)
        setChamarMostrarUser(!chamarMostrarUser)
        setAtualizarUsers(atualizarUsers+1)
    }

    async function deleteUser(id) {
        const userDelete: UserDelete = {
            id: id
        }

        const response = await fetch('http://localhost:3000/users/', {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(userDelete)
        })

        if (!response.ok) {
            return
        }
        setAtualizarUsers(atualizarUsers+1)
    }

    return (
        <section>
            { chamarMostrarUser ? (
                <>
                    { users.map(user => {
                        return (
                            <p>{user.id} | {user.nome} | {user.email} | {user.idade} | <button onClick={() => deleteUser(user.id)}>Remover</button></p>
                        )
                    })}

                    <button onClick={() => AlterarVisibilidade()}>Adicionar User</button>
                </>
            ): null}


            { chamarAdicionarUser ? (
                <FormUser alterarVisibilidade={AlterarVisibilidade}/>
            ): null}
        </section>
    )
}