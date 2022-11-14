const PostCard = ({post}) => {

  console.log('postCard component post: ', post)

  // if postType is text,
  // only render title and text
  // if postType is quote,
  // only render title and text
  // if postType is image,
  // only render image and text
  // if postType is video,
  // only render video and text

  if (post.postType === 'text') {
    return (
      <div className="postCard-outer-container">
        <div className="postCard-userImage-holder">
          <div className="postCard-userImage">
            <img src={post.User.profileImageUrl}/>
            Profile Image Placeholder
          </div>
        </div>
        <div className="postCard-content-holder">
          <div className="postCard-author-username-holder">
            {post.User.username}
          </div>
          <div className="postcard-title-holder">
            <h2>{post.title}</h2>
          </div>
          <div className="postcard-text-holder">
            <p>{post.text}</p>
          </div>
          <div>
            <button>Delete</button>
            <button>Edit</button>
          </div>
        </div>
      </div>
    )
  }
}


export default PostCard;
