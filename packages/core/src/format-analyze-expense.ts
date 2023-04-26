// import { AnalyzeExpenseCommandOutput } from "@aws-sdk/client-textract";

// export const AnalyzeExpenseFormatter = (
//   expenseOutput: AnalyzeExpenseCommandOutput
// ) => {
//   const doc = expenseOutput.ExpenseDocuments![0];
//   // console.log(doc.LineItemGroups);
//   const group = doc.LineItemGroups![0];
//   const itemList = [];
//   for (const item of group.LineItems!) {
//     let parsedItem = {};
//     for (const field of item.LineItemExpenseFields!) {
//       if (field.Type!.Text === "EXPENSE_ROW") continue;
//       let type = field.Type!.Text!.toLowerCase();
//       parsedItem[type] = field.ValueDetection!.Text;
//     }
//     itemList.push(parsedItem);
//   }

//   function stringFieldsToNumeric(obj) {
//     const newObj = {};
//     for (let key in obj) {
//       if (!isNaN(obj[key].replace(",", "."))) {
//         newObj[key] = parseFloat(obj[key].replace(",", "."));
//       } else {
//         newObj[key] = obj[key];
//       }
//     }
//     return newObj;
//   }
//   const parsedList = itemList.map((item) => stringFieldsToNumeric(item));
//   const totalValue = parsedList.reduce((acc, item) => acc + item.price, 0);
//   const responseBody = {
//     total: totalValue,
//     items: parsedList,
//   };
//   console.log("responseBody", responseBody);
// };
