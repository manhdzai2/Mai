import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/UI/Card';
import { Head, useForm, router } from '@inertiajs/react';

function Index({ enrollments, students, subjects }) {
  const { data, setData, post, processing, reset } = useForm({ student_id:'', subject_id:'', term:'' });
  const submit = (e) => { e.preventDefault(); post(route('teacher.enrollments.store'), { onSuccess: () => reset() }); };
  const [saving, setSaving] = useState(false);

  async function saveScore(enrollmentId, field, value) {
    setSaving(true);
    try {
      const body = {
        enrollment_id: enrollmentId,
        attendance_score: field === 'attendance' ? Number(value) : undefined,
        midterm_score:    field === 'midterm'    ? Number(value) : undefined,
        final_score:      field === 'final'      ? Number(value) : undefined,
      };
      Object.keys(body).forEach(k => body[k] === undefined && delete body[k]);
      if (!('attendance_score' in body || 'midterm_score' in body || 'final_score' in body)) return;

      const res = await fetch('/api/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content },
        body: JSON.stringify({
          enrollment_id: enrollmentId,
          attendance_score: body.attendance_score ?? 0,
          midterm_score: body.midterm_score ?? 0,
          final_score: body.final_score ?? 0,
        }),
      });
      if (res.ok) router.reload({ only: ['enrollments'] });
    } finally { setSaving(false); }
  }

  return (
    <>
      <Head title="Học phần" />
      <div className="mx-auto max-w-7xl space-y-6">
        <h1 className="text-2xl font-semibold">Học phần giảng dạy</h1>

        <Card title="Thêm đăng ký học phần">
          <form onSubmit={submit} className="grid md:grid-cols-4 gap-3 items-end">
            <Select label="Sinh viên" value={data.student_id} onChange={v => setData('student_id', v)}
              options={students.map(s => ({ value: s.id, label: `${s.student_code} - ${s.user.name}` }))} />
            <Select label="Môn học" value={data.subject_id} onChange={v => setData('subject_id', v)}
              options={subjects.map(s => ({ value: s.id, label: s.name }))} />
            <Input label="Học kỳ (vd: 2025-2026 HK1)" value={data.term} onChange={e => setData('term', e.target.value)} />
            <button disabled={processing} className="h-10 bg-indigo-600 text-white rounded px-4 hover:bg-indigo-700">Thêm</button>
          </form>
        </Card>

        <Card title="Danh sách học phần" subtitle="Nhập điểm trực tiếp (0 - 10)">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr><Th>Mã SV</Th><Th>Sinh viên</Th><Th>Môn</Th><Th>Học kỳ</Th><Th>Chuyên cần</Th><Th>Giữa kỳ</Th><Th>Cuối kỳ</Th><Th>Tổng</Th><Th>Xếp loại</Th></tr>
              </thead>
              <tbody>
                {enrollments.data.map(en => (
                  <tr key={en.id} className="border-b hover:bg-gray-50/60">
                    <Td>{en.student.student_code}</Td>
                    <Td>{en.student.user.name}</Td>
                    <Td>{en.subject.name}</Td>
                    <Td>{en.term || '-'}</Td>
                    <Td><NumInput defaultValue={en.score?.attendance_score ?? ''} onBlur={(v) => saveScore(en.id, 'attendance', v)} /></Td>
                    <Td><NumInput defaultValue={en.score?.midterm_score ?? ''}    onBlur={(v) => saveScore(en.id, 'midterm', v)} /></Td>
                    <Td><NumInput defaultValue={en.score?.final_score ?? ''}      onBlur={(v) => saveScore(en.id, 'final', v)} /></Td>
                    <Td className="font-semibold">{en.score?.total_score ?? '-'}</Td>
                    <Td><Badge grade={en.score?.grade} /></Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {saving && <div className="text-xs text-gray-500 mt-2">Đang lưu...</div>}
          <div className="mt-3 text-xs text-gray-400">* Rời ô input để lưu. Observer tự tính tổng & xếp loại.</div>
        </Card>
      </div>
    </>
  );
}
function Th({ children }) { return <th className="text-left font-medium px-4 py-2">{children}</th>; }
function Td({ children }) { return <td className="px-4 py-2">{children}</td>; }
function Input({ label, ...props }) { return <label className="text-sm grid gap-1"><span className="text-gray-600">{label}</span><input {...props} className="h-10 border rounded px-3" /></label>; }
function Select({ label, value, onChange, options }) {
  return <label className="text-sm grid gap-1">
    <span className="text-gray-600">{label}</span>
    <select value={value} onChange={e => onChange(e.target.value)} className="h-10 border rounded px-3">
      <option value="">-- Chọn --</option>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </label>;
}
function NumInput({ defaultValue, onBlur }) {
  const [val, setVal] = useState(defaultValue);
  return <input type="number" min="0" max="10" step="0.1" value={val} onChange={e => setVal(e.target.value)} onBlur={() => onBlur(Number(val))} className="h-9 w-24 border rounded px-2" />;
}
function Badge({ grade }) {
  if (!grade) return <span className="text-gray-400">-</span>;
  const map = { 'Giỏi':'bg-emerald-50 text-emerald-700 border-emerald-200', 'Khá':'bg-sky-50 text-sky-700 border-sky-200', 'Trung bình':'bg-amber-50 text-amber-700 border-amber-200', 'Yếu':'bg-rose-50 text-rose-700 border-rose-200' };
  return <span className={`text-xs px-2 py-1 rounded border ${map[grade] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>{grade}</span>;
}
Index.layout = page => <AppLayout children={page} />;
export default Index;