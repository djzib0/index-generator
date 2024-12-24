import ExcelJS from 'exceljs'

const testArr = [];

const workbook = new ExcelJS.Workbook()
await workbook.xlsx.readFile("public/static/excel/test.xlsx")
const ws =  workbook.worksheets[0]
ws.eachRow((row, rowNumber) => {
  const cellValue = row.getCell(1).value // column A
  console.log(`Row ${rowNumber}, Column A: ${cellValue}`)
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  testArr.push(cellValue)
})

const funnyArr = testArr.map((item) => {
  return (
    <p key={item}>{item}</p>
  )
})

export {funnyArr}