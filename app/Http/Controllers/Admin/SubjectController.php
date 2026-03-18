<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Subject;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubjectController extends Controller
{
    public function index(Request $request)
    {
        $subjects = Subject::query()
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                      ->orWhere('code', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Subjects/Index', [
            'subjects' => $subjects,
            'filters' => $request->only(['search'])
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Subjects/Form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:50|unique:subjects',
            'name' => 'required|string|max:255',
            'credits' => 'required|integer|min:1|max:10',
        ]);

        Subject::create($validated);

        return redirect()->route('admin.subjects.index')->with('success', 'Đã thêm môn học mới!');
    }

    public function edit(Subject $subject)
    {
        return Inertia::render('Admin/Subjects/Form', [
            'subject' => $subject
        ]);
    }

    public function update(Request $request, Subject $subject)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:50|unique:subjects,code,' . $subject->id,
            'name' => 'required|string|max:255',
            'credits' => 'required|integer|min:1|max:10',
        ]);

        $subject->update($validated);

        return redirect()->route('admin.subjects.index')->with('success', 'Đã cập nhật môn học!');
    }

    public function destroy(Subject $subject)
    {
        // Có thể thêm logic kiểm tra xem môn học đã có lớp/sinh viên chưa trước khi xóa
        $subject->delete();
        return back()->with('success', 'Đã xóa môn học!');
    }
}