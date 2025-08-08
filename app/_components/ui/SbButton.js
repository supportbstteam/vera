import { Ellipsis } from "lucide-react"

const SbButton = (props)=>{   
   
    const type = props.data.type ?? 'button'
    const text = props.data.text ?? 'Submit'
    const btnClass = props.data.class ?? ''
    const disabled = props.data.disabled ?? false
    const Icon = props.data.icon ?? ''
    return(         
		<>
        {
            <>
            <button className={btnClass} type={type} disabled={disabled} style={{cursor:"pointer"}}>
            <div className="flex">
            {text}

            {
                Icon &&
                <Icon size={36}  />
            }            
            
            {
                disabled === true &&
                <>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <div className="animate-spin rounded-full h-4 w-4 border-t-3 border-white-500 inline-block mt-1.5"></div>
                </>
            }     
            </div>       
            </button>            
            </>
        }           
        </>
    )
}
export default SbButton;