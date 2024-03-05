import { useContext } from "react"
import { AddressContext } from "../../context/AddressContex"

export function TableListAllAddress(){


    const { allAddress } = useContext(AddressContext)
    
    return (
        <div className="pb-32">
            {allAddress && allAddress.length > 0 && (
                <div className="bg-white rounded-2xl shadow-2xl p-12 max-[750px]:p-4">
                    <h1 className="text-2xl font-bold text-black text-center mb-5">Lista de endereços</h1>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">CEP</th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Novo endereço</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {allAddress && allAddress.map((address, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="px-6 py-4">{address.nome}</td>
                                        <td className="px-6 py-4">{address.cep}</td>
                                        <td className="px-6 py-4">{address.isNew ? 'Sim' : 'Não'}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
