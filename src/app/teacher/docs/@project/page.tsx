'use client'
import { useState, useEffect, SetStateAction, Dispatch } from 'react'
import useSWR from 'swr'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import { Loader } from '@/components/Loading'
import { toast } from 'sonner'
import {
  DeleteDocument,
  ListDocument,
  UpdateDocument,
} from '@/actions/documents'
import { Document } from '@/models/Document'

const Project: React.FC = () => {
  const { data, mutate, isLoading } = useSWR('/v1/document?=course=2', () =>
    ListDocument({ course: 2 }),
  )

  const [tableData, setTableData] = useState<Document[]>(data || [])
  const [draggingRowIndex, setDraggingRowIndex] = useState<number | null>(null)
  const [isAddingNewDocument, setIsAddingNewDocument] = useState(false)
  const [editingRowId, setEditingRowId] = useState<number | null>(null)
  const [editingDocument, setEditingDocument] = useState<Document | null>(null)
  const [newDocument, setNewDocument] = useState<Document>({
    name: '',
    isActive: false,
    submissionOpen: false,
    course: 2,
  })

  useEffect(() => {
    if (data) {
      setTableData(data)
    }
  }, [data])

  const handleDragAndDrop = async (updatedData: Document[]) => {
    setTableData(updatedData)
    try {
      await UpdateDocument(updatedData)
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

  const handleDocumentManagement = async (
    action: 'add' | 'update' | 'delete',
    data?: Document | Document[],
  ) => {
    try {
      switch (action) {
        case 'add':
          if (data) {
            await UpdateDocument([...tableData, data as Document])
          }
          break
        case 'update':
          if (data) {
            await UpdateDocument(data as Document[])
          }
          break
        case 'delete':
          if (typeof data === 'number') {
            await DeleteDocument(data)
          }
          break
      }
      await mutate()
    } catch (error) {
      toast.error('เกิดข้อผิดพลาดในการดำเนินการ')
      await mutate()
    }
  }

  const handleAddRowStart = () => setIsAddingNewDocument(true)

  const handleCancelAddRow = () => {
    setIsAddingNewDocument(false)
    setNewDocument({
      name: '',
      isActive: false,
      submissionOpen: false,
      course: 2,
    })
  }

  const handleConfirmAddRow = async () => {
    if (!newDocument.name.trim()) {
      toast.error('กรุณากรอกชื่อสถานะ')
      return
    }

    await handleDocumentManagement('add', newDocument)
    handleCancelAddRow()
  }

  const handleDeleteRow = async (id?: number) => {
    if (!id) return
    await handleDocumentManagement('delete', id as unknown as Document)
  }

  const handleDocumentChange = (
    setter: React.Dispatch<React.SetStateAction<Document | null>>,
    field: keyof Document,
    value: string | boolean,
  ) => {
    setter(prev => ({
      ...prev!,
      [field]: value,
    }))
  }

  const startEditRow = (row: Document) => {
    if (!row.id) return
    setEditingRowId(row.id)
    setEditingDocument({ ...row })
  }

  const handleConfirmEdit = async () => {
    if (!editingDocument?.name.trim()) {
      toast.error('กรุณากรอกชื่อสถานะ')
      return
    }

    const updatedTableData = tableData.map(row =>
      row.id === editingRowId ? { ...editingDocument } : row,
    )

    await handleDocumentManagement('update', updatedTableData)
    setEditingRowId(null)
    setEditingDocument(null)
  }

  const handleCancelEdit = () => {
    setEditingRowId(null)
    setEditingDocument(null)
  }

  const handleUpdateIsActive = async (id: number, isActive: boolean) => {
    const updatedRowIndex = tableData.findIndex(row => row.id === id)
    if (updatedRowIndex === -1) return

    const updatedTableData = [...tableData]
    updatedTableData[updatedRowIndex].isActive = isActive
    setTableData(updatedTableData)
    await handleDocumentManagement('update', updatedTableData)
  }

    const handleUpdateSubmissionOpen = async (id: number, submissionOpen: boolean) => {
    const updatedRowIndex = tableData.findIndex(row => row.id === id)
    if (updatedRowIndex === -1) return

    const updatedTableData = [...tableData]
    updatedTableData[updatedRowIndex].submissionOpen = submissionOpen
    setTableData(updatedTableData)
    await handleDocumentManagement('update', updatedTableData)
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader />
      </div>
    )
  }

  return (
    <section className="relative w-full overflow-x-auto bg-white px-4 shadow-md sm:rounded-lg">
      <article>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="divide-y bg-gray-50">
              <tr>
                {['ลำดับ', 'ชื่อเอกสาร', 'เปิดส่ง', 'สถานะใช้งาน', ''].map(
                  (header, index) => (
                    <th
                      key={index}
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:text-base"
                    >
                      {header}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {tableData.map((row, index) =>
                editingRowId === row.id ? (
                  <EditableRow
                    key={row.id}
                    index={index}
                    row={editingDocument}
                    onDocumentChange={(field, value) =>
                      handleDocumentChange(setEditingDocument, field, value)
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
                    onUpdateSubmissionOpen={handleUpdateSubmissionOpen}
                    onUpdateIsActive={handleUpdateIsActive}
                  />
                ),
              )}

              {isAddingNewDocument && (
                <EditableRow
                  index={tableData.length}
                  row={newDocument}
                  onDocumentChange={(field, value) =>
                    handleDocumentChange(
                      setNewDocument as Dispatch<SetStateAction<Document | null>>,
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
          {!isAddingNewDocument && (
            <button
              onClick={handleAddRowStart}
              className="mb-4 mt-2 rounded bg-primary2-400 px-4 py-2 text-white hover:bg-primary2-500"
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
  row: Document | null
  onDocumentChange: (field: keyof Document, value: string | boolean) => void
  onConfirm: () => void
  onCancel: () => void
}> = ({ index, row, onDocumentChange, onConfirm, onCancel }) => {
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
          onChange={e => onDocumentChange('name', e.target.value)}
          placeholder="ชื่อเอกสาร"
          onKeyDown={handleKeyDown}
          className="w-full rounded border px-1 py-1"
        />
      </td>
      <td className="whitespace-nowrap px-6 py-4"></td>
      <td className="whitespace-nowrap px-6 py-4"></td>
      <td className="flex gap-2 whitespace-nowrap px-6 py-4">
        <button
          onClick={onConfirm}
          className="rounded bg-primary2-400 px-2 py-1 text-white hover:bg-primary2-500"
        >
          ยืนยัน
        </button>
        <button
          onClick={onCancel}
          className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600"
        >
          ยกเลิก
        </button>
      </td>
    </tr>
  )
}

const DraggableRow: React.FC<{
  index: number
  row: Document
  draggingRowIndex: number | null
  onDragStart: (index: number) => void
  onDragOver: (
    event: React.DragEvent<HTMLTableRowElement>,
    index: number,
  ) => void
  onDragEnd: () => void
  onEdit: (row: Document) => void
  onDelete: (id?: number) => void
  onUpdateSubmissionOpen: (id: number, submissionOpen: boolean) => void
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
  onUpdateSubmissionOpen,
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
    <td className="whitespace-nowrap px-6 py-4">{row.name}</td>
    <td className="whitespace-nowrap px-6 py-4">
      <div className="flex items-center gap-2">
        <label className="inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            checked={row.submissionOpen}
            className="peer sr-only"
            onChange={e => onUpdateSubmissionOpen(row.id!, e.target.checked)}
          />
          <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary2-400 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 rtl:peer-checked:after:-translate-x-full"></div>
        </label>
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

export default Project
