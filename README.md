# Appli_Pop_COllector

To run on FIREFOX ONLY : 
1) clear the local storage
2) download project
3) unzip the project
4) open a terminal
5) go to the project root
6) run the command cd server
7) run the command npm install
8) run the command node server
9) open an other terminal
10) got to the project root
11) run the commend cd ngApp
12) run the command npm install
13) run the command ng serve --o

To import the jsons of my database, open a terminal and run the command

   mongoimport -h ds137600.mlab.com:37600 -d api_piscines -c <collection> -u <user> -p <password> --file <input file>

   collection must be named: users, figures
    user: your username
    password: your password
