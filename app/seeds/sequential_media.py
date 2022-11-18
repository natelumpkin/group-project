from app.models import db, Media, environment, SCHEMA


def seed_media():
    user_2_media = [
        Media(
            post_id=1,
            media_type="image",
            media_url="https://64.media.tumblr.com/adb1c97ff9b59bb46538ea53b6783bab/4299ae0bd94e959f-f7/s1280x1920/3c31005b65dfe3c69538bc9d9d36bf0d25680e67.jpg"
        ),
        Media(
            post_id=2,
            media_type="image",
            media_url="https://64.media.tumblr.com/6cc3a307a79aacbb9965e04d97360ec2/f501619134e5052c-be/s1280x1920/046a4e44c5dbf803efdf56eb224d1707f6f5eff7.jpg"
        ),
        Media(
            post_id=3,
            media_type="image",
            media_url="https://64.media.tumblr.com/1e6b4264b065066c4015e178e916fdfa/d57f6696bcd7c997-22/s1280x1920/dc1c2a8a1d56e330f4a9ee34907c04ac51bf9a37.jpg"
        ),
        Media(
            post_id=4,
            media_type="image",
            media_url="https://64.media.tumblr.com/285381d18a2fc963fb1649f8bf0cd229/052c1c273a49b3b0-37/s1280x1920/0d98e44aa7b7783119b66d3160cb64c0c5cf9381.jpg"
        ),
        Media(
            post_id=5,
            media_type="image",
            media_url="https://64.media.tumblr.com/1ad72db943e001f529491b9de8fb9a0f/2828b2d874493c16-91/s1280x1920/96b334ac1a92295c5f8e6c00809eb5ee8aa481bb.jpg"
        ),
        Media(
            post_id=6,
            media_type="image",
            media_url="https://64.media.tumblr.com/8237e7bcbbd6eaeddd28d0ff8279d1d9/958916f037a32041-ff/s1280x1920/e8159027b1fc77195af56dba06bb32f0660b29cd.jpg"
        ),
        Media(
            post_id=7,
            media_type="image",
            media_url="https://64.media.tumblr.com/7edf0f47b5fc787e7f0cf2be4e82e9bd/d1bd4bd7cd3da55d-e0/s1280x1920/83f6d55a0291ff5c3d702506abcc59f8ee949cb5.jpg"
        ),
        Media(
            post_id=8,
            media_type="image",
            media_url="https://64.media.tumblr.com/09f21477df35be0c447e6e92f421ca97/9c3205f16e14023d-13/s1280x1920/214cbf0eee469c7598b0500ea1715cd1b8eb17ff.jpg"
        ),
        Media(
            post_id=9,
            media_type="image",
            media_url="https://64.media.tumblr.com/4fc8b4969e56a9ab823eede07a15c69e/8daf7bf3f972a3b5-a3/s1280x1920/ae0178629d4dd50c31e755068f90d6d73a16287f.jpg"
        ),
        Media(
            post_id=10,
            media_type="image",
            media_url="https://64.media.tumblr.com/c87c8cc67c59c082066ae13aea4621fc/ed7a320d63afc418-de/s1280x1920/f833b76e358478a6f057db1d6c35129dbef9480b.pnj"
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
            media_type="image",
            media_url="https://i.imgur.com/eWvoSdo.jpeg"
        ),
        Media(
            post_id=13,
            media_type="",
            media_url=""
        ),
        Media(
            post_id=14,
            media_type="video",
            media_url="https://www.youtube.com/watch?v=KydqdKKyGEk"
        ),
        Media(
            post_id=15,
            media_type="",
            media_url=""
        ),
        Media(
            post_id=16,
            media_type="image",
            media_url="https://i.imgur.com/lI8Wn5U.png"
        ),
        Media(
            post_id=17,
            media_type="",
            media_url=""
        ),
        Media(
            post_id=18,
            media_type="video",
            media_url="https://www.youtube.com/watch?v=5nW9o6M5zFo"
        ),
        Media(
            post_id=19,
            media_type="image",
            media_url="https://i.imgur.com/6m7csnW.jpeg"
        ),
        Media(
            post_id=20,
            media_type="image",
            media_url="https://i.imgur.com/hW4P4oX.jpeg"
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
            media_type="image",
            media_url="https://64.media.tumblr.com/6a6f2eadac9f36425a01e265396a6f4f/089e1fa6c1226f98-89/s640x960/34a81e294ce44618ab5938ab80a49c93bbacb95d.jpg"
        ),
        Media(
            post_id=28,
            media_type="image",
            media_url="https://64.media.tumblr.com/ebf0fc29c7119ef55ef591d5b35ee430/c61649fb822ffdf1-66/s640x960/4434f52898e507e8bffe2c5b83176523b23e29a7.jpg"
        ),
        Media(
            post_id=29,
            media_type="image",
            media_url="https://64.media.tumblr.com/71c98f219f75ab924f9bcc6aae6a5446/f717c6922b5877cd-54/s640x960/b713d99af39f1bad133ce4a80232e12766d7ff60.jpg"
        ),
        Media(
            post_id=30,
            media_type="image",
            media_url="https://64.media.tumblr.com/bd36f2d77457c4e2e10811ce8b41ed27/6091d07553dcfa25-02/s640x960/e3ab00ba2d0fb655515af93b95dda6b7c8a91686.jpg"
        )
    ]

    user_5_media = [
        Media(
            post_id=31,
            media_type="image",
            media_url="https://imgur.com/jvKE3Rm"
        ),
        Media(
            post_id=32,
            media_type="image",
            media_url="https://imgur.com/rsEVo8f"
        ),
        Media(
            post_id=33,
            media_type="video",
            media_url="https://www.youtube.com/watch?v=B2acyeQdRb0"
        ),
        Media(
            post_id=34,
            media_type="image",
            media_url="https://imgur.com/CuTDmSA"
        ),
        Media(
            post_id=35,
            media_type="video",
            media_url="https://www.youtube.com/watch?v=9wk4ApHloHM"
        ),
        Media(
            post_id=36,
            media_type="image",
            media_url="https://imgur.com/D0F0rV3"
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


def undo_media():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.media RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM media")

    db.session.commit()
