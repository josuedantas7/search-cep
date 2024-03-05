import { useState, useEffect, useContext } from "react"
import { InputText } from "../Input/InputText"
import { InputNumber } from "../Input/InputNumber"
import { UserProps } from "../../@types/UserProps"
import axios from "axios"
import { AddressContext } from "../../context/AddressContex"
import Notification from "../Notifier/Notification"

export function FormRegisterUser(){
    
    // context
    const { handleAddAddress } = useContext(AddressContext)

    // usuário
    const [nome, setNome] = useState<string>('')
    const [apelido, setApelido] = useState<string>('')

    // endereço
    const [cep, setCep] = useState<number>(0)
    const [uf, setUf] = useState<string>('')
    const [cidade, setCidade] = useState<string>('')
    const [logradouro, setLogradouro] = useState<string>('')
    const [bairro, setBairro] = useState<string>('')
    const [num, setNum] = useState<number>(0)
    const [complemento, setComplemento] = useState<string>('')
    const [isNew, setIsNew] = useState<boolean>(false)

    // carregamento
    const [loading, setLoading] = useState<boolean>(false)

    // validar os campos necessários
    const [alertUf, setAlertUf] = useState<boolean>(false)
    const [alertCep, setAlertCep] = useState<boolean>(false)

    // campos obrigatórios
    const [fieldsRequiredError, setFieldsRequiredError] = useState<boolean>(false)

    function ErrorsAlert(){
        // setLoading(false)
        const timemoutuf = setTimeout(() => setAlertUf(false), 3000)
        const timemoutcep = setTimeout(() => setAlertCep(false), 3000)
        const timemoutfields = setTimeout(() => setFieldsRequiredError(false), 4000)


        return () => {
            clearTimeout(timemoutuf)
            clearTimeout(timemoutcep)
            clearTimeout(timemoutfields)
        }
    }

    useEffect(() => {
        ErrorsAlert()
    },[alertUf, alertCep, fieldsRequiredError])


    function clearFields(){
        setNome('')
        setApelido('')
        setCep(0)
        setUf('')
        setCidade('')
        setLogradouro('')
        setBairro('')
        setNum(0)
        setComplemento('')
    }

    function verifyUf(){
        if (uf.length !== 2){
            setAlertUf(true)
            return false
        } else {
            return true
        }
    }

    function verifyCep(){

        if (cep.toString().length !== 8){
            setAlertCep(true)
            return false
        } else {
            return true
        }
    }

    function onSubmit(e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>){
        e.preventDefault()
        setLoading(true)

        if (!verifyCep() || !verifyUf()){
            setLoading(false)
            return
        } 

        if (nome === '' || cep === 0 || uf === '' || cidade === '' || logradouro === '' || bairro === '' || num === 0){
            setFieldsRequiredError(true)
            setLoading(false)
            return
        }

        const data : UserProps = {
            nome,
            apelido,
            cep,
            uf,
            cidade,
            logradouro,
            bairro,
            num,
            complemento,
            isNew
        }

        setTimeout(() => {
            handleAddAddress(data)
        }, 1000)
        setLoading(false)
    }

    useEffect(() => {
        if (cep.toString().length === 8){
            const getCepDetails = async () =>{
                try{
                    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
                    if (response.data.erro){
                        setIsNew(true)
                    } else {
                        setIsNew(false)
                        setUf(response.data.uf)
                        setCidade(response.data.localidade)
                        setLogradouro(response.data.logradouro)
                        setBairro(response.data.bairro)
                    }
                }catch{
                    Notification('error', 'Ooopss.... ocorreu um erro inesperado, preencha os campos novamente!')
                    clearFields()
                }
            }
            getCepDetails()
        }
    },[cep])


    useEffect(() => {
        if (isNaN(cep)){
            setCep(0)
        }
        if (isNaN(num)){
            setNum(0)
        }
    },[cep,num])

  return (
    <div className="bg-white px-12 max-[500px]:px-6 py-10 max-[500px]:py-6 rounded-2xl shadow-2xl">
        <h1 className="text-2xl font-bold text-center">Realizar Cadastro</h1>
        <form className="flex flex-col gap-[16px] max-[650px]:gap-[8p4] pt-[25px]" onSubmit={onSubmit}>
            <div className="grid grid-cols-2 max-[650px]:grid-cols-1 gap-4">
                <InputText label="Nome" onChange={setNome} value={nome} placeholder="Nome" />
                <InputText optional={true} label="Apelido" onChange={setApelido} value={apelido} placeholder="Apelido" />
            </div>
            <div className="grid grid-cols-2 max-[650px]:grid-cols-1 gap-4">
                    <div>
                        <InputNumber label="CEP" onChange={setCep} value={cep} placeholder="CEP" />
                        {alertCep && <span className="col-span-2 text-red-500 text-sm">CEP inválido</span>}
                    </div>
                    <div>
                        <InputText label="UF" onChange={setUf} value={uf} placeholder="UF" />
                        {alertUf && <span className="col-span-2 text-red-500 text-sm">UF inválido</span>}
                    </div>
            </div>
            <div className="grid grid-cols-2 max-[650px]:grid-cols-1 gap-4">
                    <InputText label="Cidade" onChange={setCidade} value={cidade} placeholder="Cidade" />
                    <InputText label="Logradouro" onChange={setLogradouro} value={logradouro} placeholder="Logradouro" />
            </div>
            <div className="grid grid-cols-2 max-[650px]:grid-cols-1 gap-4">
                    <InputText label="Bairro" onChange={setBairro} value={bairro} placeholder="Bairro" />
                    <InputNumber label="Número" onChange={setNum} value={num} placeholder="Número" />
            </div>
            <div className="grid w-full items-center">
                <InputText label="Complemento" onChange={setComplemento} value={complemento} placeholder="Complemento" />
            </div>
            {fieldsRequiredError && <span className="text-red-500 text-sm">Preencha todos os campos obrigatórios</span>}
            <button onClick={onSubmit} className="w-full mt-6 py-2 bg-black text-white font-bold rounded hover:opacity-40 duration-300">{loading ? 'Salvando...' : 'Salvar'}</button>
        </form>
    </div>
  )
}
