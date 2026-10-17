const form = document.getElementById('habit-form');
const input = document.getElementById('habit-input');
const list = document.getElementById('habit-list');

let habits = JSON.parse(localStorage.getItem('myHabits')) || [];

function saveHabits(){
    localStorage.setItem('myHabits', JSON.stringify(habits));
}

function displayHabits(){
    list.innerHTML = '';

    habits.forEach(function(habit, index){

        const li = document.createElement('li');
        li.className = 'habit-item';
        if(habit.isDone){
            li.classList.add('completed');
        }

        const textSpan = document.createElement('span');
        textSpan.textContent = habit.name;

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'habit-actions';

        const checkBtn = document.createElement('button');
        checkBtn.className = 'btn-check';
        checkBtn.textContent = habit.isDone ? 'Undo' : 'Done';
        checkBtn.onclick = function() {
            toggleHabit(index);
        };

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn-delete';
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = function(){
            deleteHabit(index);
        };

        actionsDiv.appendChild(checkBtn);
        actionsDiv.appendChild(deleteBtn);
        li.appendChild(textSpan);
        li.appendChild(actionsDiv);
        list.appendChild(li);
    });
}

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const habitName = input.value.trim();
    if (habitName === '') return;

    habits.push({ name: habitName, isDone: false });
    saveHabits();
    displayHabits();
    input.value = '';
});

function toggleHabits(index){
    habits[index].isDone = !habits[index].isDone;
    saveHabits();
    displayHabits();
}

function deleteHabit(index){
    const confirmDelete = confirm("Are you sure you want to delete this habit?");
    if(confirmDelete){
        habits.splice(index, 1);
        saveHabits();
        displayHabits();
    }
}

displayHabits();
