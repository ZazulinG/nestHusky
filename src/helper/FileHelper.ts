import { Parser } from 'json2csv';

class FileHelper {
  async dump(json) {
    const json2csvParser = new Parser();
    return json2csvParser.parse(JSON.parse(JSON.stringify(json)));
  }
}

export default new FileHelper();
