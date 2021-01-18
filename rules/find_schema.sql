create table Filters (
    id          integer primary key autoincrement,
    editedby    text,
    editdate    date,
    filter      text,
    name        text,
    description text
);

create table FilterHistory (
    id       integer primary key autoincrement,
    filterid integer references Filters,
    editedby text,
    editdate date,
    filter   text
);

create table Wikis (
    id     integer primary key,
    domain text
);

create table FilteredBy (
    id       integer primary key autoincrement,
    filterid integer references Filters,
    editedby text,
    editdate date,
    filter   text
);