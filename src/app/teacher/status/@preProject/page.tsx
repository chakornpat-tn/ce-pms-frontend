'use client'
import { useState, useEffect, SetStateAction, Dispatch } from 'react'
import {
  DeleteProjectStatus,
  ListProjectStatus,
  UpdateProjectStatus,
} from '@/actions/projectStatus'
import useSWR from 'swr'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import { Loader } from '@/components/Loading'
import { ProjectStatus } from '@/models/ProjectStatus'
import { toast } from 'sonner'
import { ProjectStatusBadge } from '@/components/Badge'

const PreProject: React.FC = () => {
  const { data, mutate, isLoading } = useSWR(
    '/v1/project-status?course=1',
    () => ListProjectStatus({ course: 1 }),
  )

  const [tableData, setTableData] = useState<ProjectStatus[]>(data || [])
  const [draggingRowIndex, setDraggingRowIndex] = useState<number | null>(null)
  const [isAddingNewStatus, setIsAddingNewStatus] = useState(false)
  const [editingRowId, setEditingRowId] = useState<number | null>(null)
  const [editingStatus, setEditingStatus] = useState<ProjectStatus | null>(null)
  const [newStatus, setNewStatus] = useState<ProjectStatus>({
    name: '',
    textColor: '#000000',
    bgColor: '#FFFFFF',
    isActive: false,
    course: 1,
  })

  useEffect(() => {
    if (data) {
      setTableData(data)
    }
  }, [data])

  const handleDragAndDrop = async (updatedData: ProjectStatus[]) => {
    setTableData(updatedData)
    try {
      await UpdateProjectStatus(updatedData)
      await mutate()
    } catch (error) {
      toast.error('เกิดข้อผิดพลาดในการอัปเดตข้อมูล')
      mutate()
    }
  }

  const handleDragStart = (index: number) => {
    setDraggingRowIndex(index)
  }

  const handleDragOver = (
    event: React.DragEvent<HTMLTableRowElement>,
    index: number,
  ) => {
    event.preventDefault()
    if (draggingRowIndex === null || draggingRowIndex === index) return

    const updatedData = [...tableData]
    const [draggedRow] = updatedData.splice(draggingRowIndex, 1)
    updatedData.splice(index, 0, draggedRow)

    handleDragAndDrop(updatedData)
    setDraggingRowIndex(index)
  }

  const handleDragEnd = () => {
    setDraggingRowIndex(null)
  }

  const handleStatusManagement = async (
    action: 'add' | 'update' | 'delete',
    data?: ProjectStatus | ProjectStatus[],
  ) => {
    try {
      switch (action) {
        case 'add':
          if (data) {
            await UpdateProjectStatus([...tableData, data as ProjectStatus])
          }
          break
        case 'update':
          if (data) {
            await UpdateProjectStatus(data as ProjectStatus[])
          }
          break
        case 'delete':
          if (typeof data === 'number') {
            await DeleteProjectStatus(data)
          }
          break
      }
      await mutate()
    } catch (error) {
      toast.error('เกิดข้อผิดพลาดในการดำเนินการ')
      await mutate()
    }
  }

  const handleAddRowStart = () => setIsAddingNewStatus(true)

  const handleCancelAddRow = () => {
    setIsAddingNewStatus(false)
    setNewStatus({
      name: '',
      textColor: '#000000',
      bgColor: '#FFFFFF',
      isActive: false,
      course: 1,
    })
  }

  const handleConfirmAddRow = async () => {
    if (!newStatus.name.trim()) {
      toast.error('กรุณากรอกชื่อสถานะ')
      return
    }

    await handleStatusManagement('add', newStatus)
    handleCancelAddRow()
  }

  const handleDeleteRow = async (id?: number) => {
    if (!id) return
    await handleStatusManagement('delete', id as unknown as ProjectStatus)
  }

  const handleStatusChange = (
    setter: React.Dispatch<React.SetStateAction<ProjectStatus | null>>,
    field: keyof ProjectStatus,
    value: string | boolean,
  ) => {
    setter(prev => ({
      ...prev!,
      [field]: value,
    }))
  }

  const startEditRow = (row: ProjectStatus) => {
    if (!row.id) return
    setEditingRowId(row.id)
    setEditingStatus({ ...row })
  }

  const handleConfirmEdit = async () => {
    if (!editingStatus?.name.trim()) {
      toast.error('กรุณากรอกชื่อสถานะ')
      return
    }

    const updatedTableData = tableData.map(row =>
      row.id === editingRowId ? { ...editingStatus } : row,
    )

    await handleStatusManagement('update', updatedTableData)
    setEditingRowId(null)
    setEditingStatus(null)
  }

  const handleCancelEdit = () => {
    setEditingRowId(null)
    setEditingStatus(null)
  }

  const handleUpdateIsActive = async (id: number, isActive: boolean) => {
    const updatedRowIndex = tableData.findIndex(row => row.id === id)
    if (updatedRowIndex === -1) return

    const updatedTableData = [...tableData]
    updatedTableData[updatedRowIndex].isActive = isActive
    await handleStatusManagement('update', updatedTableData)
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader />
      </div>
    )
  }

  return (
    <section className="relative overflow-x-auto w-full bg-white px-4 shadow-md sm:rounded-md">
      <article>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="divide-y bg-gray-50">
              <tr>
                {[
                  'ลำดับ',
                  'สถานะ',
                  'สีข้อความ',
                  'สีพื้นหลัง',
                  'เปิดใช้งาน',
                  '',
                ].map((header, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:text-base"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {tableData.map((row, index) =>
                editingRowId === row.id ? (
                  <EditableRow
                    key={row.id}
                    index={index}
                    row={editingStatus}
                    onStatusChange={(field, value) =>
                      handleStatusChange(setEditingStatus, field, value)
                    }
                    onConfirm={handleConfirmEdit}
                    onCancel={handleCancelEdit}
                  />
                ) : (
                  <DraggableRow
                    key={row.id}
                    index={index}
                    row={row}
                    draggingRowIndex={draggingRowIndex}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                    onEdit={startEditRow}
                    onDelete={handleDeleteRow}
                    onUpdateIsActive={handleUpdateIsActive}
                  />
                ),
              )}

              {isAddingNewStatus && (
                <EditableRow
                  index={tableData.length}
                  row={newStatus}
                  onStatusChange={(field, value) =>
                    handleStatusChange(
                      setNewStatus as Dispatch<
                        SetStateAction<ProjectStatus | null>
                      >,
                      field,
                      value,
                    )
                  }
                  onConfirm={handleConfirmAddRow}
                  onCancel={handleCancelAddRow}
                />
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center">
          {!isAddingNewStatus && (
            <button
              onClick={handleAddRowStart}
              className="mb-4 mt-2 rounded-md bg-primary2-400 px-4 py-2 text-white hover:bg-primary2-500"
            >
              <AddIcon />
            </button>
          )}
        </div>
      </article>
    </section>
  )
}

const EditableRow: React.FC<{
  index: number
  row: ProjectStatus | null
  onStatusChange: (field: keyof ProjectStatus, value: string | boolean) => void
  onConfirm: () => void
  onCancel: () => void
}> = ({ index, row, onStatusChange, onConfirm, onCancel }) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onConfirm()
    }
  }
  return (
    <tr className="bg-gray-50">
      <td className="whitespace-nowrap px-6 py-4">{index + 1}</td>
      <td className="whitespace-nowrap px-6 py-4">
        <input
          type="text"
          value={row?.name || ''}
          onChange={e => onStatusChange('name', e.target.value)}
          placeholder="ชื่อสถานะ"
          onKeyDown={handleKeyDown}
          className="w-full rounded-md border px-1 py-1"
        />
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <input
          type="color"
          value={row?.textColor || '#000000'}
          onChange={e => onStatusChange('textColor', e.target.value)}
          className="mr-2"
        />
        {row?.textColor}
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <input
          type="color"
          value={row?.bgColor || '#FFFFFF'}
          onChange={e => onStatusChange('bgColor', e.target.value)}
          className="mr-2"
        />
        {row?.bgColor}
      </td>
      <td className="whitespace-nowrap px-6 py-4"></td>
      <td className="flex gap-2 whitespace-nowrap px-6 py-4">
        <button
          onClick={onConfirm}
          className="rounded-md bg-primary2-400 px-2 py-1 text-white hover:bg-primary2-500"
        >
          ยืนยัน
        </button>
        <button
          onClick={onCancel}
          className="rounded-md bg-red-500 px-2 py-1 text-white hover:bg-red-600"
        >
          ยกเลิก
        </button>
      </td>
    </tr>
  )
}

const DraggableRow: React.FC<{
  index: number
  row: ProjectStatus
  draggingRowIndex: number | null
  onDragStart: (index: number) => void
  onDragOver: (
    event: React.DragEvent<HTMLTableRowElement>,
    index: number,
  ) => void
  onDragEnd: () => void
  onEdit: (row: ProjectStatus) => void
  onDelete: (id?: number) => void
  onUpdateIsActive: (id: number, isActive: boolean) => void
}> = ({
  index,
  row,
  draggingRowIndex,
  onDragStart,
  onDragOver,
  onDragEnd,
  onEdit,
  onDelete,
  onUpdateIsActive,
}) => (
  <tr
    draggable
    onDragStart={() => onDragStart(index)}
    onDragOver={event => onDragOver(event, index)}
    onDragEnd={onDragEnd}
    className={`primary-hover ${draggingRowIndex === index ? 'bg-gray-200' : ''} cursor-grab`}
  >
    <td className="whitespace-nowrap px-6 py-4">{index + 1}</td>
    <td className="whitespace-nowrap px-6 py-4">
      <ProjectStatusBadge bgColor={row.bgColor} textColor={row.textColor} name={row.name} />
    </td>
    <td className="whitespace-nowrap px-6 py-4">
      <div className="flex items-center gap-2">
        <div
          className="h-4 w-4 rounded-full border border-gray-300"
          style={{ backgroundColor: row.textColor }}
        ></div>
        {row.textColor}
      </div>
    </td>
    <td className="whitespace-nowrap px-6 py-4">
      <div className="flex items-center gap-2">
        <div
          className="h-4 w-4 rounded-full border border-gray-300"
          style={{ backgroundColor: row.bgColor }}
        ></div>
        {row.bgColor}
      </div>
    </td>
    <td className="whitespace-nowrap px-6 py-4">
      <div className="flex items-center gap-2">
        <label className="inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            checked={row.isActive}
            className="peer sr-only"
            onChange={e => onUpdateIsActive(row.id!, e.target.checked)}
          />
          <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary2-400 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 rtl:peer-checked:after:-translate-x-full"></div>
        </label>
      </div>
    </td>
    <td className="flex items-center gap-2 whitespace-nowrap px-6 py-4">
      <button
        onClick={() => onEdit(row)}
        className="p-2 text-blue-200 hover:text-blue-600"
      >
        <EditIcon />
      </button>
      <button
        onClick={() => onDelete(row.id)}
        className="p-2 text-red-200 hover:text-red-600"
      >
        <CloseIcon />
      </button>
    </td>
  </tr>
)

export default PreProject
