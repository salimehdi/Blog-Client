import { useParams } from "react-router-dom"
import { useState,useEffect } from "react";
import axios from 'axios'
import articles from "./articleContent";
import NotFoundPage from "./NotFoundPage"
import CommentsList from "../components/commentsList";
import AddComment from "../components/AddComment";
import useUser from "../hooks/useUser";
const ArticlePage = () => {
    const [articleInfo , setArticleInfo] = useState({upvotes:0,comments:[],canUpvote:true,upvoteIds:[]})
    const {canUpvote} = articleInfo //to articleInfo.canUpvote
    const {articleId} = useParams();

    const { user , isLoading } = useUser()
    
    useEffect(
        ()=>{
            

            const loadArticleInfo = async ()=>{
                const token = user && await user.getIdToken()
                const headers = token ? {authtoken:token}:{}
                const response = await axios.get(`/api/article/${articleId}`,{headers})
                const newArticleInfo = response.data
                setArticleInfo(newArticleInfo)
            }
            if (isLoading){
            loadArticleInfo()
            }
        }
        ,[isLoading, user]
    )
    const addUpvote = async ()=>{
        const token = user && await user.getIdToken()
        const headers = token ? {authtoken:token}:{}
        const response = await axios.put(`/api/article/${articleId}/upvote`,null,{headers})
        const updateUpvotes = response.data
        setArticleInfo(updateUpvotes)
        console.log(canUpvote);
    }
    const article = articles.find((art)=>art.name === articleId)
    if (!article){
        return <NotFoundPage/>
    }
    return (
        <>
        <h1>{article.title}</h1>
        <div className="upvotes-section">
            { user 
            ?<button onClick={()=>addUpvote()}>{(canUpvote) ? 'Upvote' : 'Already Upvoted'}</button>
            :<button>Login To Upvote</button>
            }
            <p>This article has {articleInfo.upvotes} upvote(s)</p>
        </div>
        {article.content.map((element,i) => (
            <p key={i}>{element}</p>
        ))}
        {user
        ?<AddComment
        articleName={articleId}
        onArticleUpdated={(updatedArticle) => setArticleInfo(updatedArticle)}
        />
        :<button>Click To Add Comment</button>}
        <CommentsList comments={articleInfo.comments} />
        </>

    )
}

export default ArticlePage