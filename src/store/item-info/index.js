import { useState, useEffect } from "react";

const ItemInfo = ({ id, onDataLoaded }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
        const data = await response.json();
        onDataLoaded(data.result);
      } catch (error) {
        console.error('Error fetching item data:', error);
      }
    };

    fetchData();
  }, [id, onDataLoaded]);

  // Возвращаем null или другой компонент заглушки при загрузке данных
  return null;
};

export default ItemInfo;