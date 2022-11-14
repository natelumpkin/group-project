import formatVideoLink from "../../utils/formatVideoLink"

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
          <div className="postcard-edit-delete-holder">
            <button>Delete</button>
            <button>Edit</button>
          </div>
          <div>
            <div className="postcard-notes-holder">
              {post.notes.length > 0 && (
                <div>{post.notes} notes</div>
              )}
            </div>
            <div className="postcard-comments-likes-holder">
              <button>Reply</button>
              <button>Like</button>
            </div>
          </div>
        </div>
      </div>
    )
  } else if (post.postType === "quote") {
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
          <div className="postcard-quote-holder">
            <h2>{post.title}</h2>
          </div>
          <div className="postcard-source-holder">
            <p>{post.text}</p>
          </div>
          <div className="postcard-edit-delete-holder">
            <button>Delete</button>
            <button>Edit</button>
          </div>
          <div>
            <div className="postcard-notes-holder">
              {post.notes.length > 0 && (
                <div>{post.notes} notes</div>
              )}
            </div>
            <div className="postcard-comments-likes-holder">
              <button>Reply</button>
              <button>Like</button>
            </div>
          </div>
        </div>
      </div>
    )
  } else if (post.postType === 'photo') {
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
            <div className="postcard-photo-holder">
              <img src="post.Media.mediaUrl" />
              {post.Media.mediaUrl}
            </div>
            <div className="postcard-caption-holder">
              <p>{post.text}</p>
            </div>
            <div className="postcard-edit-delete-holder">
              <button>Delete</button>
              <button>Edit</button>
            </div>
            <div>
              <div className="postcard-notes-holder">
                {post.notes.length > 0 && (
                  <div>{post.notes} notes</div>
                )}
              </div>
              <div className="postcard-comments-likes-holder">
                <button>Reply</button>
                <button>Like</button>
              </div>
            </div>
          </div>
        </div>
    )
  } else if (post.postType === 'video') {

    let formattedLink;
    if (post.Media[0]) {
      const videoLink = post.Media[0].mediaUrl;
      formattedLink = formatVideoLink(videoLink)
    }

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
            <div className="postcard-video-holder">
              {post.Media[0] && post.Media[0].mediaUrl.includes('youtube') && (
                <>
                  <iframe src={formattedLink}></iframe>
                </>)}
              {post.Media[0] && (
              <>
                <h4>placeholder link for video: {post.Media[0].mediaUrl}</h4>
              </>)}
            </div>
            <div className="postcard-caption-holder">
              <p>{post.text}</p>
            </div>
            <div className="postcard-edit-delete-holder">
              <button>Delete</button>
              <button>Edit</button>
            </div>
            <div>
              <div className="postcard-notes-holder">
                {post.notes.length > 0 && (
                  <div>{post.notes} notes</div>
                )}
              </div>
              <div className="postcard-comments-likes-holder">
                <button>Reply</button>
                <button>Like</button>
              </div>
            </div>
          </div>
        </div>
    )
  }
  else {
    return (
      <h2>{post.postType}</h2>
    )
  }
}


export default PostCard;
