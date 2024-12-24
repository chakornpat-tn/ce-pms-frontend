import React from 'react'
import progressReportStatus from '@/constants/progressReport/status'

const ProgressReportStatusBadge = ({ status }: { status: number }) => {
  const getStatusColor = () => {
    switch (status) {
      case progressReportStatus.WAITING:
        return { backgroundColor: '#FEF3C7', color: '#D97706' }
      case progressReportStatus.SEEN:
        return { backgroundColor: '#E0E7FF', color: '#4F46E5' }
      case progressReportStatus.REPLIED:
        return { backgroundColor: '#D1FAE5', color: '#059669' }
      default:
        return { backgroundColor: '#F3F4F6', color: '#6B7280' }
    }
  }

  const getStatusText = () => {
    switch (status) {
      case progressReportStatus.WAITING:
        return 'รอตรวจ'
      case progressReportStatus.SEEN:
        return 'อ่านแล้ว'
      case progressReportStatus.REPLIED:
        return 'ตอบกลับแล้ว'
      default:
        return 'ไม่ระบุ'
    }
  }

  return (
    <span
      style={getStatusColor()}
      className="inline-flex rounded-full px-2 py-1 text-base"
    >
      {getStatusText()}
    </span>
  )
}

export {ProgressReportStatusBadge}