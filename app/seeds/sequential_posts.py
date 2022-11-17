from app.models import db, Post, User, environment, SCHEMA


def seed_posts():
    user_2_posts = [
        Post(
            user_id=2,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=2,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=2,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=2,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=2,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=2,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=2,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=2,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=2,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=2,
            post_type="",
            title="",
            text=""
        ),
    ]

    user_3_posts = [
        Post(
            user_id=3,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=3,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=3,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=3,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=3,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=3,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=3,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=3,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=3,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=3,
            post_type="",
            title="",
            text=""
        ),
    ]

    user_4_posts = [
        Post(
            user_id=4,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=4,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=4,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=4,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=4,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=4,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=4,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=4,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=4,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=4,
            post_type="",
            title="",
            text=""
        ),
    ]

    user_5_posts = [
        Post(
            user_id=5,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=5,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=5,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=5,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=5,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=5,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=5,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=5,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=5,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=5,
            post_type="",
            title="",
            text=""
        ),
    ]

    user_2 = User.query.get(2)
    user_3 = User.query.get(3)
    user_4 = User.query.get(4)
    user_5 = User.query.get(5)

    for post in user_2_posts:
        post.user_likes = [user_3, user_4, user_5]
        db.session.add(post)

    for post in user_3_posts:
        post.user_likes = [user_2, user_4, user_5]
        db.session.add(post)

    for post in user_4_posts:
        post.user_likes = [user_2, user_3, user_5]
        db.session.add(post)

    for post in user_5_posts:
        post.user_likes = [user_2, user_3, user_4]
        db.session.add(post)

    db.session.commit()


def undo_posts():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM posts")
        db.session.execute("DELETE FROM likes")

    db.session.commit()
