import database
from database import session, Cams

# Placeholder for importing CAMS data from e.g. a CSV

def populate_cams():

    # delete everything first
    session.query(Cams).delete()
    session.commit()

    for i in ['Alpha','Bravo','Charlie','Delta','Echo','Foxtrot','Golf','Hotel','India','Juliet']:
        new_cams = Cams(name = f"CAMS Strategy {i}")
        session.add(new_cams)
        session.commit()

if __name__ == "__main__":
    database.init_db()
    populate_cams()
