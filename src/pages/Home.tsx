import { useContext } from "react";
import { FormRegisterUser } from "../components/Form/FormRegisterUser";
import { TableListAllAddress } from "../components/Table/TableListAllAddress";
import { AddressContext } from "../context/AddressContex";

export default function App() {

  const { allAddress } = useContext(AddressContext)

  return (
    <div className={`pt-32 max-[650px]:pt-6 w-full bg-zinc-200 ${allAddress && allAddress.length > 0 ? 'h-full' : 'h-screen'}`}>
      <div className="w-[80%] max-[500px]:w-[90%] mx-auto">
        <FormRegisterUser/>
      </div>
      <div className="w-[80%] mt-8 max-[500px]:w-[90%] mx-auto">
        <TableListAllAddress/>
      </div>
    </div>
  )
}
