//Structures of React components
//Product
const Product = React.createClass({
  getInitialState: function(){
    return {qty:0};

  },
  buy: function(){
    this.setState({qty:this.state.qty + 1})
    this.props.handleTotal(this.props.price)
  },
  show: function(){
    this.props.handleShow(this.props.name)
  },
  render: function(){
    return(
      <div>
      <h2>{this.props.name} = ${this.props.price}</h2>
      <button onClick={this.buy}>Buy</button>
      <button onClick={this.show}>Show</button>
      <h3>Qty: {this.state.qty} (items)</h3>
      <hr/>
      </div>
    );
  }
});

//Total
const Total = React.createClass({
  render: function(){
    return (
      <div>
      <h3>Total Cash: ${this.props.total}</h3>
      </div>
    )
  }
});

//ProductForm
const ProductForm = React.createClass({
  submit: function(e){
    e.preventDefault();

    const product = {
      name: this.refs.name.value,
      price: parseInt(this.refs.price.value)
    }
    //alert('Name: ' +this.refs.name.value + ' -$' + this.refs.price.value);
    this.props.handleCreate(product);

    this.refs.name.value = "";
    this.refs.name.price = "";
  },
  render: function(){
    return(
      <form>
        <input type="text" placeholder="Product Name" ref="name"/> -
        <input type="text" placeholder="Product Price" ref="price"/>
        <br/> <br/>
        <button onClick={this.submit}>Create Product</button>
        <hr/>
      </form>
    )
  }
})
//ProductList - this is rendering both Product and Total
const ProductList = React.createClass({
  getInitialState: function(){
    return {
      total:0,
      productList: [
        {name: "Android", price:121},
        {name: "Apple", price:123},
        {name: "Windows", price:78}
      ]
    }
  },
  createProduct: function(product){
    this.setState({
      productList: this.state.productList.concat(product)
    })

  },
  calculateTotal: function(price){
    this.setState({total: this.state.total + price})
    //alert(this.state.total)
  },
  showProduct: function(name){
    alert("You have chosen " + name);
  },
  render: function(){
    const component = this;
    const products = this.state.productList.map(function(product){

      return(
        <Product name={product.name} price={product.price} handleShow={component.showProduct} handleTotal={component.calculateTotal}/>
      )

    });
    return (
      <div>
        <ProductForm handleCreate={this.createProduct}/>
        {products}
        <Total total={this.state.total}/>
      </div>
    )
  }
})

//Rendering the Structure to the root on the HTML page
React.render(<ProductList/>, document.getElementById('root'));