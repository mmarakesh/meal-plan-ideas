import { useEffect, useState } from 'react';
import './App.css';
import MyList from './MyList';
import MyMealAndIngredients from './MyMealAndIngredients';
import uuid from 'react-uuid';

function App() {
  const[mealPlans, setMealPlans] = useState(
    localStorage.mealPlans ? JSON.parse(localStorage.mealPlans) : []); /*все что мы планируем будет добавляться в массив*/ 
  const[selectedDay, setSelectedDay] = useState(false) /*меняем цвет выбранной заметки */

  useEffect(() => {
    localStorage.setItem("mealPlans", JSON.stringify(mealPlans))
  }, [mealPlans])
  
  const addMeal = () => {
    const newMeal = {    /*у каждой заметки по меню будут определенные хар-ки поэтому заносим их в обьект */
    title: "Today is...",
    id: uuid(), /*теперь можем удалить каждый элемент по-отдельности */
    mealForADay: "", /*для первого поля textarea */
    ingredients: ""  /*для второго поля textarea */
  }
  setMealPlans([newMeal, ...mealPlans]); /*добавляем новую заметку в массив, оставляя содержимое */
  console.log(newMeal);
  }

  const deleteDay = (mealId) => {
    setMealPlans(mealPlans.filter(({id}) => id !== mealId))
  }

  const updateDay = (myUpdatedMeal) => {
    const updatedMeals = mealPlans.map((mealPlan) => {
      if (mealPlan.id === myUpdatedMeal.id) {
        return myUpdatedMeal;
      }
      return mealPlan;
    })
    setMealPlans(updatedMeals)
  }

    const getActiveMeal = () => {
      return mealPlans.find(({id}) => id === selectedDay)
    }
  return (
    <div className="App">
    <MyList 
    mealPlans={mealPlans} 
    addMeal={addMeal} 
    deleteDay={deleteDay}
    selectedDay={selectedDay}
    setSelectedDay={setSelectedDay}
    />
    <MyMealAndIngredients 
    selectedDay={getActiveMeal()}
    updateDay={updateDay}
    />
    </div>
  );
}

export default App;
