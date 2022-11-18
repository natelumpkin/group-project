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

    user_5_comments = [
        Comment(
            user_id=2,
            post_id=31,
            comment="Lucky chef!!"
        ),
        Comment(
            post_id=31,
            user_id=1,
            comment="Wow! Who drew this for you? It's amazing. It's awesome!"
        ),
        Comment(
            post_id=32,
            user_id=3,
            comment="This is making me hungry! I WANT ONE NOW!"
        ),
        Comment(
            post_id=32,
            user_id=4,
            comment="I dunno, I feel like I can get something like this for the right price."
        ),
        Comment(
            post_id=35,
            user_id=1,
            comment="lol What did I just watch?"
        ),
        Comment(
            post_id=35,
            user_id=5,
            comment="Is this a relative of yours?!"
        ),
        Comment(
            post_id=35,
            user_id=3,
            comment="Hahaha the voices were so funny. What even was this? XD!"
        ),
        Comment(
            post_id=38,
            user_id=3,
            comment="Wise beyond years, truly."
        ),
        Comment(
            post_id=39,
            user_id=3,
            comment="Keep the dadjokes coming!!"
        ),
        Comment(
            post_id=40,
            user_id=3,
            comment="Lord Cesar Salad of the Romaine empire-dressing."
        )
    ]

    for comment in user_2_comments:
        db.session.add(comment)


    for comment in user_5_comments:
        db.session.add(comment)

    db.session.commit()


def undo_comments():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
