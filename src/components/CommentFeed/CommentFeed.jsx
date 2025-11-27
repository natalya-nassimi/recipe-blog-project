import './CommentFeed.css'

const CommentFeed = ({ recipe }) => {
    return (
        <div className="comment-feed">
            {recipe.comments.map((comment) => {
                return (
                    <div key={comment._id} className="comment-card">
                        <div className="comment-header">
                            {/*Username */}
                            <p className="comment-author">Posted By: {comment.author.username}</p>
                            {/*CommentDate */}
                            <p className="comment-date">{comment.createdAt.split("T")[0]}</p>
                        </div>
                        {/*CommentDescription */}
                        <div className="comment-body">
                            <p className="comment-description">{comment.description}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default CommentFeed