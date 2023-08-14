import axios from "axios"
import { useState } from "react"
import useUser from "../hooks/useUser"

const AddComment = ({articleName , onArticleUpdated})=>{
    const [comment,setComment] = useState('')
    const {user} = useUser();

    const addCommentIn = async()=>{
        const token = user && await user.getIdToken()
        const headers = token ? {authtoken:token}:{}
        const {email} = user
        const response = await axios.post(`/api/article/${articleName}/comments`,{
            postedBy:email,
            text:comment
        },{headers})
        console.log(response.data);
        const updatedArticle = response.data
        onArticleUpdated(updatedArticle)
        setComment('')
    }

    return(
        <>
            <div id="add-comment-form">
                <h3>Add Comment :</h3>
                {user && <p>You are posting as {user.email}</p>}
                
                    
                    <textarea 
                    type="text"
                    value={comment}
                    onChange={e=> setComment(e.target.value)}
                    rows={4}
                    cols={4}
                    />
                
                <button onClick={addCommentIn}>Comment</button>
            </div>
        </>
    )
}
export default AddComment