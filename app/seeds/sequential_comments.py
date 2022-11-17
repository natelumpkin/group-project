from app.models import db, Comment, environment, SCHEMA


def seed_comments():
    user_2_comments = [
        Comment(
            user_id=2,
            post_id=1,
            comment="Yo, this is pretty sick!"
        ),
        Comment(
            user_id=2,
            post_id=2,
            comment="Yo, this is greatly sick!"
        ),
        Comment(
            user_id=2,
            post_id=3,
            comment="Yo, this is very sick!"
        ),
        Comment(
            user_id=2,
            post_id=4,
            comment="Yo, this is really sick!"
        ),
        Comment(
            user_id=2,
            post_id=5,
            comment="Yo, this is hugely sick!"
        ),
        Comment(
            user_id=2,
            post_id=6,
            comment="Yo, this is extremely sick!"
        ),
        Comment(
            user_id=2,
            post_id=7,
            comment="Yo, this is so sick!"
        ),
        Comment(
            user_id=2,
            post_id=8,
            comment="Yo, this is deeply sick!"
        ),
        Comment(
            user_id=2,
            post_id=9,
            comment="Yo, this is immensely sick!"
        ),
        Comment(
            user_id=2,
            post_id=10,
            comment="Yo, this is profoundly sick!"
        )
    ]

    for comment in user_2_comments:
        db.session.add(comment)

    db.session.commit()


def undo_comments():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
