import React from 'react';
import {createElement} from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  
  //const [code, setKey] = useState(1);
  const list = store.getState().list;

  function endingInSelectedCount(selectedCount) { 
    if (selectedCount % 10 === 2 || selectedCount % 10 === 3 || selectedCount % 10 === 4) {
      if (selectedCount % 100 !== 12 && selectedCount % 100 !== 13 && selectedCount % 100 !== 14) { //проверка оканчивается ли число на 12,13, 14
        return "раза";
      }
      else 
        return "раз"
    }
    else 
      return "раз"; 
  }

  function showTitleAndSelectedCount(item) {
    let word = endingInSelectedCount(item.selectedCount);
    
    if (item.selectedCount === 0) {
      return <div className='Item-title'>{item.title}</div>
    } else {
      return <div className='Item-title'>{item.title} | Выделяли {item.selectedCount} {word}</div>
    }
  }

  
  return (
    <div className='App'>
      <div className='App-head'>
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className='App-controls'>
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className='App-center'>
        <div className='List'>{
          list.map(item =>
            <div key={item.code} className='List-item'>
              <div className={'Item' + (item.selected ? ' Item_selected' : '')}
                   onClick={() => store.selectItem(item.code)}>
                <div className='Item-code' >{item.code} </div>
                {showTitleAndSelectedCount(item) }
                <div className='Item-actions'>
                  <button onClick={(e) => {
                   e.stopPropagation();
                   store.deleteItem(item.code); 
                  }
                  }>
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
