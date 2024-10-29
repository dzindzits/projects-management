const form = document.querySelector("form");
const input = form.querySelector("input");
const category = form.querySelector("select");
const submit = form.querySelector("button");
const filter = document.querySelector("select");

const list = [
  { task: "Complete project report", category: "Work" },
  { task: "Schedule team meeting", category: "Work" },
  { task: "Buy groceries", category: "Personal" },
  { task: "Workout at the gym", category: "Personal" },
  { task: "Prepare presentation slides", category: "Work" },
  { task: "Clean the house", category: "Personal" },
  { task: "Respond to client emails", category: "Work" },
  { task: "Plan weekend trip", category: "Personal" },
];

const categories = ["Work", "Personal", "All"];

let i = 0;

const taskInterval = setInterval(() => {
  if (i < list.length) {
    input.value = list[i].task;
    let event = new Event("change", { bubbles: true });
    event.simulated = true;
    let tracker = input._valueTracker;
    if (tracker) {
      tracker.setValue("");
    }
    input.dispatchEvent(event);
    category.value = list[i].category;
    event = new Event("change", { bubbles: true });
    event.simulated = true;
    tracker = category._valueTracker;
    if (tracker) {
      tracker.setValue("");
    }
    category.dispatchEvent(event);
    submit.click();
    i++;
  } else {
    clearInterval(taskInterval);

    i = 0;
    const filterInterval = setInterval(() => {
      if (i < categories.length) {
        filter.value = categories[i];
        let event = new Event("change", { bubbles: true });
        event.simulated = true;
        let tracker = filter._valueTracker;
        if (tracker) {
          tracker.setValue("");
        }
        filter.dispatchEvent(event);
        i++;
      } else {
        clearInterval(filterInterval);
      }
    }, 1000);
  }
}, 1000);
