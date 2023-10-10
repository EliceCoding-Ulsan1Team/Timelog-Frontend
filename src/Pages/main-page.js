import Todo from './Components/Todo/todo';
import Calendar from './Components/Calendar/calendar';
import Category from './Components/Category/category';

function App() {
  return (
    <div className='container'>
      <div className='todo'>
        <Todo />
      </div>
      <div className='calendar'>
        <Calendar />
      </div>
      <div className='category'>
        <Category />
      </div>
    </div>

  );
}
export default App;