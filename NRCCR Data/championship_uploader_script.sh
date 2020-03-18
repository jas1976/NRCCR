#!/usr/bin/env sh
echo "Please enter the latest race date in the Championship - format yyyy-mm-dd"
read racedate
echo "You've entered "$racedate
echo "Please enter the season - format Spring-2018"
read season
echo "You've entered "$season
echo "Enter Y to continue - anything else to quit "
read confirm
if [[ $confirm = "Y" ]];
	then
	echo "Running..."
	for i in *Series*csv
		do
			class=`echo "$i" | cut -d"-" -f1`
			echo $class
			rm -rf file-to-load
			wc -l "$i"
			cat $i | sed -e "s/$/\,$class/g" > file-to-load
			sed -i "1s/.$class$/,\"Race Class\"/" file-to-load
			mongoimport --db NRCCR --collection championship2018summer --type csv --headerline --file file-to-load
			echo ----------------------------------------
			mkdir Uploaded\ Files\ Archive/"$season"
			mkdir Uploaded\ Files\ Archive/"$season"/"$racedate"
			mv "$i" Uploaded\ Files\ Archive/"$season"/"$racedate"/
			rm -rf file-to-load
		done
else
	echo "Exiting..."
fi
