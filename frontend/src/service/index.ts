import { GlobalState } from "little-state-machine";

export async function createEntry(data: GlobalState, pdf: File, cv: File | null) {
    const { firstName, lastName, email } = data.sections.personalDetails;

    let formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("pdf", pdf, `${firstName}-${lastName}-application.pdf`);
    cv && formData.append("cv", cv, `${firstName}-${lastName}-cv.${cv.name.split('.').pop()}`);

    const response = await fetch(`/api/submitrecruitmentform`, {
        method: 'POST',
        body: formData,
    });
    
    return await response.text();
}