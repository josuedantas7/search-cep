
// imports react
import { ReactNode, createContext, useState } from "react";

// types
import { AddressContextProps } from "../@types/AddressContextProps";
import { UserProps } from "../@types/UserProps";
import Notification from "../components/Notifier/Notification";

// create context
export const AddressContext = createContext<AddressContextProps>({ handleAddAddress: () => {}, allAddress: []});

// export provider
export const AddressProvider = ({ children } : { children : ReactNode }) => {

    const [allAddress, setAddress] = useState<UserProps[]>([])


    function handleAddAddress(newAddress: UserProps){

        const addressExists = allAddress.find(address => address.cep === newAddress.cep)


        if (addressExists){
            setAddress(prevAddress => prevAddress.map(address => {
                if (address.cep === newAddress.cep && address.isNew === true){
                    Notification('warning', 'Endereço já cadastrado, atualizando ele para endereço já existente')
                    return {
                        ...address,
                        isNew: false
                    }
                } else if (address.cep === newAddress.cep && address.isNew === false){
                    Notification('warning', 'Endereço já cadastrado')
                    return address
                } else {
                    return address
                }
            }))
        }else {
            Notification('success', 'Endereço cadastrado com sucesso')
            setAddress(prevAddress => [...prevAddress, newAddress])
        }
    }

    return (
        <AddressContext.Provider value={{handleAddAddress, allAddress}}>
            {children}
        </AddressContext.Provider>
    )
}