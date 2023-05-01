import { AnalyzeExpenseCommandOutput } from "@aws-sdk/client-textract";

type AnalyzedItem = {
  name: string;
  price: number;
  unitPrice: number;
  quantity: number;
};
interface ParsedItem {
  [key: string]: string | number;
}

interface ParsedList extends Array<ParsedItem> {}

interface ResponseBody {
  total: number;
  items: ParsedList;
}

function internalAnalyzedToExternalResponse(analyzedItem: {
  item?: string;
  price?: number;
  unit_price?: number;
  quantity?: number;
}): AnalyzedItem {
  return {
    name: analyzedItem.item ??  "Unknown Item",
    price: analyzedItem.price ?? 0,
    unitPrice: analyzedItem.unit_price ??  0,
    quantity: analyzedItem.quantity ?? 1,
    
  };
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

export const AnalyzeExpenseFormatter = (
  expenseOutput: AnalyzeExpenseCommandOutput
): ResponseBody => {
  const doc = expenseOutput.ExpenseDocuments![0];
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

  const parsedList: ParsedList = itemList.map(stringFieldsToNumeric);
  const totalValue: number = parsedList.reduce(
    (acc: number, item: ParsedItem) => acc + (item.price as number),
    0
  );
  const responseBody: ResponseBody = {
    total: totalValue,
    items: parsedList.map(internalAnalyzedToExternalResponse),
  };
  return responseBody;
};
