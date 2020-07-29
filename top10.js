const tops = () => {
  const users = getUsers()
  let allPrefProducts = users.reduce((acc, rec) => {
    let userPreferences = getPreferences(rec.id)
    if (userPreferences.length < 5) {
      for (let productId of getGender(rec.gender)) {
        if (!userPreferences.includes(productId) && userPreferences.length < 5) {
          userPreferences = [...userPreferences, productId]
        }
      }
    }
    acc = [...acc, ...userPreferences]
    return acc
  }, [])

  const res = allPrefProducts.reduce((acc, rec) => {
    acc[rec] = (acc[rec] || 0) + 1;
    return acc;
  }, {})  
  return Object.keys(res).sort((a, b) => res[b] - res[a]).slice(0, 10)

}


Есть 3 ф-ии:

1) getUsers() - асинхронная ф-я, итоговые выходные данные - массив объектов пользователей;
пример объекта пользователя 
{
  id: number, 
  gender: number, (0 - female, 1-male),
  ..... остальные данные не важны для контекста задачи
}

2) getPreferences(userID) - асинхронная ф-я, итоговые выходные данные - массив предпочтительных товаров данного пользователя (от 0 до 5 эл.), в массиве значения не повторяются;
Пример:
[id, id, id, ...], в случае 0 эл-в - [], id - численно-буквенный

3) getGenderPreferences(gender) - асинхронная ф-я, итоговые выходные данные - массив предпочтительных товаров по половому признаку (строго 5 эл.), в массиве значения не повторяются;
Пример:
[id, id, id, ...], в случае 0 эл-в - [], id - численно-буквенный

Задача:
Написать ассинхронную ф-ю, итоговые выходные данные которой -  массив из топ-10 товаров по следующей логике:

1) топ формируется исходя из наиболее частого вхождения товаров в списки предпочтения пользователей;

2) учитываются строго 5 товаров из списка предпочтения пользователя;

3) в случае если у пользователя в предпочтениях менее 5 товаров его список дополняется товароми из списка топ товаров по гендерной пренадлежности. В итоговом списке предпочтений пользователя не должно быть повторений;

4) в случает нехватки товаров в предпочтениях пользователя после 3-го пункта данный пользователь не участвует в формировании выборки;


Важно - максимально понятный код, но до примитивизма доходить не нужно

// для теста
const getPreferences = (id) => {
  if (id === 1) {
    return [1, 2, 3, 4]
  }
  return [1, 6, 7]
}
const getGender = (gender) => {
  if (gender === 1) {
    return [2, 3, 4, 5,8]
  }
  return [3, 4, 5, 6, 7,]
}
const getUsers = () => {
  return [{ id: 1, gender: 0 }, { id: 2, gender: 1 }, { id: 3, gender: 1 }]
}


console.log(tops())
