import { Fragment, useContext } from 'react';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import { CategoriesContext } from '../../contexts/categories.context';

const CategoriesPreview = () => {

    const {categoriesMap} = useContext(CategoriesContext);
    return  (
       <Fragment>
        {
            Object.keys(categoriesMap).map((title)=>{
                const products = categoriesMap[title];
                return (
                    <CategoryPreview key={title}  title={title} products={products} />
                )
            })
        }
       </Fragment>
       

    )
}   

export default CategoriesPreview;


{/* <Fragment>
{
    Object.keys(categoriesMap).map((title)=>{
        return(
            <Fragment>
                <h2>{title}</h2>
                <div className='products-container'>
                    {categoriesMap[title].map((product)=>(
                        <ProductCard key={product.id} product={product}  />
                    ))}
                    
                </div>
            </Fragment>

        )
    })
}
</Fragment> */}