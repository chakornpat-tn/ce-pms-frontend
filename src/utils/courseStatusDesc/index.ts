import courseStatus from "@/constants/course/courseStatus"
export const CourseStatusDesc = (status:number) => {
    switch(status) {
        case courseStatus.PreProject:
            return 'นำเสนอหัวข้อโครงงาน'
        case courseStatus.ApprovePreExam:
            return 'อนุมัติสอบหัวข้อโครงงาน'
        case courseStatus.PassPre:
            return 'ผ่านการสอบหัวข้อโครงงาน'
        case courseStatus.Project:
            return 'ดำเนินโครงงาน'
        case courseStatus.ApproveProjectExam:
            return 'อนุมัติสอบโครงงาน'
        case courseStatus.Pass:
            return 'ผ่านโครงงาน'
        case courseStatus.Fail:
            return 'ไม่ผ่านโครงงาน'
        default:
            return 'สถานะไม่ทราบ'
    }
}
