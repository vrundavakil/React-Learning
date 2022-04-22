import React from 'react';

import ImageCard from './ImageCard'
class ImageList extends React.Component {

    constructor(props) {
        super(props);

    }
    render() {
        const images =  this.props.ImgList.map((image) => {
               return (  <ImageCard key={image.id} img={image} />);
        });
        return <div>{images}</div>;
        

    }
}

export default ImageList;
