import { Ellipsis } from "lucide-react"

const Loader = (props)=>{      
    const text = props?.data?.text ?? ''
    return(         
		<>
        {
            <>            
            <div className="flex">                 
            <div className="animate-spin rounded-full h-4 w-4 border-t-3 border-white-500 inline-block mt-1.5"></div>            
            {
                text ?
                <>&nbsp;&nbsp;{text}</>
                :
                ''
            }
            </div>  
            </>
        }           
        </>
    )
}
export default Loader;