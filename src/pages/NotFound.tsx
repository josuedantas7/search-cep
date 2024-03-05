import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='w-full h-screen flex flex-col mt-32 items-center'>
        <h1 className='text-center text-3xl font-bold'>Oooopss... Página não encontrada</h1>
        <Link to='/' className='text-center block mt-4 bg-zinc-300 px-6 py-1 font-semibold rounded'>Voltar para a Home</Link>
    </div>
  )
}

export default NotFound
