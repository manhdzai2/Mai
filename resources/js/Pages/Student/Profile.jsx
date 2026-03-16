import React, { useMemo } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/UI/Card';
import TermTrendLine from '@/Components/Charts/TermTrendLine';
import { Head } from '@inertiajs/react';

function Profile({ student, transcripts }) {
  const trend = useMemo(() => {
    const map = new Map();
    (transcripts || []).forEach(t => {
      const term = t.term || 'N/A';
      const total = t.scores.total ?? null;
      if (total !== null) { if (!map.has(term)) map.set(term, []); map.get(term).push(Number(total)); }
    });
    return Array.from(map.entries()).map(([term, arr]) => ({ term, avg: Number((arr.reduce((a,b)=>a+b,0)/arr.length).toFixed(2)) }));
  }, [transcripts]);

  return (
    <>
      <Head title="Hồ sơ sinh viên" />
      <div className="mx-auto max-w-7xl space-y-6">
        <h1 className="text-2xl font-semibold">Hồ sơ</h1>

        <div className="grid md:grid-cols-3 gap-4">
          <Info title="Họ tên" value={student?.user?.name} />
          <Info title="Mã SV" value={student?.student_code} />
          <Info title="Lớp" value={student?.class?.name || '-'} />
        </div>

        <Card title="Tiến độ học tập" subtitle="Điểm trung bình theo học kỳ">
          <TermTrendLine data={trend} />
        </Card>

        <Card title="Bảng điểm chi tiết">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr><Th>Môn học</Th><Th>Học kỳ</Th><Th>Chuyên cần</Th><Th>Giữa kỳ</Th><Th>Cuối kỳ</Th><Th>Tổng</Th><Th>Xếp loại</Th></tr>
              </thead>
              <tbody>
                {transcripts?.map((t, i) => (
                  <tr key={i} className="border-b">
                    <Td>{t.subject}</Td><Td>{t.term || '-'}</Td>
                    <Td>{t.scores.attendance ?? '-'}</Td>
                    <Td>{t.scores.midterm ?? '-'}</Td>
                    <Td>{t.scores.final ?? '-'}</Td>
                    <Td className="font-semibold">{t.scores.total ?? '-'}</Td>
                    <Td><Grade grade={t.scores.grade} /></Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  );
}
function Info({ title, value }) { return <div className="bg-white border rounded-xl p-4"><div className="text-xs text-gray-500">{title}</div><div className="text-lg font-semibold">{value}</div></div>; }
function Th({ children }) { return <th className="text-left font-medium px-4 py-2">{children}</th>; }
function Td({ children }) { return <td className="px-4 py-2">{children}</td>; }
function Grade({ grade }) {
  if (!grade) return <span className="text-gray-400">-</span>;
  const map = { 'Giỏi':'text-emerald-700 bg-emerald-50 border-emerald-200', 'Khá':'text-sky-700 bg-sky-50 border-sky-200', 'Trung bình':'text-amber-700 bg-amber-50 border-amber-200', 'Yếu':'text-rose-700 bg-rose-50 border-rose-200' };
  return <span className={`text-xs px-2 py-1 rounded border ${map[grade]}`}>{grade}</span>;
}
Profile.layout = page => <AppLayout children={page} />;
export default Profile;