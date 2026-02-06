import { Ellipsis } from "lucide-react"

const Loader = (props)=>{      
    const text = props?.data?.text ?? ''
    const width = (props?.data?.width) ? (props.data.width) + 'px' : '16px'
    const height = (props?.data?.height) ? (props.data.height) + 'px' : '16px'
    return(         
		<>
        {
            <>            
            <div className="">                 
            <div className="animate-spin rounded-full h-4 w-4 border-t-3 border-white-500 inline-block mt-1.5" style={{width:width, height:height}}></div>            
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