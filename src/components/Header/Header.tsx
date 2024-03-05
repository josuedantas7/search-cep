import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { AddressContext } from "../../context/AddressContex"

export function Header() {

    const { totalAddress } = useContext(AddressContext)

    const [routeSelected, setRouteSelected] = useState<string>('home')

  return (
    <div className="w-[80%] px-8 mt-8 max-[500px]:w-[90%] mx-auto flex py-3 bg-white rounded-xl">
        <Link onClick={() => setRouteSelected('home')} to="/" className={`text-black px-4 w-[100px] text-center border-black transition-all py-3 ${routeSelected === 'home' && 'font-bold border-b-2'}`}>Home</Link>
        <Link onClick={() => setRouteSelected('address')} to="/lista-de-enderecos" className={`relative w-[100px] text-center py-3 px-4 border-black ${routeSelected === 'address' && 'border-b-2'}`}>
            <p className={`text-black border-black ${routeSelected === 'address' && 'font-bold'}`}>Endereços</p>
            {totalAddress !== 0 && (
                <p className="absolute -top-2 -right-2 bg-zinc-100 px-2 rounded-full">{totalAddress}</p>
            )}
        </Link>
    </div>
  )
}

