from app.models import db, User, environment, SCHEMA


def seed_users():
    user_1 = User(
        username="Demo",
        first_name="demo",
        last_name="user",
        email="demo@aa.io",
        profile_image_url="https://img.freepik.com/premium-vector/handdrawn-vintage-hermit-crab-vector-illustration_147266-58.jpg?w=360",
        password="password"
    )

    user_2 = User(
        username="Colossal",
        first_name="Tomas",
        last_name="Sanchez",
        email="Colossal@aa.io",
        profile_image_url="https://64.media.tumblr.com/2fd848f7ee388fe87b4a0cdb9a3fd428/9c7e47a776c94e31-47/s512x512u_c1/d12ca92526f1d9029f08976a6dd38d3732722c2d.pnj",
        password="ColossalPassword"
    )

    user_3 = User(
        username="Mushroom-Mario",
        first_name="Mario",
        last_name="Mario",
        email="mario.mario@aa.io",
        profile_image_url="https://i.imgur.com/mwR4POb.jpeg",
        password="mushroomiest"
    )

    # user_4 = User(
    #     username="",
    #     first_name="",
    #     last_name="",
    #     email="",
    #     profile_image_url="",
    #     password=""
    # )

    # user_5 = User(
    #     username="",
    #     first_name="",
    #     last_name="",
    #     email="",
    #     profile_image_url="",
    #     password=""
    # )

    # user_1.followers = [user_2, user_3, user_4, user_5]
    # user_2.followers = [user_1]
    # user_3.followers = [user_1]
    # user_4.followers = [user_1]
    # user_5.followers = [user_1]

    db.session.add(user_1)
    db.session.add(user_2)
    db.session.add(user_3)
    # db.session.add(user_4)
    # db.session.add(user_5)
    db.session.commit()


def undo_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.follows RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        db.session.execute("DELETE FROM follows")

    db.session.commit()
