import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import parseMultipartFormData from "@anzp/azure-function-multipart";
import * as fs from "fs/promises";
import * as os from "os";
import * as path from "path";

const sendFile = async (file: Buffer, fileName: string, toItem: number, colId: string) => {
    const url = 'https://api.monday.com/v2/file';
    const query = `mutation ($file: File!) {
        add_file_to_column (item_id: ${toItem}, column_id: "${colId}", file: $file) {
            id
        }
    }`;
    const boundary = "xxxxxxxxxxxxxxx";
    let data = "";

    // construct query part
    data += `--${boundary}\r\n`;
    data += `Content-Disposition: form-data; name="query"; \r\n`;
    data += "Content-Type:application/json\r\n\r\n";
    data += `\r\n${query}\r\n`;

    // construct file part
    data += `--${boundary}\r\n`;
    data += `Content-Disposition: form-data; name="variables[file]"; filename="${fileName}"\r\n`;
    data += "Content-Type:application/octet-stream\r\n\r\n";

    const payload = Buffer.concat([
        Buffer.from(data, "utf8"),
        file,
        Buffer.from(`\r\n--${boundary}--\r\n`, "utf8")
    ]);

    const options = {
        method: 'post',
        headers: {
            "Content-Type": `multipart/form-data; boundary=${boundary}`,
            "Authorization": process.env["MONDAY_API_KEY"],
        },
        body: payload,
    };

    await fetch(url, options)
        .then(res => res.json())
        .then(json => console.log(json));

    return;
}

const createItem = async (firstName: string, lastName: string): Promise<number> => {
    const url = 'https://api.monday.com/v2';
    const query = `mutation {
        create_item (board_id: ${process.env["BOARD_ID"]}, item_name: "${firstName} ${lastName}") {
            id
        }
    }`;
    const options = {
        method: 'post',
        headers: {
            "Content-Type": "application/json",
            "Authorization": process.env["MONDAY_API_KEY"],
        },
        body: JSON.stringify({ query }),
    };

    const response = await fetch(url, options).then(res => res.json());
    return response.data.create_item.id;
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    // set filename
    var upfile = 'sample.pdf';

    // set auth token and query
    var API_KEY = process.env["MONDAY_API_KEY"];
    var query = 'mutation ($file: File!) { add_file_to_column (file: $file, item_id: 4534763120, column_id: "files") { id } }';

    // set URL and boundary
    var url = "https://api.monday.com/v2/file";
    var boundary = "xxxxxxxxxx";
    var data = "";
    
    const { fields, files } = await parseMultipartFormData(req);
    const firstName = fields.filter(field => field.name === "firstName")[0].value;
    const lastName = fields.filter(field => field.name === "lastName")[0].value;

    let pdfFile = files.filter(file => file.name === "pdf")[0];

    await fs.writeFile(path.join(os.tmpdir(), pdfFile.filename), pdfFile.bufferFile);

    const content = await fs.readFile(path.join(os.tmpdir(), pdfFile.filename));

    const itemId = await createItem(firstName, lastName);

    await sendFile(content, pdfFile.filename, itemId, "files");

    context.res = {
        body: "Item may have been created and file might of been sent, add error handling to be sure.",
    };
}

export default httpTrigger;