<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Notes;
use App\Models\Students;

class NotesController extends Controller
{

    public function index(){
        $notes = Notes::all();

        return response()->JSON([
            'status' => 200,
            'notes'=> $notes,
        ]);

    }

    public function students(){
        $notes = Students::all();

        return response()->JSON([
            'status' => 200,
            'students'=> $notes,
        ]);

    }

    public function updateNotes(Request $request)
    {
        $quiz1 = $request->input('quiz1');
        $quiz2 = $request->input('quiz2');
        $quiz3 = $request->input('quiz3');
        $perform1 = $request->input('perform1');
        $perform2 = $request->input('perform2');
        $project = $request->input('project');
        Notes::where('id', $request->id)->update([
            'quiz1' => $quiz1,
            'quiz2' => $quiz2,
            'quiz3' => $quiz3,
            'perform1' => $perform1,
            'perform2' => $perform2,
            'project' => $project,
        ]);

        return response()->JSON([
            'status' => 200,
            'data'=> "success",
        ]);
    }

    public function detail(Request $request)
    {
        $id = $request->input('id');
        $columns = ['id','tckno', 'quiz1', 'quiz2', 'quiz3', 'perform1', 'perform2', 'project'];
        $data = Notes::select($columns)->where('id',$id)->get();

        return response()->JSON([
            'status' => 200,
            'data'=> $data,
        ]);
    }

    public function store(Request $request){
        $notes = new Notes;
        $notes->tckno = '12345678912';
        $notes->quiz1 = $request->input('quiz1');
        $notes->quiz2 = $request->input('quiz2');
        $notes->quiz3 = $request->input('quiz3');
        $notes->perform1 = $request->input('perform1');
        $notes->perform2 = $request->input('perform2');
        $notes->project = $request->input('project');
        $notes->save();

        return response()->JSON([
            'status' => 200,
            'message'=> 'Note saved successfully',
        ]);
    }
}
