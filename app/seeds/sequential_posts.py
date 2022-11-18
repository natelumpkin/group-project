from app.models import db, Post, User, environment, SCHEMA


def seed_posts():
    user_2_posts = [
        Post(
            user_id=2,
            post_type="image",
            title="",
            text="Balloon-Like Sculptures Reimagine Blown Glass in Matthew Szosz's 'Inflatables' Series"
        ),
        Post(
            user_id=2,
            post_type="image",
            title="",
            text="Uncanny Scenarios Unfold in Whimsical and Ironic Illustrations by Yuko Shimizu"
        ),
        Post(
            user_id=2,
            post_type="image",
            title="",
            text="Quirky Clothesline Creatures Saunter Across Helga Stentzel's Landscape Illusions"
        ),
        Post(
            user_id=2,
            post_type="image",
            title="",
            text="Ride EJ Hill's Bubblegum Pink Roller Coaster Through a Mass MoCA Gallery"
        ),
        Post(
            user_id=2,
            post_type="image",
            title="",
            text="Symbols and Colorful Motifs Inscribe Tomas Barcelo's Fragmented Steampunk Sculptures"
        ),
        Post(
            user_id=2,
            post_type="image",
            title="",
            text="Speckled, Crackled, and Kintsugi Sheets of Ceramic Cloak Lisa Agnetun's Tiny Spirited Ghosts"
        ),
        Post(
            user_id=2,
            post_type="image",
            title="",
            text="Nathalie Miebach Weaves Data and Anecdotes into Expansive Sculptures to Raise Awareness of the Climate Crisis"
        ),
        Post(
            user_id=2,
            post_type="image",
            title="",
            text="Metamorphosis and History Merge in Meticulously Carved Sculptures by Andreas Senoner"
        ),
        Post(
            user_id=2,
            post_type="image",
            title="",
            text="Through Mystical Mixed-Media Narratives, Artist Rithika Merchant Explores Intrinsic Connection"
        ),
        Post(
            user_id=2,
            post_type="image",
            title="",
            text="Delicate Slivers of Air-Dry Clay Form Breezy, Idyllic Landscapes by Alisa Lariushkina"
        ),
    ]

    user_3_posts = [
        Post(
            user_id=3,
            post_type="text",
            title="",
            text="""*Mario is fighting Bowser*

Luigi: Just stay calm! You already have everything you need to beat him!

Mario: The power to believe in myself!?

Luigi: No, a knife! Stab him!"""
        ),
        Post(
            user_id=3,
            post_type="image",
            title="",
            text=""
        ),
        Post(
            user_id=3,
            post_type="quote",
            title="Mario",
            text="It's-a me, Mario!"
        ),
        Post(
            user_id=3,
            post_type="video",
            title="",
            text=""
        ),
        Post(
            user_id=3,
            post_type="text",
            title="Super Mario Movie",
            text="Is anyone else looking forward to the movie or is it just me? Chris Pratt's voice activng wasn't THAT bad."
        ),
        Post(
            user_id=3,
            post_type="image",
            title="",
            text=""
        ),
        Post(
            user_id=3,
            post_type="quote",
            title="Mario",
            text="Mario number one!"
        ),
        Post(
            user_id=3,
            post_type="video",
            title="",
            text=""
        ),
        Post(
            user_id=3,
            post_type="image",
            title="",
            text=""
        ),
        Post(
            user_id=3,
            post_type="image",
            title="",
            text=""
        ),
    ]

    user_4_posts = [
        Post(
            user_id=4,
            post_type="quote",
            title="Michael J Fox",
            text="When the night is over, you know the day is just beginning"
        ),
        Post(
            user_id=4,
            post_type="quote",
            title="Dale Cooper",
            text="If you've never seen a man, you've never seen war"
        ),
        Post(
            user_id=4,
            post_type="quote",
            title="Cloud Strife",
            text="What is a child, but an adult who hasn't grown up?"
        ),
        Post(
            user_id=4,
            post_type="quote",
            title="Monica Bellucci",
            text="We are like the dreamer who dreams and lives inside the dream -- but who is the dreamer?"
        ),
        Post(
            user_id=4,
            post_type="quote",
            title="Dirtface",
            text="Watch this!"
        ),
        Post(
            user_id=4,
            post_type="quote",
            title="General Malagon of the Cruelest Eye",
            text="Where are my wives?"
        ),
        Post(
            user_id=4,
            post_type="image",
            title="",
            text="If you've never seen a planet catch fire, watch closer. As my eye scrapes the atmosphere, you'll be able to see the clouds turn to steam as the oceans begin to boil. Very cool!"
        ),
        Post(
            user_id=4,
            post_type="image",
            title="",
            text="After a hard rain, the finest of earthworms come crawling to the surface. You rebels will do much the same!"
        ),
        Post(
            user_id=4,
            post_type="image",
            title="",
            text="See that weird dog down there? That's you lol"
        ),
        Post(
            user_id=4,
            post_type="image",
            title="",
            text="Check out my mangler! Ha ha ha!"
        ),
    ]

    # user_5_posts = [
    #     Post(
    #         user_id=5,
    #         post_type="",
    #         title="",
    #         text=""
    #     ),
    #     Post(
    #         user_id=5,
    #         post_type="",
    #         title="",
    #         text=""
    #     ),
    #     Post(
    #         user_id=5,
    #         post_type="",
    #         title="",
    #         text=""
    #     ),
    #     Post(
    #         user_id=5,
    #         post_type="",
    #         title="",
    #         text=""
    #     ),
    #     Post(
    #         user_id=5,
    #         post_type="",
    #         title="",
    #         text=""
    #     ),
    #     Post(
    #         user_id=5,
    #         post_type="",
    #         title="",
    #         text=""
    #     ),
    #     Post(
    #         user_id=5,
    #         post_type="",
    #         title="",
    #         text=""
    #     ),
    #     Post(
    #         user_id=5,
    #         post_type="",
    #         title="",
    #         text=""
    #     ),
    #     Post(
    #         user_id=5,
    #         post_type="",
    #         title="",
    #         text=""
    #     ),
    #     Post(
    #         user_id=5,
    #         post_type="",
    #         title="",
    #         text=""
    #     ),
    # ]

    user_2 = User.query.get(2)
    user_3 = User.query.get(3)
    # user_4 = User.query.get(4)
    # user_5 = User.query.get(5)

    for post in user_2_posts:
        # post.user_likes = [user_3, user_4, user_5]
        db.session.add(post)

    for post in user_3_posts:
        # post.user_likes = [user_2, user_4, user_5]
        db.session.add(post)

    for post in user_4_posts:
    #     post.user_likes = [user_2, user_3, user_5]
        db.session.add(post)

    # for post in user_5_posts:
    #     post.user_likes = [user_2, user_3, user_4]
    #     db.session.add(post)

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
