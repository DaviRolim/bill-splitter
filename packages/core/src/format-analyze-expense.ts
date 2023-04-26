import {
  AnalyzeExpenseCommandOutput,
} from "@aws-sdk/client-textract";

interface ParsedItem {
  [key: string]: string | number;
}

interface ParsedList extends Array<ParsedItem> {}

interface ResponseBody {
  total: number;
  items: ParsedList;
}

export const AnalyzeExpenseFormatter = (
  expenseOutput: AnalyzeExpenseCommandOutput
): ResponseBody => {
  const doc = expenseOutput.ExpenseDocuments![0];
  // console.log(doc.LineItemGroups);
  const group = doc.LineItemGroups![0];
  const itemList: ParsedList = [];
  for (const item of group.LineItems!) {
    let parsedItem: ParsedItem = {};
    for (const field of item.LineItemExpenseFields!) {
      if (field.Type!.Text === "EXPENSE_ROW") continue;
      let type = field.Type!.Text!.toLowerCase();
      parsedItem[type] = field.ValueDetection!.Text as string;
    }
    itemList.push(parsedItem);
  }

  function stringFieldsToNumeric(obj: any): ParsedItem {
    const newObj: ParsedItem = {};
    for (let key in obj) {
      if (!isNaN(parseFloat(obj[key].replace(",", ".")))) {
        newObj[key] = parseFloat(obj[key].replace(",", "."));
      } else {
        newObj[key] = obj[key];
      }
    }
    return newObj;
  }
  const parsedList: ParsedList = itemList.map((item) =>
    stringFieldsToNumeric(item)
  );
  const totalValue: number = parsedList.reduce(
    (acc: number, item: ParsedItem) => acc + (item.price as number),
    0
  );
  const responseBody: ResponseBody = {
    total: totalValue,
    items: parsedList,
  };
  return responseBody;
};
