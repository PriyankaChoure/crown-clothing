import './directory.style.scss';
import DirectoryItem from '../directory-item/directory-item.component';
const Directory = ({categories}) => {
    return(
        <div className="directory-container">
        {
          categories.map((category)=>(
          <DirectoryItem id={category.id} category = {category}/>
        ))
        }     
      </div>
    )
}

export default Directory ;