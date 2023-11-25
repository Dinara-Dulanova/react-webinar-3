/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.code = this.state.list.length; //начальное значение кода после добавления
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.code = this.code + 1;
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: this.code, title: 'Новая запись', selectedCount: 0}]
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  /**
   * Выделение записи по коду
   * @param code
   */

   countSelectedClick (item){
    if (item.selected) {
      item.selectedCount = item.selectedCount + 1;
    }
   }

   selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        
        if (item.code === code) {
          item.selected = !item.selected;
          this.countSelectedClick(item);
        }
        else {
          item.selected = false;   //сбрасываем выделения у других записей
        }
        return item;
      })
    })
  }
}

export default Store;
