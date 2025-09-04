import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Api from '@/_library/Api';
import { deleteTokenFromCookie } from '@/actions'
import {useRouter} from "next/navigation";

export const fetchUser = createAsyncThunk("fetchUser", async ()=>{  
    const promise = new Promise( async (resolve, reject)=>{
        const res = await Api.me();  
        if(res && res.status===200){
            const resData = res.data
            resolve(resData.data) 
        }
        else{
            resolve('') 
        }        
    }).then( async(response)=>{ 

        if(!response){            
            await deleteTokenFromCookie('token')
            localStorage.removeItem(process.env.APP_PREFIX + 'token');
            localStorage.removeItem(process.env.APP_PREFIX + 'token_id');
            localStorage.removeItem(process.env.APP_PREFIX + 'role');   
            localStorage.removeItem(process.env.APP_PREFIX + 'id'); 
            localStorage.removeItem(process.env.APP_PREFIX + 'selected_category_time');        
            localStorage.removeItem(process.env.APP_PREFIX + 'selected_category');                   
            localStorage.removeItem(process.env.APP_PREFIX + 'search_text');   
            router.push('/')
        }  
        return response     
    })  
    return promise  
})

// Slice
const slice = createSlice({
    name: 'user',
    initialState: {
        isLoading:false,
        data: null,
        isError:false,
        abcxyz:null
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchUser.pending, (state,action)=>{
            state.isLoading = true
        })
        builder.addCase(fetchUser.fulfilled, (state,action) =>{
            state.isLoading = false
            state.data = action.payload
        })
        builder.addCase(fetchUser.rejected, (state,action)=>{
            console.log('error',action.payload)
            state.isError = true
        })
    },
    reducers: {
        loginSuccess: (state, action) => {
          state.abcxyz = action.payload;
        },
        logoutSuccess: (state, action) =>  {
          state.abcxyz = null;
        },
    },  
});
export default slice.reducer

// Actions ( normal )
export const { loginSuccess, logoutSuccess } = slice.actions