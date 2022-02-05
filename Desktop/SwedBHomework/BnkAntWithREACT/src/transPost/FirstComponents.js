import React, { PureComponent } from 'react'
import axios from 'axios';
import ReactPaginate from 'react-paginate';

    
export class FirstComponents extends PureComponent {


    constructor(props) {
        super(props)
    
        this.state = {
            offset: 0,
            tableData: [],
            orgtableData: [],
            perPage: 5,
            currentPage: 0,
            sortType: 'asc',
            sorted: [],
            driver: []
           
            
        }
        this.handlePageClick = this.handlePageClick.bind(this);
        
    }

  

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        });

    };

    loadMoreData() {
		const data = this.state.orgtableData;
		
		const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
		this.setState({
			pageCount: Math.ceil(data.length / this.state.perPage),
			tableData:slice
		})
	
    }

    componentDidMount(){
        this.getData();
    }

    getData() {
        axios
            .get(`https://jsonplaceholder.typicode.com/comments`)
            .then(res => {

                var data = res.data;
				
                var slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
                

                this.setState({
                    pageCount: Math.ceil(data.length / this.state.perPage),
                    orgtableData :res.data,
                    tableData:slice
                })
            });
    }

    updateData(){
        alert("Hello")
    }

    compareByAsc(key) {
        return function(a, b) {
          if (a[key] < b[key]) return -1;
          if (a[key] > b[key]) return 1;
          return 0;
        };
      }
    
      compareByDesc(key) {
        return function(a, b) {
          if (a[key] < b[key]) return 1;
          if (a[key] > b[key]) return -1;
          return 0;
        };
      }
    
      sortBy(key) {
          alert ("ok")
        let arrayCopy = [...this.state.driver];
        const arrInStr = JSON.stringify(arrayCopy);
        arrayCopy.sort(this.compareByAsc(key));
        const arrInStr1 = JSON.stringify(arrayCopy);
        if (arrInStr === arrInStr1) {
          arrayCopy.sort(this.compareByDesc(key));
        }
        this.setState({ driver: arrayCopy });
      }

    
    

    render() {

        const { driver } = this.state;
    
        return (
            <div>
                 
                  <button onClick={()=> this.updateData()}> TEST </button>

                  <table border="1">
                     <thead>
                         <th>Id</th>
                         <th onClick={() => this.sortBy("name")}>Name</th>
                         <th>Email</th>
                         <th>Body</th>

                     </thead>
                     <tbody>
                        {
                          this.state.tableData.map((tdata, i) => (
                                <tr>
                                    <td>{tdata.id}</td>
                                    <td>{tdata.name}</td>
                                    <td>{tdata.email}</td>
                                    <td>{tdata.body}</td>
                                </tr>
                            
                          ))
                        }

                     </tbody>
                 </table>  

                 <ReactPaginate
                    previousLabel={"<<"}
                    nextLabel={">>"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>

            </div>
        )
    }
}

export default FirstComponents