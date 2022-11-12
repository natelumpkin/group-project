from app.models import db, Post, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_posts():
    post1 = Post(
      user_id=1, post_type="text", title="I'm writing an amazing post!", text="This is the most amazing post"
    )
    post2 = Post(
      user_id=2, post_type="photo", text="This is a photo post"
    )
    post3 = Post(
      user_id=3, post_type="quote", title="John C Reilly", text="The hungriest man, is not the happiest"
    )

    user1 = User.query.get(1)
    user2 = User.query.get(2)
    user3 = User.query.get(3)

    post1.user_likes = [user1]
    post2.user_likes = [user2, user3]
    post3.user_likes = [user1, user2, user3]

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)

    db.session.commit()



# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM posts")
        db.session.execute("DELETE FROM likes")

    db.session.commit()
