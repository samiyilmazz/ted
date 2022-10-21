import React, { Component } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';
const url = "http://127.0.0.1:8000";
 
class EditNotes extends Component {
    
    state = {
        quiz1: '0',
        quiz2: '0',
        quiz3: '0',
        perform1: '0',
        perform2: '0',
        project: '0',
    }
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        this.calculateAverage();
    }

    componentDidMount() {
        var pathArray = window.location.pathname.split("/");
        var segment_1 = pathArray[2];         
        const params = new URLSearchParams({
            id: segment_1,
          }).toString();
        const res = axios.post(url+'/api/update', params).then(res => {
            var response = (res.data.data[0]);            
            this.setState({
                quiz1: response.quiz1,
                quiz2: response.quiz2,
                quiz3: response.quiz3,
                perform1: response.perform1,
                perform2: response.perform2,
                project: response.project,
            });
            this.calculateAverage()
          })
          .catch(err => {
            console.log(err);
          });
    }

    valideForms()
    {
        if(this.state.quiz1>100 || this.state.quiz1<0)
        {
            return false;
        }
        if(this.state.quiz2>100 || this.state.quiz2<0)
        {
            return false;
        }
        if(this.state.quiz3>100 || this.state.quiz3<0)
        {
            return false;
        }
        if(this.state.perform1>100 || this.state.perform1<0)
        {
            return false;
        }
        if(this.state.perform2>100 || this.state.perform2<0)
        {
            return false;
        }
        if(this.state.project>100 || this.state.project<0)
        {
            return false;
        }
        return true;
    }


    updateNotes(){
        if(this.valideForms())
        {
            var pathArray = window.location.pathname.split("/");
            var segment_1 = pathArray[2];  
            const params = new URLSearchParams({
                id: segment_1,
                quiz1:this.state.quiz1,
                quiz2:this.state.quiz2,
                quiz3:this.state.quiz3,
                perform1:this.state.perform1,
                perform2:this.state.perform2,
                project:this.state.project
            }).toString();
            axios.post(url+'/api/updateNotes', params).then(res => {
                if(res.data.data=="success")
                {
                    alert("Başarıyla Güncellendi");
                }
            })
            .catch(err => {
            console.log(err);
            });
        }
        else{
            alert("Not girerken değerler 0 ile 100 arasında olmalıdır");
        }
        
    }

    calculateAverage()
    {
        var quiz1 = this.state.quiz1;
        var quiz2 = this.state.quiz2;
        var quiz3 = this.state.quiz3;
        var project = this.state.project;
        var perform1 = this.state.perform1;
        var perform2 = this.state.perform2;

        var total = parseInt(quiz1) + parseInt(quiz2) + parseInt(quiz3) + parseInt(project) + parseInt(perform1) + parseInt(perform2);
        var total = total / 6 ;
        this.setState({totalNotes: total.toFixed()});
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Not Bilgileri
                                    <Link to={'/'} className="btn btn-primary btn-sm float-end">Ana Sayfa</Link>
                                </h4>
                                <div className="card-body">
                                    <form onSubmit={this.updateNotes}>
                                        <div className='form-group mb-3'>
                                            <label> 1.Yazılı</label>
                                            <input type="text" name="quiz1" onKeyUp={() => this.calculateAverage({})} onChange={this.handleInput} value={this.state.quiz1} className="form-control"></input>
                                        </div>
                                        <div className='form-group mb-3'>
                                            <label> 2.Yazılı</label>
                                            <input type="text" name="quiz2" onKeyUp={() => this.calculateAverage({})} onChange={this.handleInput} value={this.state.quiz2} className="form-control"></input>
                                        </div>
                                        <div className='form-group mb-3'>
                                            <label> 3.Yazılı</label>
                                            <input type="text" name="quiz3"  onKeyUp={() => this.calculateAverage({})} onChange={this.handleInput} value={this.state.quiz3} className="form-control"></input>
                                        </div>
                                        <div className='form-group mb-3'>
                                            <label> 1.Performans</label>
                                            <input type="text" name="perform1" onKeyUp={() => this.calculateAverage({})} onChange={this.handleInput} value={this.state.perform1} className="form-control"></input>
                                        </div>
                                        <div className='form-group mb-3'>
                                            <label> 2.Performans</label>
                                            <input type="text" name="perform2" onKeyUp={() => this.calculateAverage({})} onChange={this.handleInput} value={this.state.perform2} className="form-control"></input>
                                        </div>
                                        <div className='form-group mb-1'>
                                            <label> Proje</label>
                                            <input type="text" name="project" onKeyUp={() => this.calculateAverage({})} onChange={this.handleInput} value={this.state.project} className="form-control"></input>
                                        </div>
                                        <div className='form-group mb-1'>
                                            <label> Öğrenci Not Ortalaması: </label>
                                            <span> {this.state.totalNotes}</span>
                                        </div>
                                        <div className='form-group mb-1'>
                                            <button type='button' onClick={() => this.updateNotes({})} className='btn btn-primary'>Kaydet</button>
                                        </div>
                                    </form>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditNotes;