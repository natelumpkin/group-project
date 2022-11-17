from app.models import db, Post, User, environment, SCHEMA


def seed_posts():
    user_2 = User.query.get(2)
    user_3 = User.query.get(3)
    user_4 = User.query.get(4)
    user_5 = User.query.get(5)

    user_2_posts = [
        Post(
            user_id=user_2.id,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=user_2.id,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=user_2.id,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=user_2.id,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=user_2.id,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=user_2.id,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=user_2.id,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=user_2.id,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=user_2.id,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=user_2.id,
            post_type="",
            title="",
            text=""
        ),
    ]

    user_3_posts = [
        Post(
            user_id=user_3.id,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=user_3.id,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=user_3.id,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=user_3.id,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=user_3.id,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=user_3.id,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=user_3.id,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=user_3.id,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=user_3.id,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=user_3.id,
            post_type="",
            title="",
            text=""
        ),
    ]

    user_4_posts = [
        Post(
            user_id=user_4.id,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=user_4.id,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=user_4.id,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=user_4.id,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=user_4.id,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=user_4.id,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=user_4.id,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=user_4.id,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=user_4.id,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=user_4.id,
            post_type="",
            title="",
            text=""
        ),
    ]

    user_5_posts = [
        Post(
            user_id=user_5.id,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=user_5.id,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=user_5.id,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=user_5.id,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=user_5.id,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=user_5.id,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=user_5.id,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=user_5.id,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=user_5.id,
            post_type="",
            title="",
            text=""
        ),
        Post(
            user_id=user_5.id,
            post_type="",
            title="",
            text=""
        ),
    ]

    for post in user_2_posts:
        db.session.add(post)

    for post in user_3_posts:
        db.session.add(post)

    for post in user_4_posts:
        db.session.add(post)

    for post in user_5_posts:
        db.session.add(post)

    db.session.commit()


def undo_posts():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM posts")

    db.session.commit()
