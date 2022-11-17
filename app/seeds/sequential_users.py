from app.models import db, User, environment, SCHEMA


def seed_users():
    user_1 = User(
        username="Demo",
        first_name="demo",
        last_name="user",
        email="demo@aa.io",
        profileImageUrl="https://img.freepik.com/premium-vector/handdrawn-vintage-hermit-crab-vector-illustration_147266-58.jpg?w=360",
        password="password"
    )

    user_2 = User(
        username="",
        first_name="",
        last_name="",
        email="",
        profileImageUrl="",
        password=""
    )

    user_3 = User(
        username="",
        first_name="",
        last_name="",
        email="",
        profileImageUrl="",
        password=""
    )

    user_4 = User(
        username="",
        first_name="",
        last_name="",
        email="",
        profileImageUrl="",
        password=""
    )

    user_5 = User(
        username="",
        first_name="",
        last_name="",
        email="",
        profileImageUrl="",
        password=""
    )

    user_1.followers = [user_2, user_3, user_4, user_5]

    db.session.add(user_1)
    db.session.add(user_2)
    db.session.add(user_3)
    db.session.add(user_4)
    db.session.add(user_5)
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
