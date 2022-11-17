from app.models import db, Media, environment, SCHEMA


def seed_media():
    user_2_media = [
        Media(
            post_id=1,
            media_type="",
            media_url=""
        ),
        Media(
            post_id=2,
            media_type="",
            media_url=""
        ),
        Media(
            post_id=3,
            media_type="",
            media_url=""
        ),
        Media(
            post_id=4,
            media_type="",
            media_url=""
        ),
        Media(
            post_id=5,
            media_type="",
            media_url=""
        ),
        Media(
            post_id=6,
            media_type="",
            media_url=""
        ),
        Media(
            post_id=7,
            media_type="",
            media_url=""
        ),
        Media(
            post_id=8,
            media_type="",
            media_url=""
        ),
        Media(
            post_id=9,
            media_type="",
            media_url=""
        ),
        Media(
            post_id=10,
            media_type="",
            media_url=""
        )
    ]

    user_3_media = [
        Media(
            post_id=11,
            media_type="",
            media_url=""
        ),
        Media(
            post_id=12,
            media_type="",
            media_url=""
        ),
        Media(
            post_id=13,
            media_type="",
            media_url=""
        ),
        Media(
            post_id=14,
            media_type="",
            media_url=""
        ),
        Media(
            post_id=15,
            media_type="",
            media_url=""
        ),
        Media(
            post_id=16,
            media_type="",
            media_url=""
        ),
        Media(
            post_id=17,
            media_type="",
            media_url=""
        ),
        Media(
            post_id=18,
            media_type="",
            media_url=""
        ),
        Media(
            post_id=19,
            media_type="",
            media_url=""
        ),
        Media(
            post_id=20,
            media_type="",
            media_url=""
        )
    ]

    user_4_media = [
        Media(
            post_id=21,
            media_type="",
            media_url=""
        ),
        Media(
            post_id=22,
            media_type="",
            media_url=""
        ),
        Media(
            post_id=23,
            media_type="",
            media_url=""
        ),
        Media(
            post_id=24,
            media_type="",
            media_url=""
        ),
        Media(
            post_id=25,
            media_type="",
            media_url=""
        ),
        Media(
            post_id=26,
            media_type="",
            media_url=""
        ),
        Media(
            post_id=27,
            media_type="",
            media_url=""
        ),
        Media(
            post_id=28,
            media_type="",
            media_url=""
        ),
        Media(
            post_id=29,
            media_type="",
            media_url=""
        ),
        Media(
            post_id=30,
            media_type="",
            media_url=""
        )
    ]

    user_5_media = [
        Media(
            post_id=31,
            media_type="",
            media_url=""
        ),
        Media(
            post_id=32,
            media_type="",
            media_url=""
        ),
        Media(
            post_id=33,
            media_type="",
            media_url=""
        ),
        Media(
            post_id=34,
            media_type="",
            media_url=""
        ),
        Media(
            post_id=35,
            media_type="",
            media_url=""
        ),
        Media(
            post_id=36,
            media_type="",
            media_url=""
        ),
        Media(
            post_id=37,
            media_type="",
            media_url=""
        ),
        Media(
            post_id=38,
            media_type="",
            media_url=""
        ),
        Media(
            post_id=39,
            media_type="",
            media_url=""
        ),
        Media(
            post_id=40,
            media_type="",
            media_url=""
        )
    ]

    for media in user_2_media:
        db.session.add(media)

    for media in user_3_media:
        db.session.add(media)

    for media in user_4_media:
        db.session.add(media)

    for media in user_5_media:
        db.session.add(media)

    db.session.commit()


def undo_posts():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM posts")

    db.session.commit()
