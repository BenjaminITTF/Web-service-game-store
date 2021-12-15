import React, { Component } from "react";
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
          username: '',
          password: '',
          token:'',
          error:'',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    handleChange(event) {
        if (event.target.name ==="username"){
          this.setState({username: event.target.value});
        }
        if (event.target.name ==="password"){
          this.setState({password: event.target.value});
        }
      }
    handleSubmit(event) {
        console.log('info',this.state.username + ' ' +this.state.password);
        axios.post('https://service-web-game-store.herokuapp.com/api/auth', { 
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            crossdomain: true,
            withCredentials: false,
          },
          username: this.state.username,
          password: this.state.password
           },
        )
          .then(res => {
            const token = res.data.token;
            this.setState({ token:token });
            this.setState({error:''})
            this.setState({loader:false})
          }).catch(error => {
            this.setState({token:''})
            if (error.response.status ===400) {
              this.setState({error:'Avez-vous remplis la totalité des champs?'})
            } else if(error.response.status ===401){
              this.setState({error:'Indentifiant ou password incorrect'})
            } else if(error.response.status ===500){
              this.setState({error:'Error system'})
    
              console.log('erreur serveur');
            } else{
              this.setState({error:'Une erreur inconnue est apparu'})
            }
            this.setState({loader:false})
          })
        event.preventDefault();
      }
    render() {
        return (
            <div>
               <form onSubmit={this.handleSubmit}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input type="username" className="form-control" placeholder="Enter username" name="username" onChange={this.handleChange} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" name="password" onChange={this.handleChange} />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
                
                <button type="submit" className="btn btn-primary btn-block">Envoyer</button>
                
                {this.state.token !== '' &&
                <div className="form-group">
                    <br/>
                    <input type="text" className="form-control" value={this.state.token} />
                </div>
                }
                {this.state.error !== '' &&
                <div className="form-group">
                    <br/>
                    <div class="alert alert-warning" role="alert">{this.state.error}</div>
                </div>
                }
                
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>         
            </div>
            
            
        );
    }
}
