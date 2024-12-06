export interface PayloadAttachmentType {
    originalFileName?: string
    status?: string
    id?: string
}

export interface PayloadTrainingType {
    description: string
    version: string
    files: string[]
}

export interface PayloadABTest {
    id: string
    service_id: string
    question: string
    rec_by: string
}

export interface PayloadChangeStatusABTest {
    id: string
    status: "NEW" | "IN_QUEUE" | "TESTED" | "CORRECTED" | "IGNORED" | "TRAINED"
    mod_by: string
}

export interface PayloadUnanswered {
    id: string
    status: "NEW" | "IGNORED",
    mod_by: string
}