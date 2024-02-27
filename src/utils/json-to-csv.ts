import { json2csv } from 'json-2-csv';

async function jsonToCsv(data: Object[]): Promise<void> {
    json2csv(data);
}

export default jsonToCsv;