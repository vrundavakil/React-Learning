import React from "react";

class ImageCard extends React.Component{

    constructor(props){
        super(props);
        this.state={span:0}
        this.imgRef=  React.createRef();
    }

    componentDidMount(){
        this.imgRef.current.addEventListener('load',this.setSpans);
    }

    setSpans = () =>{

        const hite= this.imgRef.current.clientHeight;
        const span = Math.ceil(hite/150);

        this.setState({span})
    }

    render(){
        return (
        <div  className='img-list' style={{gridRowEnd:` span${this.state.span}`}}> 
               <img  ref={this.imgRef} alt={this.props.img.description}  src={this.props.img.urls.small}/>
                </div>
        )
    }

}

export default ImageCard