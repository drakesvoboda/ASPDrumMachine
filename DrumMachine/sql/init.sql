CREATE TABLE Machines(
    id INTEGER AUTO_INCREMENT,
    name VARCHAR(20),
    gridLength INTEGER,
    tempo INTEGER,
    PRIMARY KEY(id)
);

CREATE TABLE Instruments(
    id INTEGER AUTO_INCREMENT,
    machineid INTEGER,
    name VARCHAR(20),
    description VARCHAR(20),
    sequence VARCHAR(20),
    audiofile VARCHAR(20),
    PRIMARY KEY(id),
    FOREIGN KEY(machineid) REFERENCES Machines(id)
);
