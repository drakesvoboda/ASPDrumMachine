INSERT INTO Machines ( id, name, gridLength, tempo )
   VALUES
   ( 1, "First Machine", 16, 100 );

INSERT INTO Sounds ( name, audiofile )
   VALUES
   ( "Kick", "CYCdh_AcouKick-01.mp3" );

INSERT INTO Instruments ( id, machineID, audiofile, sequence )
   VALUES
   ( 1, 1, "CYCdh_AcouKick-01.mp3", "0110101001101110" );