const CommentFeed = ({ recipe }) => {
    return (
        <div>
            {recipe.comments.map((comment) => {
                console.log(comment._id)
                return (
                    <div key={comment._id}>
                        <div>
                            {/*Username */}
                            <p>{comment.author.username}</p>
                            {/*CommentDate */}
                            <p>{comment.createdAt.split("T")[0]}</p>
                        </div>
                        {/*CommentDescription */}
                        <div>
                            <p>{comment.description}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default CommentFeed