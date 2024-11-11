# To-Do List
- This is a To Do List website. I developed it a little more than the normal project. I added a date feature to the jobs to be done. For example: you entered a job to be done and then you need to enter an end date. Then I took this end date and converted it to milliseconds and then I took today's date and converted it to milliseconds, then I subtracted today's date from the end date and found the remaining time. Then I converted the remaining time to days and added it to the htm. Of course, not only that, but I also added a countdown to them. If the user does not mark the work to be done as completed until this countdown is over, when the countdown is over, the work to be done is deleted from the list and falls into the red zone, that is, the Fail List and is crossed out. I set the counter to 10 seconds so that users can see this. So I set it so that the number of days decreases by 1 day in 10 seconds. In addition to this, I made a green zone. Here, the todos marked as completed appear. Completed jobs are set to be displayed both in the main list and in the green zone. The user can delete the completed ones by clicking the clear completed button from the main list, but not from the green zone. There are 2 filtering buttons under the jobs to be done. All button shows all todos while Active button lists incomplete todos. Completed button marks the selected todo as completed but the todos marked as completed cannot be changed again. In addition, when you hover over the work to be done, the delete button appears on the right, when you click this button, the work to be done is deleted and the red zone is marked as canceled. There is a theme change button and the user can use it in light mode or dark mode.

**Note: In order to test or operate on this project, you need to extract the db.json file in /api' locally.**

### Screen Shot

![Screen Shot](./assets/images/Ekran%20Alıntısı.png)
![Screen Shot](./assets/images/Ekran%20Alıntısı1.png)
![Screen Shot](./assets/images/Ekran%20Alıntısı2.png)

### Links

- Site Url: [To-Do-List](https://to-do-list-new.vercel.app/)

### Challenge

Users should be able to:

- Display the optimal layout for the app based on the screen size of their device
- See hover states for all interactive elements on the page
- Add new to-dos to the list
- Mark to-dos as completed
- Delete to-do items from the list
- Filter by all/active/completed todos
- Clear all completed to-dos
- Switching light and dark mode
- Bonus\*\*\*: Drag and drop to reorder items in the list

### Overview

- Javascript codes are written in ifee functions. People who will add or develop later should pay attention.
- Responsive design is available and the image does not deteriorate on different devices.
- Css codes are written in scss. The person who will add or develop should compile the style.scss file.
- Js and CSS codes are written modularly.

### Built with

- HTML5
- CSS
- Flexbox
- SCSS
- Mobile Design
- JavaScript

### What I learned
This section contains some new information that I learned while creating this project. First of all, I didn't know how to use the validate operation in such an organized and shortened way, I searched and saw it and it was very useful for me. I also saw the drag and drop operation and tried to apply it, that is, drag and drop items. For now, I only managed to drag the item above down, the items below are not dragged up, but I think I will solve this problem in other projects.

```html
 <li draggable="true" class="js-todo ${data.status}" data-id="${data.id}"><li>
```

```js
const validationRules = [
  {
    func: validate.checkEmpty,
    field: todoInputValue,
    message: validationMessages.emptyInput,
  },
  {
    func: validate.checkEmpty,
    field: dateInputValue,
    message: validationMessages.emptyInput,
  },
  {
    func: validate.checkPastDate,
    params: [enteredDate, todayDate],
    message: validationMessages.pastDate,
  },
  {
    func: validate.checkFormat,
    field: todoInputValue,
    message: validationMessages.invalidFormat,
  },
];

const _dragStart = function (e) {
  draggedItem = e.target;

  e.dataTransfer.setData("text/plain", draggedItem.textContent);
};
const _dragOver = function (e) {
  e.preventDefault();
};
const _drop = function (e) {
  e.preventDefault();

  if (e.target.tagName === "li") {
    const droppedItem = e.target;
    todoList.insertBefore(draggedItem, droppedItem);
  } else {
    todoList.appendChild(draggedItem);
  }
};
```

## Installation

1. Copy the Project
   First, clone the project from GitHub to copy it to your local computer:

```bash
git clone https://github.com/Brkcnulusy/To-Do-List.git
cd To-Do-List

```

2. Install Dependencies
   It does not have any affiliation. The project is written in vanilla.js.

3. Run the Application
   If you have the Live Server extension installed, you can open the html file by right clicking on it and selecting the first option Open with Live Server.
   If you do not have the Live Server extension, you can start using the application by typing npm run dev in the terminal and going to http://localhost:3000 in your browser.

## Author

- Website - [Burak Can Ulusoy](https://mavifloravakfi.com/)
- LinkedIn - [@Brkcnulusy](https://www.linkedin.com/in/burak-can-ulusoy-375120272/)
- GitHub - [@Burakcnulusy](https://github.com/Brkcnulusy/)
- E-Mail - [brkcnulusy@gmail.com]

## Acknowledgements

I saw this project on the site called frontend mentor and decided to do it. The site shared with me the design pictures required for the project and the image files I need to use on the site. Thank you to the Frontend Mentor Team.
