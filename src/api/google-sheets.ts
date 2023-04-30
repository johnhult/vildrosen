import { GoogleSpreadsheet } from 'google-spreadsheet';
import { Request, Response } from 'express';

interface SheetRequest extends Request {
  query: {
    childsName: string;
    childsBirthday: string;
    parent1: string;
    parent2: string;
  };
}

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

export default async function handler(req: SheetRequest, res: Response) {
  try {
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
    const { childsName, childsBirthday, parent1, parent2 } = req.query;

    await doc.useServiceAccountAuth(
      {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/gm, '\n'),
      },
      'john.hult@vildrosen.nu'
    );

    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];
    await sheet.loadHeaderRow();
    sheet.setHeaderRow(['a']);

    // for (const key of headerKeys) {
    //   console.log(key);
    // }

    // await sheet.insertDimension(
    //   'ROWS',
    //   {
    //     startIndex: 1,
    //     endIndex: 2,
    //   },
    //   false
    // );

    await doc.sheetsByIndex[0].addRow({ 'Barnets namn': childsName });

    res.status(200).json({
      message: 'A ok!',
      total: 0,
      data: { title: 'we did it' },
    });
  } catch (error) {
    res.status(500).json(error);
  }
}
