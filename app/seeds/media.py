from app.models import db, Media, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_media():
    media1 = Media(post_id=2, media_type="photo", media_url="https://64.media.tumblr.com/e2ae6772f093c75a99c6311dc5f81bd9/a50867f53416f928-26/s1280x1920/8f86bbd952a39ab0ebdf7190724715d8a0c10159.png")
    media2 = Media(post_id=3, media_type="video", media_url="https://youtu.be/0zpHVUnAhxc")

    db.session.add(media1)
    db.session.add(media2)

    db.session.commit()



# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_media():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.media RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM media")

    db.session.commit()
