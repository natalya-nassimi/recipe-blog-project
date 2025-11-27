const CommentFeed = ({ recipe }) => {
    return (
        <div>
            {recipe.comments.map(comment => {
                return (
                    <>
                    <div>
                        <div>
                            {/*Username */}
                            <p>{comment.author.username}</p>
                            {/*CommentDate */}
                            <p>{comment?.createdAt?.split("T")[0]}</p>                            
                        </div>
                        {/*CommentDescription */}
                        <div>
                            <p>{comment.description}</p>
                        </div>

                    </div>
                    <hr/>
                    </>
                )
            })}
        </div>
    )
}

export default CommentFeed