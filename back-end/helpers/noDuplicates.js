/**  =====================================================  
*                 filteredNestedDuplicates
*    =====================================================
 
*   Takes in an array of arrays and flattens it into a 
*   single array of non duplicated Objects.

*   @param   {Array} list - An array of arrays.  
*   @returns {Array} data - An array of Objects.
*   [[{2},{3},{5}],[{1},{2}],[{5}]] ->>> [{1},{2},{3},{5}]
**/

const filteredNestedDuplicates = list => {
  if (list === undefined) {
    return 'No data found with the current id.!'
  }

  if (list.id) {
    return [list]
  }

  if (!list.length) {
    return []
  }

  let data = {}
  let flat = []

  list.forEach(arr => {
    if (!arr.length) {
      flat = [...flat, arr]
    } else {
      flat = [...flat, ...arr]
    }
  })
  flat.forEach(item => {
    if (!data[item.id]) {
      data[item.id] = item
    }
  })
  return Object.values(data)
}

module.exports = { filteredNestedDuplicates }
