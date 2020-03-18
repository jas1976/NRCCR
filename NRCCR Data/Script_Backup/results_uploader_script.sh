#!/usr/bin/env sh
for i in *ready*csv
	do
		wc -l "$i"
		mongoimport --db NRCCR --collection raceresults2018spring --type csv --headerline --file $i
		echo ----------------------------------------
		mv "$i" Uploaded\ Files\ Archive
	done
