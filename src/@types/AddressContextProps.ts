import { UserProps } from "./UserProps";

export interface AddressContextProps {
    handleAddAddress: (newAddress: UserProps) => void
    allAddress?: UserProps[],
    totalAddress?: number
}