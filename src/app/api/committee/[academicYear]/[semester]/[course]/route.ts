import config from '@/config'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { StudentCommitteePointRes } from '@/models/Project'
import * as XLSX from 'xlsx'

const baseURL = config.BASE_API
export async function GET(
  request: NextRequest,
  {
    params,
  }: { params: Promise<{ academicYear: string; semester: string; course: string }> },
) {
  const Cookie = await cookies()
  const token = Cookie.get('token')
  if (!token) {
    return NextResponse.redirect('/login')
  }
  const param = await params
  try {
    const {academicYear, semester, course} = param

    const searchParams = new URL(request.url).searchParams
    const response = await fetch(
      `${baseURL}/v1/project/committee-point?academicYear=${searchParams.get('academicYear') || academicYear}&semester=${searchParams.get('semester') || semester}&course=${searchParams.get('course') || course}`,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      },
    )
    const responseData = await response.json()
    const data = responseData.data as StudentCommitteePointRes[]

    const dataToExport = Array.isArray(data) ? data : [data]
    const worksheet = XLSX.utils.json_to_sheet(dataToExport)
    
    // Auto-adjust column widths
    const columnWidths = dataToExport.reduce((widths, row) => {
      Object.keys(row).forEach((key, index) => {
        const cellValue = String(row[key as keyof StudentCommitteePointRes])
        widths[index] = Math.max(
          widths[index] || 0, 
          key.length, 
          cellValue.length
        )
      })
      return widths
    }, [] as number[])

    worksheet['!cols'] = columnWidths.map(width => ({ wch: width + 2 }))

    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      `${semester}-${academicYear}-committee-point`,
    )
    const buf = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' })

    return new Response(buf, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.ms-excel',
        'Content-Disposition': `attachment; filename=${semester}-${academicYear}-committee-point.xlsx`,
      },
    })
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        { status: 500 },
      )
    }
    return NextResponse.json(
      {
        error: 'An unknown error occurred',
      },
      { status: 500 },
    )
  }
}
