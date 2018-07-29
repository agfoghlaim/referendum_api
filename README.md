# Irish Referendum Results API

This project contains data for all available Irish referendum results.    


## Usage

### url
https://rocky-gorge-91285.herokuapp.com/api



### Endpoints
 
###### GET list of referendum names
````
/names

````

###### GET list of referendum names and ids
````
/namesandids

````

###### GET one referendum by id
````
/:id

````

###### GET all constituencies for one specific referendum
````
/:id/constituencies

````

###### GET one constituency's results for one specific referendum
````
/:id/constituency/:name

````

###### GET one specific value for one constituency  in one referendum
(keys are: constituency, electorate, totalPoll, percentagePoll, votesInFavour, votesAgainst, spoiltVotes)
````
/:id/constituency/:name/:key/

````

###### GET all referendum results from one particular year (or an empty array)
````
/year/:year

````

## About the Data


An official api for the results of the 2018 referendum only, is available through data.gov.ie
Most other referendum results are available from the same site in .csv format only.

Based on a quick comparison with the wikipedia article for Irish Amendments to the Constitution, 4 referendums seem to be missing from the results on data.gov.ie ...

- 1937 Adaption of the Constitution
- 1998 Treaty of Amsterdam
- 1998 Good Friday Agreement
- 2002 Abortion: exclusion of suicide

Obviously these are missing here too.

