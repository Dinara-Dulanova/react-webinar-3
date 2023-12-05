import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      list: [],
      cartList: [],
      ...initState,
    };
    this.listeners = []; // Слушатели изменений состояния
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
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: generateCode(), title: 'Новая запись'}]
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          // Смена выделения и подсчёт
          return {
            ...item,
            count:  item.count + 1 || 1,
          };
        }
        // Сброс выделения если выделена
        return item.selected ? {...item, selected: false} : item;
      })
    })
  }

  addItemToCart(code, count) {
    const { cartList, list } = this.state;
    const existingItem = cartList.find(item => item.code === code);

    if (existingItem) {
      const updatedCart = cartList.map(item =>
        item.code === code ? { ...item, count: item.count + count } : item
      );

      this.setState({
        ...this.state ,
        cartList: updatedCart,
      });
    } else {
      const selectedItem = list.find((item) => item.code === code);
      if (selectedItem) {
        this.setState({
          ...this.state,
          cartList: [...cartList, { ...selectedItem, count }],
        });
      }
    }
  }

  removeItemFromCart(code) {
    const updatedCart = this.state.cartList.filter((item) => item.code !== code);
    this.setState({
      ...this.state,
      cartList: updatedCart,
    });
  }
}


export default Store;
