import { GlobalState } from "little-state-machine";

export async function createEntry(data: GlobalState, pdf: File) {
    const { firstName, lastName } = data.sections.personalDetails;

    let formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("pdf", pdf, `${firstName}-${lastName}-application.pdf`);

    const response = await fetch(`/api/submitrecruitmentform`, {
        method: 'POST',
        body: formData,
    });

    return await response.json();
}