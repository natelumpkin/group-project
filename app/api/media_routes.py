from flask import Blueprint, request
from app.models import db, Media, Post
from flask_login import current_user, login_required
from .utils.uploadHelper import (
    upload_file_to_s3, allowed_file, get_unique_filename)

media_routes = Blueprint("media", __name__)

@media_routes.route("/<int:postId>", methods=["POST"])
@login_required
def upload_image_to_post(postId):

  print('Hello from media route')

  if "image" not in request.files:
    return {"errors": "image required"}, 400

  image = request.files["image"]

  if not allowed_file(image.filename):
      return {"errors": "file type not permitted"}, 400

  image.filename = get_unique_filename(image.filename)

  upload = upload_file_to_s3(image)

  if "url" not in upload:
      # if the dictionary doesn't have a url key
      # it means that there was an error when we tried to upload
      # so we send back that error message
      return upload, 400

  url = upload["url"]
  # flask_login allows us to get the current user from the request
  new_image = Media(media_url=url, post_id=postId)
  print(new_image)
  db.session.add(new_image)
  db.session.commit()
  return {"url": url}
