# Peakon - Manager Search

## Task

This project was created to implement a simple text input that allows users to search through a list of managers fetched from a provided endpoint, as well as a few minor (bonus point) tasks. I have completed all functional and UI related tasks listed, including the "bonus point" tasks. It is mentioned in the task that the solution should be basically production ready and I believe that my solution also fulfils that requirement.

## Contents

I have chosen to use React, Typescript, MobX and styled components to complete the Manager Live Search task. These are the frameworks I feel most comfortable using as I use them everyday and they are adequate to complete the task, aswell as able to scale should I need to add to the project at a later stage. If you are not familiar with MobX I implore you to look over their documentation:https://mobx.js.org/the-gist-of-mobx.html. MobX allows me to keep 95% of the functionality outside of the components; leaving components to only deal with passing variables and functions to the relevent child components, dealing with its' lifecycle and UI arragement.

If the task required more inputs I would consider using a library like Formik, but given there was only one field this would have been over kill. Similarly if more than one page was required I would have used react-router but given it was a single page application I did not implement any routing functionality.

I have tried to keep the code and file structures neat; separating and grouping things where possible, condensing down code whilst still allowing it to be intuitively readable.

## Notes

The solution allows for the manager list to be navigated by use of the 'Enter' and 'Arrow' keys, but I was unable to force the list to scroll correctly upon navigating with the arrow keys. I began a solution for this but was unable to complete it, I have left some code in the 'list.tsx' file, if you uncomment it you can see it almost working. I also didnt spend much time trying to implement an up/down arrow icon within the input field as shown in the task

## Things to improve upon next time

1. I would like to figure out my own solution to the scroll issue I noted above.
2. Give myself more time to write the unit tests, this was a new topic for me and this is definitely something I need to work on going forward. I wrote some simple tests which I hope will display some understanding, also my use of Typescript negates some of the usual test requirements.

## Get started

Just clone the repo and hit 'yarn start' ;)
