'use strict'

const parseTableList = (pageList, className) => {
  const table = getTableForClass(pageList, className)
  const itemsList = createItemsList(table, className)
  return {
    itemsList: itemsList
  }
}

const getTableForClass = (pageList, className) => {
  // The first row, first cell ClassName should match the passed in className
  const resultTable = {
    rowsList: []
  }
  for (let pageIdx in pageList) {
    const page = pageList[pageIdx]
    for (let tableIdx in page.TableList) {
      const tableList = page.TableList[tableIdx]
      const firstRow = tableList.RowList[0]
      const firstCell = firstRow.CellList[0]
      const firstCellHeader = firstCell.CellHeaderAttributes[0]
      if (!!firstCellHeader && !!firstCellHeader.ClassName && firstCellHeader.ClassName.toUpperCase() === className.toUpperCase()) {
        resultTable.rowsList = tableList.RowList
      }
    }
  }
  return resultTable
}

const createItemsList = (table, itemIdentifier) => {
  let resultList = []
  let itemPropsList = []

  for (let rowIdx in table.rowsList) {
    let row = table.rowsList[rowIdx]
    let item = {}
    let validItem = true
    for (let cellIdx in row.CellList) {
      let cell = row.CellList[cellIdx]
      // set the prototype object for each item
      if (!!cell.CellHeaderAttributes && cell.CellHeaderAttributes.length > 0) {
        for (let chAttribIdx in cell.CellHeaderAttributes) {
          let chAttrib = cell.CellHeaderAttributes[chAttribIdx]
          itemPropsList.push(chAttrib.ClassName)
        }
        validItem = false
      } else { // the real cell value entries
        // check the cell entries match the prototype for the item
        if (row.CellList.length === itemPropsList.length || (row.CellList.length + 1) === itemPropsList.length) {
          if (cell.LineList.length > 0) {
            for (let lineIdx in cell.LineList) {
              let line = cell.LineList[lineIdx]
              let fullWord = ''
              if (!!line.WordList && line.WordList.length > 0) {
                for (let wordIdx in line.WordList) {
                  let word = line.WordList[wordIdx]
                  fullWord += word.WordValue + ' '
                }
              } else {
                fullWord = 'NULL'
              }
              if (row.CellList.length === itemPropsList.length) {
                item[itemPropsList[cellIdx]] = fullWord
              } else { // special case of Labor item with no SKU
                let targetIdx = (new Number(cellIdx) + 1)
                item[itemPropsList[targetIdx]] = fullWord
              }
            }
          } else {
            item[itemPropsList[cellIdx]] = 'NULL'
          }
        } else { // any other entries are just not any recognisable structure
          validItem = false
        }
      }
    }
    if (validItem) {
      resultList.push(item)
    }
  }
  return resultList
}

module.exports = {
  parseTableList: parseTableList
}