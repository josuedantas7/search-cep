export interface InputTextProps {
    optional?: boolean,
    label: string,
    value: string,
    placeholder: string
    onChange: (e: string) => void,
}