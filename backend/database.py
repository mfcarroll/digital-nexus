from sqlalchemy import create_engine, Column, ForeignKey, Integer, String, Boolean, select
from sqlalchemy.orm import declarative_base, relationship, scoped_session, sessionmaker, Session
from sqlalchemy.sql import and_, or_

engine = create_engine('sqlite:///innovationhub.db')
session = scoped_session(sessionmaker(autocommit=False,
                                      autoflush=False,
                                      bind=engine,
                                      future=True))

Base = declarative_base(bind=engine)


class Idea(Base):
    __tablename__ = 'ideas'

    id = Column(Integer, primary_key=True)
    title = Column(String(100))
    description = Column(String(1000))
    cams = Column(Integer, ForeignKey("cams.id"), nullable=False)
    priority = Column(Integer)
    rating = Column(Integer)

    def __repr__(self):
        return f"Idea({self.id=!r}, {self.title=!r}, {self.description=!r}, {self.cams=!r}, {self.priority=!r}, {self.rating=!r})"

    @property
    def serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'cams': self.cams,
            'priority': self.priority,
            'rating': self.rating
        }


class Cams(Base):
    __tablename__ = 'cams'

    id = Column(Integer, primary_key=True)
    name = Column(String(30))

    def __repr__(self):
        return f"Cams({self.id=!r}, {self.name=!r})"

    @property
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name
        }


def init_db():
    Base.metadata.create_all(engine)
