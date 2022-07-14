import * as fs from 'fs';
import { Parser } from 'json2csv';

class FileHelper {
  async dump(json, name) {
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(JSON.parse(JSON.stringify(json)));
    await fs.promises.writeFile(`dumbs/${name}.csv`, csv);
  }
}

export default new FileHelper();
