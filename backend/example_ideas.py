import database
from database import Idea, session
database.init_db()

# Quick add some example ideas to the database


def populate_ideas():

    # delete everything first
    session.query(Idea).delete()
    session.commit()

    idea1 = Idea(title="Make an ideas app",
                 description="Build a really simple app to collect innovative ideas from across the army",
                 cams=1)

    idea2 = Idea(title="Learn node.js",
                 description="We're using flask, but maybe we want to use node.js instead?",
                 cams=3)

    idea3 = Idea(title="Make a presentation",
                 description="Show the digital nexus team what we've built here",
                 cams=5)

    session.add_all([idea1, idea2, idea3])
    session.commit()

if __name__ == "__main__":
    database.init_db()
    populate_ideas()
