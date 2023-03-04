export interface ArrStatus {
    statusId: number,
    statusName: string,
    alias: string,
    deleted: boolean
}
export interface ArrPriority {
    priorityId: number,
    priority: string,
    description: string,
    deleted: boolean,
    alias: string
}
export interface ArrTypeTask {
    id: number,
    taskType: string
}
export interface ArrUserByProjectId {
    userId: number,
      name: string,
      avatar: string,
      email: string,
      phoneNumber: string
}