import ExcelJS from 'exceljs'

const materialsArr = [];
const materialClassesArr = [];

const workbook = new ExcelJS.Workbook()
await workbook.xlsx.readFile("public/static/excel/test.xlsx")
const ws =  workbook.worksheets[0]
ws.eachRow((row, rowNumber) => {
  const cellValue = row.getCell(1).value // column A
  console.log(`Row ${rowNumber}, Column A: ${cellValue}`)
  materialsArr.push(cellValue)
});

ws.eachRow((row, rowNumber) => {
  const cellValue = row.getCell(2).value // column B
  console.log(`Row ${rowNumber}, Column A: ${cellValue}`)
  materialClassesArr.push(cellValue)
});


const jsxMaterialsArr = materialsArr.map((item, index) => {
  return (
    <p key={item + index}>{item}</p>
  )
});

const jsxMaterialClassesArr = materialClassesArr.map((item, index) => {
  return (
    <p key={item + index}>{item}</p>
  )
})

export {jsxMaterialsArr, jsxMaterialClassesArr}