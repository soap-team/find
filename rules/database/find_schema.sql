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
    filterid intege references Filters,
    wikiid   intege references Wikis,
    linkedby text,
    linkdate date,
    primary key (filterid, wikiid)
);