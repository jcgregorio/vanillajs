import './index.css'
import { bind, wire } from  '../node_modules/hyperhtml/esm/index.js'

window.customElements.define('todo-vanilla', class extends HTMLElement {

  connectedCallback() {
    this.todos = [
      {text:'learn AngularJS', done:true},
      {text:'build an AngularJS app', done:false}
    ];
    this.render();
  }

  archive(e) {
    e.preventDefault();
    this.todos = this.todos.filter(item => item.done == false);
    this.render();
  }

  done(e) {
    this.todos[+e.target.dataset.index].done = e.target.checked;
    this.render();
  }

  addToDo(e) {
    e.preventDefault();
    this.todos.push({text: this.querySelector('#text').value, done: false});
    this.render();
  }

  remaining() {
    return this.todos.reduce((acc, cur) => { return acc + (cur.done == false) ? 1 : 0 }, 0);
  }

  render() {
    bind(this)`
     <h2>Todo</h2>
     <div>
       <span>${this.remaining()} of ${this.todos.length} remaining</span>
       [ <a href="" onclick=${e => this.archive(e)} >archive</a> ]
     <ul class=unstyled>
      ${ this.todos.map( (item, index) => wire(item)`<li><label>
             <input data-index=${index} onchange=${e => this.done(e)} type=checkbox checked=${item.done}/>
             <span>${item.text}</span>
        </label></li>`)}
     </ul>
      <form onsubmit=${e => this.addToDo(e)}>
        <input type=text size=30 placeholder="add new todo here" id=text>
        <input type=submit value=add>
      </form>
    </div>`;
  }
});
