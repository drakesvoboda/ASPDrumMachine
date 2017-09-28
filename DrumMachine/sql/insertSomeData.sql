INSERT INTO Machines ( id, name, gridLength, tempo )
   VALUES
   ( 1, "First Machine", 16, 100 );

INSERT INTO Sounds ( id, name, audiofile )
   VALUES
   ( 1, "Kick", "CYCdh_AcouKick-01.mp3" );

INSERT INTO Instruments ( id, machineID, soundID, sequence )
   VALUES
   ( 1, 1, 1, "0110101001101110" );