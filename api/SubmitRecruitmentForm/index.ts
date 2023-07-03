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

    return await fetch(url, options)
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
    
    const { fields, files } = await parseMultipartFormData(req);
    const firstName = fields.filter(field => field.name === "firstName")[0].value ?? "unassigned";
    const lastName = fields.filter(field => field.name === "lastName")[0].value ?? "unassigned";

    let pdfFile = files.filter(file => file.name === "pdf")[0];
    let cvFile = files.filter(file => file.name === "cv")[0];

    await fs.writeFile(path.join(os.tmpdir(), pdfFile.filename), pdfFile.bufferFile);

    if(cvFile) {
        await fs.writeFile(path.join(os.tmpdir(), cvFile.filename), cvFile.bufferFile);
    }

    const content = await fs.readFile(path.join(os.tmpdir(), pdfFile.filename));
    const contentCV = cvFile ? await fs.readFile(path.join(os.tmpdir(), cvFile.filename)) : null;

    const itemId = await createItem(firstName, lastName);

    let formResponse;
    let cvResponse;

    try {
        formResponse = await sendFile(content, pdfFile.filename, itemId, "files");
    } catch (error) {
        context.res = {
            body: "Error sending Application Form to monday.com",
        };
    }

    if(contentCV !== null) {
        try {
            cvResponse = await sendFile(contentCV, cvFile.filename, itemId, "files6");
        } catch (error) {
            context.res = {
                body: "Error sending CV to monday.com",
            };
        }
    } else {
        cvResponse = { ok: true };
    }

    if(formResponse.ok && cvResponse.ok) {
        context.res = {
            body: "SUCCESS",
        };
    } else {
        context.res = {
            body: "Something went wrong with the upload",
        };
    }   
}

export default httpTrigger;