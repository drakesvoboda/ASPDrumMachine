
DROP TABLE IF EXISTS Instruments, Machines, Sounds;

CREATE TABLE Machines(
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(1024),
    gridLength INTEGER,
    tempo INTEGER,
    PRIMARY KEY(id)
);

CREATE TABLE Sounds(
	id INTEGER NOT NULL AUTO_INCREMENT,
	name VARCHAR(1024),
    description VARCHAR(1024),
	audiofile VARCHAR(1024),
	PRIMARY KEY(id)
);


CREATE TABLE Instruments(
    id INTEGER NOT NULL AUTO_INCREMENT,
    machineID INTEGER, 
	soundID INTEGER,
    sequence VARCHAR(1024), 
    PRIMARY KEY(id),
    FOREIGN KEY(machineID) REFERENCES Machines(id),
	FOREIGN KEY(soundID) REFERENCES Sounds(id)
);
