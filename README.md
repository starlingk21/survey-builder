# Survey builder

## Project setup (dev env.)
- `npm i`
- `npm run dev`

## Packages and other used materials
- `Vue3`
- `Typescript`
- `@vueuse/core` - for reactive localStorage
- `sass`

Color combination used from - [color-hex](https://www.color-hex.com/color-palette/1051637)<br/>
Icons downloaded from - [Material Icons](https://pictogrammers.com/library/mdi/)

### Survey builder possibilities
- Create question based on selected type (preselected "Multiple Choice (Single Selection))
- Preview created questions in accordion type list.
- Questions are stored in localStorage, page refresh won't lose the data
- User can open question by clicking on the question field and choose the answer.
- Answers are stored in localStorage
- Answers use RAG Color scale, - to view the color, it's necessary to select an answer.
- Open type questions with textarea also can be filled and data will be stored as an answer in localStorage.
- It shouldn't be possible to post without filling question's textarea (simple validation added - if nothing is typed or only space/s are typed, button will be disabled)
- Responsive design is also sorted, but still needs some improvements, like design in general.
- Roles attributes are added for the elements, so the it should be also available for screen readers (Didn't test though as it was just my idea to quickly add them while creating elements)


### What I would add/improve further.
- Improve design and animations in general.
- Add activity diagram (flowchart) to this README.
- Test with lighthouse and search for optimisation possibilities (already can say it needs to be minified and built for production to be slightly faster)
- Create one layout component so if multiple pages are created, one layout can be reused, to prevent styling issues.
- Add brief description under question types on question creating, so it's more understandable for the user what question type specifically it's gonna be.
- In general survey builder should be capable of updating and deleting them and probably add different types of answers for better flexibility (e.g. checkboxes)
- Would be nice to create more reusable components, e.g. for buttons, textarea, general field types which include title (e.g. "questions list", "Create question")