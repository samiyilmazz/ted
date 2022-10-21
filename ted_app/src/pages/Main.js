import axios from 'axios';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
const url = "http://127.0.0.1:8000";

class Main extends Component{

    state = {
        notes: [],
        loading: true,
    }
    async componentDidMount(){
        const res = await axios.get(url+'/api/students');

        if(res.data.status === 200){
            console.log(res.data);
            this.setState({
                students: res.data.students,
                loading: false
            })
        }
        
    }
    render(){

        var notes_HTMLTABLE ="";
        if(this.state.loading){
            notes_HTMLTABLE = <tr><td colSpan="7"><h2>Yükleniyor...</h2></td></tr>
        }
        else{
            notes_HTMLTABLE = 
            this.state.students.map((item) => {
                return(
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.identitiyno}</td>
                        <td>{item.name}</td>
                        <td>{item.surname}</td>
             
                        <td>
                            <Link to={`edit-notes/${item.id}`} className="btn btn-success btn-sm">Notlar</Link>
                        </td>
                        <td>
                            <button type='button' className='btn btn-danger btn-sm'>Sil</button>
                        </td>
                        

                    </tr>
                )
            })
        }

        return(
            <div className ="container">
                <div className = "row">
                    <div className ="col-md-12">
                        <div className = "card">
                            <div className = "card-header">
                                <h4>Öğrenci Bilgileri
                                    {/* <Link to={'add-notes'} className="btn btn-primary btn-sm float-end">Not Ekle</Link> */}
                                </h4>
                                <div className="card-body">
                                        <table className='table table-bordered table-striped'>
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>TC</th>
                                                    <th>İsim</th>
                                                    <th>Soyisim</th>
                                                 
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {notes_HTMLTABLE}
                                            </tbody>
                                        </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Main;