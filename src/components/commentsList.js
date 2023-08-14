const CommentsList = ({comments})=>{
    return(
        <>
            <h2>Comments:</h2>
            {
                comments.map((comment , i)=>(
                    <div className="comment" key={i} >
                    <h4>{comment.postedBy}</h4>
                    <p >{comment.text}</p>
                    </div>
                ))
            }
        </>
    )
}
export default CommentsList