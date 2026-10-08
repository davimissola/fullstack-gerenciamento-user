import { useRef } from 'react'



type UserCreate = {
    nome: string
    email: string
    idade: number
}
type PropsFormUser = {
    alterarVisibilidade: () => void
}


export function FormUser({ alterarVisibilidade }: PropsFormUser) {
    const p_resultado = useRef<HTMLParagraphElement>(null)


    async function addUser(formData) {
        const user: UserCreate = {
            nome: String(formData.get('nome')),
            email: String(formData.get('email')),
            idade: Number(formData.get('idade'))
        }

        const response = await fetch('http://localhost:3000/users/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        if (!response.ok) {
            p_resultado.current.innerHTML = 'Não foi possível criar usuário.'
            return
        }

        alterarVisibilidade()
    }


    return (
        <section>
            <form action={addUser}>
                <div className="campo-form">
                    <label htmlFor="nome">Nome :</label>
                    <input type="text" id='nome' name='nome' required />
                </div>

                <div className="campo-form">
                    <label htmlFor="Email">Email :</label>
                    <input type="email" id='email' name='email' required />
                </div>

                <div className="campo-form">
                    <label htmlFor="idade">Idade :</label>
                    <input type="number" id='idade' name='idade' required />
                </div>

                <button>Enviar</button>
            </form>

            <p ref={p_resultado}></p>
        </section>
    )
}
