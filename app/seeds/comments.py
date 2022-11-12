from app.models import db, Post, User, Comment, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_posts():
    comment1 = Post(
      user_id=1, comment="This is a great post!", post_id=1
    )
    comment2 = Post(
      user_id=2, comment="This post is crappy!", post_id=2
    )
    comment3 = Post(
      user_id=3, comment="This post is mid!", post_id=3
    )
    user1 = User.query.filter(User.first_name == "Demo").one()
    user2 = User.query.filter(User.first_name == "marnie").one()
    user3 = User.query.filter(User.first_name == "bobbie").one()
    post1 = Post.query.get(1)
    post2 = Post.query.get(2)
    post3 = Post.query.get(3)

    user1.posts = [post1]
    user2.posts = [post2]
    user3.posts = [post3]

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
    else:
        db.session.execute("DELETE FROM posts")

    db.session.commit()
